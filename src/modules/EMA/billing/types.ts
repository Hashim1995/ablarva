import { IGlobalResponse } from "@/models/common";



interface IEmaPackageItemLimitDetails {
  label: string;
  price: number;
}

interface IEmaPackageItem {
  packageId: number,
  packageName: string,
  price: number,
  packageDescription: string,
  hasFreeTrial: boolean,
  freeTrialPeriod: number,
  limitDetails: IEmaPackageItemLimitDetails[]
}

interface IEmaPackageListResponse extends IGlobalResponse {
  data: IEmaPackageItem[]
}

export type {
  IEmaPackageItem, IEmaPackageItemLimitDetails,
  IEmaPackageListResponse
}