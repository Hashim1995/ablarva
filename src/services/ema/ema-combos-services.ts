/* eslint-disable no-use-before-define */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { IGlobalResponse, selectOption } from '@/models/common';
import { ErrorCallBack, HttpUtil } from '../adapter-config/config';

export interface IListReponse extends IGlobalResponse {
  data: selectOption[];
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
  private constructor() { }

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

  public async getSenderInformationList(
    onError?: ErrorCallBack
  ): Promise<IListReponse> {
    const res = await HttpUtil.get(
      `api/client/senderInformations/select`,
      null,
      false,
      onError
    );
    return res;
  }


  public async getJobTitleList(
    onError?: ErrorCallBack
  ): Promise<IListReponse> {
    const res = await HttpUtil.get(
      `api/client/common/jobTitles`,
      null,
      false,
      onError
    );
    return res;
  }
}
