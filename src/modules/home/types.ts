import { IGlobalResponse } from '@/models/common';

interface IAssistantItem {
  assistantId: string;
  assistantName: string;
  assistantPosition?: string;
  assistantDescription: string;
  assistantImagePath: string;
  assistantServicePlan: number;
  assistantServicePlanText: string;
  isActive?: boolean;
}

interface IAssistantChatForm {
  message: string;
}

interface IAssistantSendMessagePayload {
  assistantId: string;
  question: string;
  threadId: string | null;
  languagesEnum: number;
}

interface IAssistantThreadHistory {
  threadFirstMessage: string;
  threadServicePlan: number;
  threadId: string;
  assistantName: string;
  assistantImagePath: string;
}

interface IAssistantThreadHistoryList {
  dateOfChats: string;
  assistantChats: IAssistantThreadHistory[];
}

interface IAssistantThreadBubblesItem {
  isClient: boolean;
  isTyping: boolean;
  assistantContent: string;
  assistantBubbleId: string;
  assistantThreadId: string;
  assistantName?: string;
  assistantImagePath?: string;
  feedbackStatus?: number;
}

interface IAssistantFeedbackPayload {
  assistantBubbleId: string;
  feedbackStatus: number;
}

interface IAssistantSendMessageResponse extends IGlobalResponse {
  data: IAssistantThreadBubblesItem;
}
interface IAssistantThreadHistoryListResponse extends IGlobalResponse {
  data: IAssistantThreadHistoryList[];
}
interface IAssistantGetAssistansListResponse extends IGlobalResponse {
  data: IAssistantItem[];
}
interface IAssistantThreadBubblesItemResponse extends IGlobalResponse {
  data: {
    allThreadBubbles: IAssistantThreadBubblesItem[];
    assistantParameters: {
      assistantServicePlan: 1 | 2;
      assistantId: string;
      assistantName?: string;
      assistantImagePath?: string;
      assistantDescription: string;
    };
  };
}

export type {
  IAssistantThreadHistoryList,
  IAssistantThreadHistory,
  IAssistantFeedbackPayload,
  IAssistantItem,
  IAssistantSendMessageResponse,
  IAssistantThreadHistoryListResponse,
  IAssistantThreadBubblesItemResponse,
  IAssistantSendMessagePayload,
  IAssistantChatForm,
  IAssistantGetAssistansListResponse,
  IAssistantThreadBubblesItem
};
