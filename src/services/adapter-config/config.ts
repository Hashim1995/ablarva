import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import i18next from 'i18next';

import { selectOption } from '@/models/common';
import { HttpError } from './http-error';
import { ErrorHandler } from './error-handler';

// Create a new instance of Axios with default configuration
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const axiosErrorHandler = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error?.response?.data?.errors?.length) {
      return error.response.data.errors;
    }
    return i18next.t('errorOccurred');
  }
  return i18next.t('errorOccurred');
};

const axiosErrorHandlerRaw = (error: any) => {
  if (error instanceof AxiosError) {
    return error.response?.data;
  }
  return error;
};

// Define a request interceptor to add the authorization token to headers if available
axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = JSON.parse(localStorage.getItem('userToken') || '{}');
  // Replace with your token retrieval logic
  if (token) {
    config.headers.Authorization = `Bearer ${token.token}`;
  }
  return config;
});

// Define a response interceptor to handle cancellation tokens and error responses
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
    // return Promise.reject(error);
  }
);

const responseBody = (response: any) => response.data;

export interface IHTTPSParams {
  name: string;
  value: string | number | null | selectOption;
}

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

export const requests = {
  get: (url: string, params: IHTTPSParams[] | null | number) =>
    axios.get(url, { params: buildQueryParams(params) }).then(responseBody),
  post: (url: string, body: any) => axios.post(url, body).then(responseBody),
  delete: (url: string, body: any) =>
    axios.delete(url, body).then(responseBody),
  put: (url: string, body: any) => axios.put(url, body).then(responseBody)
};

// eslint-disable-next-line no-unused-vars
export type ErrorCallBack = (e: HttpError) => void;

export class HttpUtil {
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
