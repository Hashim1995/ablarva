/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { IGlobalResponse } from '@/models/common';
import { IPricingData } from '@/models/payment';
import { ErrorCallBack, HttpUtil } from '../adapter-config/config';

export interface IPricingDataResponse extends IGlobalResponse {
  data: IPricingData;
}

export class PaymentService {
  // eslint-disable-next-line no-use-before-define
  private static instance: PaymentService | null;

  private constructor() {}

  public static getInstance(): PaymentService {
    if (!this.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance!;
  }

  public async getPricingList(
    id: number,
    onError?: ErrorCallBack
  ): Promise<IPricingDataResponse> {
    const res = await HttpUtil.get(
      `api/client/subscriptions/Packages/${id}`,
      null,
      false,
      onError
    );
    return res;
  }
}
