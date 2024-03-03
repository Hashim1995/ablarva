/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { IGlobalResponse, IGlobalResponseEmpty } from '@/models/common';
import {
  IFeedbackPayload,
  ISendMessagePayload,
  IThreadBubblesItem,
  IThreadHistoryList
} from '@/modules/chat/types';
import { ErrorCallBack, HttpUtil } from '../adapter-config/config';

interface ISendMessageResponse extends IGlobalResponse {
  data: IThreadBubblesItem;
}
interface IThreadHistoryListResponse extends IGlobalResponse {
  data: IThreadHistoryList[];
}
interface IThreadBubblesItemResponse extends IGlobalResponse {
  data: {
    allBubbles: IThreadBubblesItem[];
    parameters: {
      servicePlan: '1' | '2';
    };
  };
}
export class AssistanService {
  // eslint-disable-next-line no-use-before-define
  private static instance: AssistanService | null;

  private constructor() { }

  public static getInstance(): AssistanService {
    if (!this.instance) {
      AssistanService.instance = new AssistanService();
    }
    return AssistanService.instance!;
  }

  public async sendFeedback(
    body: IFeedbackPayload,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.post('api/client/assistants/feedback', body, onError);
    return res;
  }

  public async sendMessage(
    body: ISendMessagePayload,
    onError?: ErrorCallBack,
    abortController?: AbortController['signal']
  ): Promise<ISendMessageResponse> {
    const res = await HttpUtil.post(
      'api/client/assistants/message',
      body,
      onError,
      abortController
    );
    return res;
  }

  public async removeThread(
    id: string,
    onError?: ErrorCallBack,
    abortController?: AbortController['signal']
  ): Promise<IGlobalResponseEmpty> {
    const res = await HttpUtil.delete(
      `api/client/assistants/threads/${id}`,
      onError,
      abortController
    );
    return res;
  }

  public async fetchThreadHistory(
    onError?: ErrorCallBack
  ): Promise<IThreadHistoryListResponse> {
    const res = await HttpUtil.get('api/client/assistants/threads', null, false, onError);
    return res;
  }

  public async fetchBubbleHistory(
    id: string,
    onError?: ErrorCallBack
  ): Promise<IThreadBubblesItemResponse> {
    const res = await HttpUtil.get(
      `api/client/assistants/${id}/messages`,
      null,
      false,
      onError
    );
    return res;
  }
}
