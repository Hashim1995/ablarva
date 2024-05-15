/* eslint-disable no-use-before-define */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { IGlobalResponse, selectOption } from '@/models/common';
import { ErrorCallBack, HttpUtil } from '../adapter-config/config';

export interface IGetJobTitleListReponse extends IGlobalResponse {
  data: {
    jobTitles: selectOption[];
    total: number;
  };
}

export class EmaCombosServices {
  /**
   * The singleton instance of the EmaCombosServices class.
   */
  private static instance: EmaCombosServices | null;

  /**
   * Constructs a new instance of the EmaCombosServices class.
   * Private to enforce the singleton pattern.
   */
  private constructor() {}

  /**
   * Gets the singleton instance of the EmaCombosServices class.
   * If the instance does not exist, creates a new instance.
   * @returns The singleton instance of the EmaCombosServices class.
   */
  public static getInstance(): EmaCombosServices {
    if (!this.instance) {
      EmaCombosServices.instance = new EmaCombosServices();
    }
    return EmaCombosServices.instance!;
  }

  /**
   * Retrieves the pricing list for a given ID.
   * @param id - The ID of the pricing list.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to the pricing data response.
   */
  public async getJobTitleList(
    onError?: ErrorCallBack
  ): Promise<IGetJobTitleListReponse> {
    const res = await HttpUtil.get(
      `api/client/common/jobTitles`,
      null,
      false,
      onError
    );
    return res;
  }
}
