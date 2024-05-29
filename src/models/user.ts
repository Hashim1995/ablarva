import { IGlobalResponse } from './common';

export interface ILogin {
  email: string;
  password: string;
}
export interface IUserRegister {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  gender: string | number;
  dateOfBirth: string | Date;
  day?: string;
  month?: string;
  year?: string;
}

export interface IUserSessions {
  id: number;
  userId: number;
  userAgent: string;
  deviceType: number;
  platformName: string;
  platformType: number;
  browserName: string;
  browserVersion: string;
  mobileDeviceType: null | number;
  loginDate: string;
  status: true;
  ipAddress: string;
}

export interface IUserCurrentSubscription {
  subscriptionId: number;
  renewalType: number;
  isFreeTrial: boolean;
  startDate: any;
  endDate: any;
  packageId: number;
}

export interface ICurrentQuotaDetails {
  emailQuota: {
    total: number;
    used: number;
    remainder: number;
  };
  leadQuota: {
    total: number;
    used: number;
    remainder: number;
  };
}

export interface IUserData {
  countryName: string;
  timezone: string;
  emailAssistant: {
    currentQuotaDetailsDto: ICurrentQuotaDetails | null;
    currentSubscriptionDetails: IUserCurrentSubscription | null;
  }

  accessToken: string;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string;
  gender: number;
  verified: boolean;
}

export interface IGetUserSessionsResponse extends IGlobalResponse {
  data: IUserSessions[];
}

export interface IUserLoggedData extends Omit<IUserData, 'accessToken'> { }
