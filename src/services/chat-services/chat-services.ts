/* eslint-disable no-use-before-define */
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
/**
 * Represents a chat service. It contains methods for chat services. It is a singleton class. It is used to send feedback, send a message, remove a thread, fetch thread history, and fetch bubble history. It uses the HttpUtil class for HTTP requests. It is used in the Chat module.
 * @example
 * const chatService = ChatService.getInstance();
 * chatService.sendFeedback(payload, onError);
 * chatService.sendMessage(payload, onError, abortController);
 * chatService.removeThread(id, onError, abortController);
 */
export class ChatService {
  /**
   * The singleton instance of the ChatService class.
   */
  private static instance: ChatService | null;

  /**
   * Constructs a new instance of the ChatService class.
   * Private to enforce singleton pattern.
   */
  private constructor() { }

  /**
   * Gets the singleton instance of the ChatService class.
   * If the instance does not exist, creates a new instance.
   * @returns The singleton instance of the ChatService class.
   */
  public static getInstance(): ChatService {
    if (!this.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance!;
  }

  /**
   * Sends feedback.
   * @param body - The feedback payload.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to the global response.
   */
  public async sendFeedback(
    body: IFeedbackPayload,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.post('api/client/chats/feedback', body, onError);
    return res;
  }

  /**
   * Sends a message.
   * @param body - The message payload.
   * @param onError - Optional callback function to handle errors.
   * @param abortController - Optional abort controller signal.
   * @returns A promise that resolves to the send message response.
   */
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

  /**
   * Removes a thread.
   * @param id - The ID of the thread to remove.
   * @param onError - Optional callback function to handle errors.
   * @param abortController - Optional abort controller signal.
   * @returns A promise that resolves to the global response empty.
   */
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

  /**
   * Fetches the thread history.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to the thread history list response.
   */
  public async fetchThreadHistory(
    onError?: ErrorCallBack
  ): Promise<IThreadHistoryListResponse> {
    const res = await HttpUtil.get('api/client/chats', null, false, onError);
    return res;
  }

  /**
   * Fetches the bubble history for a thread.
   * @param id - The ID of the thread.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to the thread bubbles item response.
   */
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
