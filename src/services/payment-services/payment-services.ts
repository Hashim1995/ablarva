/* eslint-disable no-use-before-define */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { IGlobalResponse } from '@/models/common';
import { IBuyPacketBody, IBuyPacketResponse } from '@/modules/pricing/types';
import { ITransactionsItem } from '@/modules/cabinet/types';
import { IPackageData } from '@/models/payment';
import {
  ErrorCallBack,
  HttpUtil,
  IHTTPSParams
} from '../adapter-config/config';

export interface IPricingDataResponse extends IGlobalResponse {
  data: IPackageData;
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
/**
 * Represents a PaymentService class. It contains methods for payment services. It is a singleton class. It is used to get pricing list, buy a packet, and get transactions. It uses the HttpUtil class for HTTP requests. It is used in the Pricing module.
 * @example
 * const paymentService = PaymentService.getInstance();
 * paymentService.getPricingList(id, onError);
 * paymentService.buyPacket(body, onError);
 * paymentService.getTransactions(params, onError);
 */
export class PaymentService {
  /**
   * The singleton instance of the PaymentService class.
   */
  private static instance: PaymentService | null;

  /**
   * Constructs a new instance of the PaymentService class.
   * Private to enforce the singleton pattern.
   */
  private constructor() { }

  /**
   * Gets the singleton instance of the PaymentService class.
   * If the instance does not exist, creates a new instance.
   * @returns The singleton instance of the PaymentService class.
   */
  public static getInstance(): PaymentService {
    if (!this.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance!;
  }

  /**
   * Retrieves the pricing list for a given ID.
   * @param id - The ID of the pricing list.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to the pricing data response.
   */
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

  /**
   * Buys a packet using the provided body.
   * @param body - The body containing the packet information.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to the buy packet service response.
   */
  public async buyPacket(
    body: IBuyPacketBody,
    onError?: ErrorCallBack
  ): Promise<IBuyPacketServiceResponse> {
    const res = await HttpUtil.post('api/client/transactions', body, onError);
    return res;
  }

  /**
   * Retrieves the transactions based on the provided parameters.
   * @param params - The parameters for the HTTP request.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to the transaction response.
   */
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
