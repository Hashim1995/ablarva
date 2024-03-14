/* eslint-disable no-use-before-define */
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

/**
 * Represents the AssistantService class. It contains methods for assistant services. It is a singleton class. It is used to send feedback, send a message, remove a thread, fetch thread history, fetch assistants list, and fetch bubble history. It is used in the Assistant module. It
 * uses the HttpUtil class for HTTP requests.
 * @example
 * const assistantService = AssistantService.getInstance();
 * assistantService.sendFeedback(payload, onError);
 * assistantService.sendMessage(payload, onError, abortController);
 */
export class AssistantService {
  private static instance: AssistantService | null;

  private constructor() {}

  /**
   * Gets the instance of AssistantService.
   * If the instance does not exist, creates a new instance and returns it.
   * @returns The instance of AssistantService.
   */
  public static getInstance(): AssistantService {
    if (!this.instance) {
      AssistantService.instance = new AssistantService();
    }
    return AssistantService.instance!;
  }

  /**
   * Sends feedback to the assistant.
   * @param body - The feedback payload.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to the global response.
   */
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

  /**
   * Sends a message to the assistant.
   * @param body - The message payload.
   * @param onError - Optional callback function to handle errors.
   * @param abortController - Optional AbortController signal to abort the request.
   * @returns A promise that resolves to the assistant send message response.
   */
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

  /**
   * Removes a thread from the assistant.
   * @param id - The ID of the thread to remove.
   * @param onError - Optional callback function to handle errors.
   * @param abortController - Optional AbortController signal to abort the request.
   * @returns A promise that resolves to the global response empty.
   */
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

  /**
   * Fetches the thread history from the assistant.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to the assistant thread history list response.
   */
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

  /**
   * Fetches the list of assistants.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to the assistant get assistants list response.
   */
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

  /**
   * Fetches the bubble history for a thread from the assistant.
   * @param id - The ID of the thread.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to the assistant thread bubbles item response.
   */
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
