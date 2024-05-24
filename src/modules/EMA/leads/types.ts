/* eslint-disable no-shadow */

import { IGlobalResponse } from '@/models/common';

// Use the `EngagedEnum` enumeration
export enum EngagedEnum {
  // eslint-disable-next-line no-unused-vars
  ENGAGED = 1,
  // eslint-disable-next-line no-unused-vars
  NOT_ENGAGED = 2,
  // eslint-disable-next-line no-unused-vars
  INTERACTION = 3
}

interface ILeadItem {
  id: number;
  name: string;
  company: string;
  email: string;
  jobTitle: string;
  website: string;
  country: string;
  linkedin: string;
}

interface ILeadListResponse extends IGlobalResponse {
  data: {
    leads: ILeadItem[];
    total: number;
  };
}

interface ILeadsListForm {
  name: string;
  company: string;
  email: string;
  jobTitle: string;
  website: string;
  country: string;
  linkedin: string;
}

interface IUploadLeadsResponse extends IGlobalResponse {
  data: {
    possibleHeaders: { value: string; label: string; isRequired: boolean }[];
    supportedHeaders: { value: string; label: string; isRequired: boolean }[];
    queuedLeadUpload: number;
  };
}

interface IQuickMail {
  to: string[];
  emailTitle: string;
  message: string;
  senderInformation: any
}

export type {
  ILeadItem,
  ILeadsListForm,
  ILeadListResponse,
  IUploadLeadsResponse, IQuickMail
};
