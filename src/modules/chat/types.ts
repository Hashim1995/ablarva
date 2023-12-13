export interface IAsistanCard {
  title: string;
  img: string;
  description: string;
  id: number | string;
}

export interface IChatForm {
  message: string;
}

export interface ISendMessagePayload {
  servicePlan: number;
  question: string;
  chatId: string | null;
}
export interface IArrivalBuble {
  id: string;
  chatHistoryId: string;
  question: string;
  answer: string;
  createdTime: string;
  voiceId: null | string;
}

export interface IThreadHistory {
  chatId: string,
  firstMessageOfChat: string,
  servicePlan: number
}

export interface IThreadHistoryList {
  dateOfChats: string,
  chats: IThreadHistory[]
}