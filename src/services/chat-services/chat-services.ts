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
  data: IThreadBubblesItem[];
}
export class ChatService {
  // eslint-disable-next-line no-use-before-define
  private static instance: ChatService | null;

  private constructor() {}

  public static getInstance(): ChatService {
    if (!this.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance!;
  }

  public async sendFeedback(
    body: IFeedbackPayload,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.post('api/client/chats/feedback', body, onError);
    return res;
  }

  public async sendMessage(
    body: ISendMessagePayload,
    onError?: ErrorCallBack,
    abortController?: AbortController['signal']
  ): Promise<ISendMessageResponse> {
    const res = await HttpUtil.post(
      'api/client/chats',
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
      `api/client/chats/${id}`,
      onError,
      abortController
    );
    return res;
  }

  public async fetchThreadHistory(
    onError?: ErrorCallBack
  ): Promise<IThreadHistoryListResponse> {
    const res = await HttpUtil.get('api/client/chats', null, false, onError);
    return res;
  }

  public async fetchBubbleHistory(
    id: string,
    onError?: ErrorCallBack
  ): Promise<IThreadBubblesItemResponse> {
    const res = await HttpUtil.get(
      `api/client/chats/${id}/bubbles`,
      null,
      false,
      onError
    );
    return res;
  }
}
