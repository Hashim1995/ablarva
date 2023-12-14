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
  voiceId?: null;
  chatHistoryId: string | null;
  bubbleId: string | null;
}

export type {
  IThreadHistoryList,
  IThreadHistory,
  ISendMessagePayload,
  IChatForm,
  IAsistanCard,
  IThreadBubblesItem
};
