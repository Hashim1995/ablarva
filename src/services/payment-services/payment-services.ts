/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { IGlobalResponse } from '@/models/common';
import { IPricingData } from '@/models/payment';
import { IBuyPacketBody, IBuyPacketResponse } from '@/modules/pricing/types';
import { ITransactionsItem } from '@/modules/cabinet/types';
import {
  ErrorCallBack,
  HttpUtil,
  IHTTPSParams
} from '../adapter-config/config';

export interface IPricingDataResponse extends IGlobalResponse {
  data: IPricingData;
}

interface IBuyPacketServiceResponse extends IGlobalResponse {
  data: IBuyPacketResponse;
}
interface ITransactionResponse extends IGlobalResponse {
  data: {
    pagedData: ITransactionsItem[];
    totalPages: number;
  };
}
export class PaymentService {
  // eslint-disable-next-line no-use-before-define
  private static instance: PaymentService | null;

  private constructor() { }

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

  public async buyPacket(
    body: IBuyPacketBody,
    onError?: ErrorCallBack
  ): Promise<IBuyPacketServiceResponse> {
    const res = await HttpUtil.post('api/client/transactions', body, onError);
    return res;
  }

  public async getTransactions(
    params: IHTTPSParams[],
    onError?: ErrorCallBack
  ): Promise<ITransactionResponse> {
    const res = await HttpUtil.get(
      'api/client/transactions',
      params,
      false,
      onError
    );
    return res;
  }
}
