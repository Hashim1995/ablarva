interface IAsistanCard {
  title: string;
  img: string;
  description: string;
  id: number | string;
}

interface IChatForm {
  message: string;
}

interface ISendMessagePayload {
  servicePlan: number;
  question: string;
  chatId: string | null;
}

interface IThreadHistory {
  chatId: string;
  firstMessageOfChat: string;
  servicePlan: number;
}

interface IThreadHistoryList {
  dateOfChats: string;
  chats: IThreadHistory[];
}

interface IThreadBubblesItem {
  answerId: string | null;
  content: string;
  isClient: boolean;
  isTyping: boolean;
  questionId?: string;
  feedbackStatus?: number | null;
  voiceId?: null;
  chatHistoryId: string | null;
  bubbleId: string | null;
}

interface IFeedbackPayload {
  bubbleId: string;
  feedbackStatus: number;
}

export type {
  IThreadHistoryList,
  IThreadHistory,
  IFeedbackPayload,
  ISendMessagePayload,
  IChatForm,
  IAsistanCard,
  IThreadBubblesItem
};
