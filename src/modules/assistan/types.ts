import { IGlobalResponse } from "@/models/common";

interface IAsistanItem {
  assistantId: string,
  assistantName: string,
  assistantDescription: string,
  assistantImagePath: string,
  assistantServicePlan: number,
  assistantServicePlanText: string
}

interface IAssistanChatForm {
  message: string;
}

interface IAssistanSendMessagePayload {
  assistantId: string;
  question: string;
  threadId: string | null;
  languagesEnum: number;


}

interface IAssistanThreadHistory {
  threadFirstMessage: string,
  threadServicePlan: number,
  threadId: string,
  assistantName: string,
  assistantImagePath: string
}

interface IAssistanThreadHistoryList {
  dateOfChats: string;
  assistantChats: IAssistanThreadHistory[];
}

interface IAssistanThreadBubblesItem {
  isClient: boolean,
  isTyping: boolean,
  assistantContent: string,
  assistantBubbleId: string,
  assistantThreadId: string,
  assistantName?: string,
  assistantImagePath?: string,
  feedbackStatus?: number,
}

interface IAssistanFeedbackPayload {
  assistantBubbleId: string;
  feedbackStatus: number;
}

interface IAssistanSendMessageResponse extends IGlobalResponse {
  data: IAssistanThreadBubblesItem;
}
interface IAssistanThreadHistoryListResponse extends IGlobalResponse {
  data: IAssistanThreadHistoryList[];
}
interface IAssistanGetAssistansListResponse extends IGlobalResponse {
  data: IAsistanItem[]
}
interface IAssistanThreadBubblesItemResponse extends IGlobalResponse {
  data: {
    allThreadBubbles: IAssistanThreadBubblesItem[];
    assistantParameters: {
      assistantServicePlan: 1 | 2;
      assistantId: string,

    };
  };
}

export type {
  IAssistanThreadHistoryList,
  IAssistanThreadHistory,
  IAssistanFeedbackPayload,
  IAsistanItem,
  IAssistanSendMessageResponse,
  IAssistanThreadHistoryListResponse,
  IAssistanThreadBubblesItemResponse,
  IAssistanSendMessagePayload,
  IAssistanChatForm,
  IAssistanGetAssistansListResponse,
  IAssistanThreadBubblesItem
};
