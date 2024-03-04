/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { IGlobalResponse, IGlobalResponseEmpty } from '@/models/common';
import {
  IAssistantFeedbackPayload,
  IAssistantGetAssistansListResponse,
  IAssistantSendMessagePayload,
  IAssistantSendMessageResponse,
  IAssistantThreadBubblesItemResponse,
  IAssistantThreadHistoryListResponse
} from '@/modules/assistant/types';

import { ErrorCallBack, HttpUtil } from '../adapter-config/config';

export class AssistantService {
  // eslint-disable-next-line no-use-before-define
  private static instance: AssistantService | null;

  private constructor() {}

  public static getInstance(): AssistantService {
    if (!this.instance) {
      AssistantService.instance = new AssistantService();
    }
    return AssistantService.instance!;
  }

  public async sendFeedback(
    body: IAssistantFeedbackPayload,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.post(
      'api/client/assistants/message/feedback',
      body,
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
