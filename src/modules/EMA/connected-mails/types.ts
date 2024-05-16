import { IGlobalResponse } from "@/models/common";

interface IConnectedMailItem {
  emailProviderType: number;
  id: number;
  email: string;
  senderName: string;
  capacity: number;
  accountHealth: number;
  status: boolean;
}

interface IConnectedMailListResponse extends IGlobalResponse {
  data: IConnectedMailItem[];
}

export type { IConnectedMailItem, IConnectedMailListResponse };
