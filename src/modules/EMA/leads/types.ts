/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
// Use the `EngagedEnum` enumeration
export enum EngagedEnum {
    ENGAGED = 1,
    NOT_ENGAGED = 2,
    INTERACTION = 3
}

interface ILeadItem {
    id: string;
    name: string;
    email: string;
    position: string;
    company: string;
    lastContact: string,
    engaged: EngagedEnum
}

interface ILeadsListForm {
    country: string;
    annualRevenue: number;
    companySize: number;
    industries: any;
}

export type { ILeadItem, ILeadsListForm }