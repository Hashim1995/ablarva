/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

import { IGlobalResponse } from '@/models/common';

// Use the `EngagedEnum` enumeration
export enum EngagedEnum {
  ENGAGED = 1,
  NOT_ENGAGED = 2,
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

export type { ILeadItem, ILeadsListForm, ILeadListResponse };
