/* eslint-disable no-use-before-define */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { IGlobalResponse } from '@/models/common';
import {
  IBuyPacketBody,
  IBuyPacketResponse
} from '@/modules/EMA/billing/types';
import { ITransactionsItem } from '@/modules/EMA/cabinet/types';
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
 * Represents a EmaBillingServices class. It contains methods for payment services. It is a singleton class. It is used to get pricing list, buy a packet, and get transactions. It uses the HttpUtil class for HTTP requests. It is used in the Pricing module.
 * @example
 * const EmaBillingServices = EmaBillingServices.getInstance();
 * EmaBillingServices.getPricingList(id, onError);
 * EmaBillingServices.buyPacket(body, onError);
 * EmaBillingServices.getTransactions(params, onError);
 */
export class EmaBillingServices {
  /**
   * The singleton instance of the EmaBillingServices class.
   */
  private static instance: EmaBillingServices | null;

  /**
   * Constructs a new instance of the EmaBillingServices class.
   * Private to enforce the singleton pattern.
   */
  private constructor() {}

  /**
   * Gets the singleton instance of the EmaBillingServices class.
   * If the instance does not exist, creates a new instance.
   * @returns The singleton instance of the EmaBillingServices class.
   */
  public static getInstance(): EmaBillingServices {
    if (!this.instance) {
      EmaBillingServices.instance = new EmaBillingServices();
    }
    return EmaBillingServices.instance!;
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
