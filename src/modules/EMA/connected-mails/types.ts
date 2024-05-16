import { IGlobalResponse } from '@/models/common';

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

interface IConnectedMailGenerateUrl {
  connectionType: number;
  senderInfoId: number;
}


interface IConnectedMailValidateUrl {
  state: string;
  code: string;
  scope: string;
}

interface IConnectedMailGenerateUrlReponse extends IGlobalResponse {
  data: {
    redirectUrl: string
  }
}

export type { IConnectedMailItem, IConnectedMailListResponse, IConnectedMailValidateUrl, IConnectedMailGenerateUrlReponse, IConnectedMailGenerateUrl };
