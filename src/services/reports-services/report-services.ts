/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import {
  IGetDocumentTypesListResponse,
  IGetGeneralCountsListResponse,
  IGetReportsListByStatusResponse
} from '@/modules/reports/models';
import {
  ErrorCallBack,
  HttpUtil,
  IHTTPSParams
} from '../adapter-config/config';

export class ReportServices {
  // eslint-disable-next-line no-use-before-define
  private static instance: ReportServices | null;

  private constructor() {}

  public static getInstance(): ReportServices {
    if (!this.instance) {
      ReportServices.instance = new ReportServices();
    }
    return ReportServices.instance!;
  }

  public async getYearlyReportsListByStatus(
    params: IHTTPSParams[],
    onError?: ErrorCallBack
  ): Promise<IGetReportsListByStatusResponse> {
    const res = await HttpUtil.get(
      '/report/yearlydocreportbystatus',
      params,
      false,
      onError
    );
    return res;
  }

  public async getGeneralCountsList(
    params: IHTTPSParams[],
    onError?: ErrorCallBack
  ): Promise<IGetGeneralCountsListResponse> {
    const res = await HttpUtil.get(
      '/report/yearlydocreportbymonth',
      params,
      false,
      onError
    );
    return res;
  }

  public async getDocumentTypesList(
    params: IHTTPSParams[],
    onError?: ErrorCallBack
  ): Promise<IGetDocumentTypesListResponse> {
    const res = await HttpUtil.get(
      '/report/yearlydocreportbytype',
      params,
      false,
      onError
    );
    return res;
  }
}
