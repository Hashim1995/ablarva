/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { IGlobalResponse, IGlobalResponseEmpty } from '@/models/common';


import {
  ISmtpItem,
  ISmtpResponse
} from '@/modules/settings/entities/smtp/types';
import { IEmailItemCreate, IEmailItemUpdate, IEmailListResponse } from '@/modules/settings/entities/email/types';
import { ErrorCallBack, HttpUtil, IHTTPSParams } from '../adapter-config/config';

export class SettingsService {
  // eslint-disable-next-line no-use-before-define
  private static instance: SettingsService | null;

  private constructor() { }

  public static getInstance(): SettingsService {
    if (!this.instance) {
      SettingsService.instance = new SettingsService();
    }
    return SettingsService.instance!;
  }

  public async updateSmtp(
    body: ISmtpItem,
    onError?: ErrorCallBack
  ): Promise<ISmtpResponse> {
    const res = await HttpUtil.put('api/client/settings/smtp', body, onError);
    return res;
  }

  public async getSmtp(onError?: ErrorCallBack): Promise<ISmtpResponse> {
    const res = await HttpUtil.get(
      'api/client/settings/smtp',
      null,
      false,
      onError
    );
    return res;
  }

  public async getEmailItems(param: IHTTPSParams[], onError?: ErrorCallBack): Promise<IEmailListResponse> {
    const res = await HttpUtil.get(
      'api/client/settings/emailEntities',
      param,
      false,
      onError
    );
    return res;
  }


  public async createEmailItem(
    body: IEmailItemCreate,
    onError?: ErrorCallBack,
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.post(
      'api/client/settings/emailEntity/',
      body,
      onError,
    );
    return res;
  }

  public async updateEmailItem(
    body: IEmailItemUpdate,
    onError?: ErrorCallBack,
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.put(
      'api/client/settings/emailEntity/',
      body,
      onError,
    );
    return res;
  }

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
