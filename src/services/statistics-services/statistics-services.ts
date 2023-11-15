/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { IGetStatisticsListResponse } from '@/modules/home/models';
import {
  ErrorCallBack,
  HttpUtil,
  IHTTPSParams
} from '../adapter-config/config';

export class StatisticsServies {
  // eslint-disable-next-line no-use-before-define
  private static instance: StatisticsServies | null;

  private constructor() {}

  public static getInstance(): StatisticsServies {
    if (!this.instance) {
      StatisticsServies.instance = new StatisticsServies();
    }
    return StatisticsServies.instance!;
  }

  public async getStatisticsList(
    params: IHTTPSParams[],
    onError?: ErrorCallBack
  ): Promise<IGetStatisticsListResponse> {
    const res = await HttpUtil.get(
      '/legalentity/docreportcommon',
      params,
      false,
      onError
    );
    return res;
  }
}
