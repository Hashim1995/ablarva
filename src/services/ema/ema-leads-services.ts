/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { IGlobalResponse } from '@/models/common';
import {
  ILeadListResponse,
  IUploadLeadsResponse
} from '@/modules/EMA/leads/types';
import {
  ErrorCallBack,
  HttpUtil,
  IHTTPSParams
} from '../adapter-config/config';

export class EmaLeadsService {
  // eslint-disable-next-line no-use-before-define
  private static instance: EmaLeadsService | null;

  private constructor() {}

  /**
   * Returns the singleton instance of EmaLeadsService.
   * @returns The singleton instance of EmaLeadsService.
   */
  public static getInstance(): EmaLeadsService {
    if (!this.instance) {
      EmaLeadsService.instance = new EmaLeadsService();
    }
    return EmaLeadsService.instance!;
  }

  public async uploadLeads(
    payload: FormData,
    onError?: ErrorCallBack
  ): Promise<IUploadLeadsResponse> {
    const res = await HttpUtil.post(
      'api/client/leads/upload',
      payload,
      onError
    );
    return res;
  }

  public async submitQuee(
    payload: Record<string, string | number>,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.post('api/client/leads/queue', payload, onError);
    return res;
  }

  public async getList(
    params?: IHTTPSParams[],
    onError?: ErrorCallBack
  ): Promise<ILeadListResponse> {
    const res = await HttpUtil.get(`api/client/leads`, params, false, onError);
    return res;
  }
}
