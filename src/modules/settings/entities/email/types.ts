import { IGlobalResponse } from '@/models/common';

interface IEmailItem {
  id: string;
  emailAddress: string;
  name: string;
  surname: string;
  createdAt?: any;
  actions?: unknown;
}

type IEmailItemCreate = Pick<IEmailItem, 'emailAddress' | 'name' | 'surname'>;
type IEmailItemUpdate = Pick<
  IEmailItem,
  'emailAddress' | 'id' | 'name' | 'surname'
>;

interface IEmailListResponse extends IGlobalResponse {
  data: {
    pagedData: IEmailItem[];
    totalPages: number;
  };
}

export type {
  IEmailItem,
  IEmailListResponse,
  IEmailItemCreate,
  IEmailItemUpdate
};
