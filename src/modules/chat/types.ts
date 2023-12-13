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
interface IArrivalBuble {
  id: string;
  chatHistoryId: string;
  question: string;
  answer: string;
  createdTime: string;
  voiceId: null | string;
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


export type { IThreadHistoryList, IThreadHistory, IArrivalBuble, ISendMessagePayload, IChatForm, IAsistanCard, }