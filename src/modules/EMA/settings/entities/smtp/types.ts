import { IGlobalResponse } from '@/models/common';

interface ISmtpItem {
  id: string;
  mailAddress: string;
  mailPassword: string;
  hostName: string;
  port: number;
}
interface ISmtpResponse extends IGlobalResponse {
  data: ISmtpItem;
}
export type { ISmtpItem, ISmtpResponse };
