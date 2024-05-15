/**
 * @fileoverview This file contains the configuration and utility functions for making HTTP requests using Axios.
 * @module services/adapter-config/config
 */

import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import i18next from 'i18next';

import { selectOption } from '@/models/common';
import { HttpError } from './http-error';
import { ErrorHandler } from './error-handler';

// Set the base URL for all Axios requests
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

/**
 * Handles Axios errors and returns the appropriate error message.
 * @param error - The error object.
 * @returns The error message.
 */
const axiosErrorHandler = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error?.response?.data?.errors?.length) {
      return error.response.data.errors;
    }
    return i18next.t('errorOccurred');
  }
  return i18next.t('errorOccurred');
};

/**
 * Handles Axios errors and returns the raw error object.
 * @param error - The error object.
 * @returns The raw error object.
 */
const axiosErrorHandlerRaw = (error: any) => {
  if (error instanceof AxiosError) {
    return error.response?.data;
  }
  return error;
};

/**
 * Adds the authorization token to the request headers if available.
 * @param config - The Axios request configuration.
 * @returns The modified Axios request configuration.
 */
axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = JSON.parse(localStorage.getItem('userToken') || '{}');
  const language = localStorage.getItem('currentLayoutLanguage');
  // Replace with your token retrieval logic
  if (token) {
    config.headers.Authorization = `Bearer ${token.token}`;
    if (language) {
      config.headers['Accept-Language'] = language;
      config.headers['X-Api-Locale'] = language
    }
  }
  return config;
});

/**
 * Handles cancellation tokens and error responses in Axios responses.
 * @param response - The Axios response.
 * @returns The Axios response.
 */
axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async error => {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
    } else {
      const { response } = error;
      if (response) {
        const { status } = response;
        switch (status) {
          case 401:
            localStorage.removeItem('userToken');
            window.location.href = `/login`;
            break;
          case 403:
            window.location.href = '/no-permission';
            break;
          default:
            // ErrorHandler.getInstance().showError(axiosErrorHandler(error))
            break;
        }
      } else {
        console.error('Network error:', error.message);
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Extracts the response data from an Axios response.
 * @param response - The Axios response.
 * @returns The response data.
 */
const responseBody = (response: any) => response.data;

/**
 * Represents the parameters for an HTTPS request.
 */
export interface IHTTPSParams {
  name: string;
  value: string | number | null | selectOption;
}

/**
 * Builds the query parameters for an HTTPS request.
 * @param par - The HTTPS parameters.
 * @returns The query parameters.
 */
const buildQueryParams = (par: any) => {
  if (!par) return null;
  const payload: any = {};

  par.forEach((element: any) => {
    if (
      !element.value ||
      element.value === undefined ||
      element.value?.toString()?.trim().length <= 0
    ) {
      return;
    }

    payload[element.name] = element.value?.value
      ? element.value?.value.toString()
      : element.value.toString();
  });
  return payload;
};

/**
 * Contains functions for making HTTP requests using Axios.
 */
export const requests = {
  /**
   * Sends a GET request.
   * @param url - The URL to send the request to.
   * @param params - The query parameters for the request.
   * @returns A Promise that resolves to the response data.
   */
  get: (url: string, params: IHTTPSParams[] | null | number) =>
    axios.get(url, { params: buildQueryParams(params) }).then(responseBody),

  /**
   * Sends a POST request.
   * @param url - The URL to send the request to.
   * @param body - The request body.
   * @returns A Promise that resolves to the response data.
   */
  post: (url: string, body: any) => axios.post(url, body).then(responseBody),

  /**
   * Sends a DELETE request.
   * @param url - The URL to send the request to.
   * @param body - The request body.
   * @returns A Promise that resolves to the response data.
   */
  delete: (url: string, body: any) =>
    axios.delete(url, body).then(responseBody),

  /**
   * Sends a PUT request.
   * @param url - The URL to send the request to.
   * @param body - The request body.
   * @returns A Promise that resolves to the response data.
   */
  put: (url: string, body: any) => axios.put(url, body).then(responseBody)
};

/**
 * Represents a callback function for handling HTTP errors.
 * @param e - The HTTP error.
 */
// eslint-disable-next-line no-unused-vars
export type ErrorCallBack = (e: HttpError) => void;

/**
 * Utility class for making HTTP requests using Axios.
 */
export class HttpUtil {
  /**
   * Sends a GET request.
   * @param url - The URL to send the request to.
   * @param params - The query parameters for the request.
   * @param isStream - Whether the response should be treated as a stream.
   * @param onError - The callback function to handle errors.
   * @param abortController - The AbortController for cancelling the request.
   * @returns A Promise that resolves to the response data.
   */
  static async get(
    url: string,
    params: IHTTPSParams[] | null | number,
    isStream?: boolean | undefined,
    onError?: ErrorCallBack,
    abortController?: AbortController
  ): Promise<any | null> {
    try {
      const result = await axios
        .get(url, {
          params: buildQueryParams(params),
          responseType: isStream ? 'blob' : 'json',
          signal: abortController?.signal
        })
        .then(responseBody);
      return result;
    } catch (e: any) {
      const error = new HttpError(
        e.response.status,
        axiosErrorHandler(e),
        axiosErrorHandlerRaw(e)
      );

      if (onError) onError!(error);
      if (error.preventDefault) {
        return null;
      }
      ErrorHandler.getInstance().showError(error.message);
    }
    return null;
  }

  /**
   * Sends a POST request.
   * @param url - The URL to send the request to.
   * @param body - The request body.
   * @param onError - The callback function to handle errors.
   * @param abortController - The AbortController for cancelling the request.
   * @returns A Promise that resolves to the response data.
   */
  static async post(
    url: string,
    body: any,
    onError?: ErrorCallBack,
    abortController?: AbortController['signal']
  ) {
    try {
      const result = await axios
        .post(url, body, {
          signal: abortController
        })
        .then(responseBody);
      return result;
    } catch (e: any) {
      const error = new HttpError(
        e.response.status,
        axiosErrorHandler(e),
        axiosErrorHandlerRaw(e)
      );

      if (onError) onError!(error);
      if (error.preventDefault) {
        return null;
      }
      ErrorHandler.getInstance().showError(error.message);
    }

    return null;
  }

  /**
   * Sends a PUT request.
   * @param url - The URL to send the request to.
   * @param body - The request body.
   * @param onError - The callback function to handle errors.
   * @param abortController - The AbortController for cancelling the request.
   * @returns A Promise that resolves to the response data.
   */
  static async put(
    url: string,
    body: any,
    onError?: ErrorCallBack,
    abortController?: AbortController['signal']
  ) {
    try {
      const result = await axios
        .put(url, body, {
          signal: abortController
        })
        .then(responseBody);
      return result;
    } catch (e: any) {
      const error = new HttpError(
        e.response.status,
        axiosErrorHandler(e),
        axiosErrorHandlerRaw(e)
      );

      if (onError) onError!(error);
      if (error.preventDefault) {
        return null;
      }
      ErrorHandler.getInstance().showError(error.message);
    }

    return null;
  }

  /**
   * Sends a PATCH request.
   * @param url - The URL to send the request to.
   * @param body - The request body.
   * @param onError - The callback function to handle errors.
   * @param abortController - The AbortController for cancelling the request.
   * @returns A Promise that resolves to the response data.
   */
  static async patch(
    url: string,
    body: any,
    onError?: ErrorCallBack,
    abortController?: AbortController['signal']
  ) {
    try {
      const result = await axios
        .patch(url, body, {
          signal: abortController
        })
        .then(responseBody);
      return result;
    } catch (e: any) {
      const error = new HttpError(
        e.response.status,
        axiosErrorHandler(e),
        axiosErrorHandlerRaw(e)
      );

      if (onError) onError!(error);
      if (error.preventDefault) {
        return null;
      }
      ErrorHandler.getInstance().showError(error.message);
    }

    return null;
  }

  /**
   * Sends a DELETE request.
   * @param url - The URL to send the request to.
   * @param onError - The callback function to handle errors.
   * @param abortController - The AbortController for cancelling the request.
   * @returns A Promise that resolves to the response data.
   */
  static async delete(
    url: string,
    onError?: ErrorCallBack,
    abortController?: AbortController['signal']
  ) {
    try {
      const result = await axios
        .delete(url, {
          signal: abortController
        })
        .then(responseBody);
      return result;
    } catch (e: any) {
      const error = new HttpError(
        e.response.status,
        axiosErrorHandler(e),
        axiosErrorHandlerRaw(e)
      );

      if (onError) onError!(error);
      if (error.preventDefault) {
        return null;
      }
      ErrorHandler.getInstance().showError(error.message);
    }

    return null;
  }
}
