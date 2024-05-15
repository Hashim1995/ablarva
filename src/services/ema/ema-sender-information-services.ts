/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { IGlobalResponseEmpty } from '@/models/common';
import {
  ISenderInformationFindResponse,
  ISenderInformationItem,
  ISenderInformationListResponse
} from '@/modules/EMA/sender-information/types';
import { ErrorCallBack, HttpUtil } from '../adapter-config/config';

export class EmaSenderInformationService {
  // eslint-disable-next-line no-use-before-define
  private static instance: EmaSenderInformationService | null;

  private constructor() {}

  /**
   * Returns the singleton instance of EmaSenderInformationService.
   * @returns The singleton instance of EmaSenderInformationService.
   */
  public static getInstance(): EmaSenderInformationService {
    if (!this.instance) {
      EmaSenderInformationService.instance = new EmaSenderInformationService();
    }
    return EmaSenderInformationService.instance!;
  }

  public async getList(
    onError?: ErrorCallBack
  ): Promise<ISenderInformationListResponse> {
    const res = await HttpUtil.get(
      `api/client/senderInformations`,
      null,
      false,
      onError
    );
    return res;
  }

  public async editSenderInformation(
    payload: ISenderInformationItem,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponseEmpty> {
    const res = await HttpUtil.put(
      `api/client/senderInformations`,
      payload,
      onError,
      null
    );
    return res;
  }

  public async findSenderInformation(
    id: number,
    onError?: ErrorCallBack
  ): Promise<ISenderInformationFindResponse> {
    const res = await HttpUtil.get(
      `api/client/senderInformations/find?id=${id}`,
      null,
      false,
      onError,
      null
    );
    return res;
  }

  public async removeSenderInformation(
    id: number,
    onError?: ErrorCallBack,
    abortController?: AbortController['signal']
  ): Promise<IGlobalResponseEmpty> {
    const res = await HttpUtil.delete(
      `api/client/senderInformations?id=${id}`,
      onError,
      abortController
    );
    return res;
  }

  public async createSenderInformation(
    payload: Omit<ISenderInformationItem, 'id'>,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponseEmpty> {
    const res = await HttpUtil.post(
      `api/client/senderInformations`,
      payload,
      onError,
      null
    );
    return res;
  }
}
