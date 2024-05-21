import { IGlobalResponse } from '@/models/common';

interface IEmaPackageItemLimitDetails {
  label: string;
  price: number;
}

interface IEmaBillingHistoryItem {
  amount: number;
  id: number,
  orderId: string;
  packageName: string;
  transactionDate: any,

}

interface IEmaBillingHistoryResponse extends IGlobalResponse {
  data: {
    pagedData: IEmaBillingHistoryItem[],
    totalPages: number
  }
}

interface IEmaPackageItem {
  packageId: number;
  packageName: string;
  price: number;
  packageDescription: string;
  hasFreeTrial: boolean;
  freeTrialPeriod: number;
  limitDetails: IEmaPackageItemLimitDetails[];
}

interface IEmaPackageListResponse extends IGlobalResponse {
  data: IEmaPackageItem[];
}

interface IEmaBillingEnterpriseForm {
  name: string;
  companyName: string;
  email: string;
  employeeCount: number | string;
  telephoneNumber: string;
}

export type {
  IEmaPackageItem,
  IEmaPackageItemLimitDetails,
  IEmaPackageListResponse,
  IEmaBillingEnterpriseForm,
  IEmaBillingHistoryItem, IEmaBillingHistoryResponse
};
