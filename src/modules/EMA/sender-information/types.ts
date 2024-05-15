import { IGlobalResponse } from '@/models/common';

interface ISenderInformationItem {
  id: number;
  fullName: string;
  jobTitle: any;
  company: string;
  website: string;
  phone: string;
}
interface ISenderInformationListResponse extends IGlobalResponse {
  data: ISenderInformationItem[];
}
interface ISenderInformationFindResponse extends IGlobalResponse {
  data: ISenderInformationItem;
}

export type {
  ISenderInformationItem,
  ISenderInformationFindResponse,
  ISenderInformationListResponse
};
