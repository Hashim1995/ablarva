/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { IGlobalResponse, IGlobalResponseEmpty } from '@/models/common';
import { IArrivalBuble, ISendMessagePayload, IThreadHistoryList } from '@/modules/chat/types';
import { ErrorCallBack, HttpUtil } from '../adapter-config/config';

interface ISendMessageResponse extends IGlobalResponse {
  data: IArrivalBuble;
}
interface IThreadHistoryListResponse extends IGlobalResponse {
  data: IThreadHistoryList[]
}
export class ChatService {
  // eslint-disable-next-line no-use-before-define
  private static instance: ChatService | null;

  private constructor() { }

  public static getInstance(): ChatService {
    if (!this.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance!;
  }

  public async sendMessage(
    body: ISendMessagePayload,
    onError?: ErrorCallBack
  ): Promise<ISendMessageResponse> {
    const res = await HttpUtil.post('api/client/chats', body, onError);
    return res;
  }

  public async removeThread(
    id: string,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponseEmpty> {
    const res = await HttpUtil.delete(
      `api/client/chats/${id}`,
      false,
      onError
    );
    return res;
  }


  public async fetchThreadHistory(
    id?: number,
    onError?: ErrorCallBack
  ): Promise<IThreadHistoryListResponse> {
    const res = await HttpUtil.get(
      id ? `api/client/chats/${id}` : 'api/client/chats',
      null,
      false,
      onError
    );
    return res;
  }
}
