/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { IGlobalResponse } from '@/models/common';
import { IArrivalBuble, ISendMessagePayload, } from '@/modules/chat/types';
import {
    ErrorCallBack,
    HttpUtil,
} from '../adapter-config/config';



interface ISendMessageResponse extends IGlobalResponse {
    data: IArrivalBuble;
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

}
