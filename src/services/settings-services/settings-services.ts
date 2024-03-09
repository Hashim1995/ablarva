/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { IGlobalResponseEmpty } from '@/models/common';
import {
    IAssistantGetAssistansListResponse,
    IAssistantSendMessagePayload,
    IAssistantSendMessageResponse,
    IAssistantThreadBubblesItemResponse,
    IAssistantThreadHistoryListResponse
} from '@/modules/assistant/types';

import { ISmtpItem, ISmtpResponse } from '@/modules/settings/entities/smtp/types';
import { ErrorCallBack, HttpUtil } from '../adapter-config/config';

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
        const res = await HttpUtil.put(
            'api/client/settings/smtp',
            body,
            onError
        );
        return res;
    }


    public async getSmtp(
        onError?: ErrorCallBack
    ): Promise<ISmtpResponse> {
        const res = await HttpUtil.get(
            'api/client/settings/smtp',
            null,
            false,
            onError
        );
        return res;
    }

    public async sendMessage(
        body: IAssistantSendMessagePayload,
        onError?: ErrorCallBack,
        abortController?: AbortController['signal']
    ): Promise<IAssistantSendMessageResponse> {
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
    ): Promise<IAssistantThreadHistoryListResponse> {
        const res = await HttpUtil.get(
            'api/client/assistants/threads',
            null,
            false,
            onError
        );
        return res;
    }

    public async fetchAssistantsList(
        onError?: ErrorCallBack
    ): Promise<IAssistantGetAssistansListResponse> {
        const res = await HttpUtil.get(
            'api/client/assistants',
            null,
            false,
            onError
        );
        return res;
    }

    public async fetchBubbleHistory(
        id: string,
        onError?: ErrorCallBack
    ): Promise<IAssistantThreadBubblesItemResponse> {
        const res = await HttpUtil.get(
            `api/client/assistants/${id}/messages`,
            null,
            false,
            onError
        );
        return res;
    }
}
