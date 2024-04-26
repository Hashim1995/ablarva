/* eslint-disable no-use-before-define */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { IGlobalResponse, IGlobalResponseEmpty } from '@/models/common';

import {
  ISmtpItem,
  ISmtpResponse
} from '@/modules/EMA/settings/entities/smtp/types';
import {
  IEmailItemCreate,
  IEmailItemUpdate,
  IEmailListResponse
} from '@/modules/EMA/settings/entities/email/types';
import {
  ErrorCallBack,
  HttpUtil,
  IHTTPSParams
} from '../adapter-config/config';

/**
 * Represents a service for managing settings. It is a singleton class. It is used to update SMTP settings, retrieve SMTP settings, retrieve email items, create email items, update email items, and remove email items. It uses the HttpUtil class for HTTP requests.
 * @example
 * const EmaSettingsService = EmaSettingsService.getInstance();
 * EmaSettingsService.updateSmtp(body, onError);
 * EmaSettingsService.getSmtp(onError);
 * EmaSettingsService.getEmailItems(param, onError);
 * EmaSettingsService.createEmailItem(body, onError);
 */
export class EmaSettingsService {
  /**
   * The singleton instance of the EmaSettingsService class.
   */
  private static instance: EmaSettingsService | null;

  private constructor() {}

  /**
   * Gets the singleton instance of the EmaSettingsService class.
   * If the instance does not exist, it creates a new one.
   * @returns The singleton instance of the EmaSettingsService class.
   */
  public static getInstance(): EmaSettingsService {
    if (!this.instance) {
      EmaSettingsService.instance = new EmaSettingsService();
    }
    return EmaSettingsService.instance!;
  }

  /**
   * Updates the SMTP settings.
   * @param body - The SMTP settings to update.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to the updated SMTP response.
   */
  public async updateSmtp(
    body: ISmtpItem,
    onError?: ErrorCallBack
  ): Promise<ISmtpResponse> {
    const res = await HttpUtil.put('api/client/settings/smtp', body, onError);
    return res;
  }

  /**
   * Retrieves the SMTP settings.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to the SMTP response.
   */
  public async getSmtp(onError?: ErrorCallBack): Promise<ISmtpResponse> {
    const res = await HttpUtil.get(
      'api/client/settings/smtp',
      null,
      false,
      onError
    );
    return res;
  }

  /**
   * Retrieves the email items.
   * @param param - The parameters for the request.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to the email list response.
   */
  public async getEmailItems(
    param: IHTTPSParams[],
    onError?: ErrorCallBack
  ): Promise<IEmailListResponse> {
    const res = await HttpUtil.get(
      'api/client/settings/emailEntities',
      param,
      false,
      onError
    );
    return res;
  }

  /**
   * Creates a new email item.
   * @param body - The email item to create.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to the global response.
   */
  public async createEmailItem(
    body: IEmailItemCreate,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.post(
      'api/client/settings/emailEntity/',
      body,
      onError
    );
    return res;
  }

  /**
   * Updates an existing email item.
   * @param body - The updated email item.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to the global response.
   */
  public async updateEmailItem(
    body: IEmailItemUpdate,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.put(
      'api/client/settings/emailEntity/',
      body,
      onError
    );
    return res;
  }

  /**
   * Removes an email item.
   * @param id - The ID of the email item to remove.
   * @param onError - Optional callback function to handle errors.
   * @param abortController - Optional AbortController signal to abort the request.
   * @returns A promise that resolves to the empty global response.
   */
  public async removeEmailItem(
    id: string,
    onError?: ErrorCallBack,
    abortController?: AbortController['signal']
  ): Promise<IGlobalResponseEmpty> {
    const res = await HttpUtil.delete(
      `api/client/settings/emailEntity/${id}`,
      onError,
      abortController
    );
    return res;
  }
}
