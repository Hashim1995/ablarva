/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { IEmailReportItemResponse } from '@/modules/reports/entities/email-reports/types';
import {
  ErrorCallBack,
  HttpUtil,
  IHTTPSParams
} from '../adapter-config/config';

/**
 * Represents the ReportsServices class. It contains methods for reports services. It is a singleton class. It is used to retrieve email reports. It uses the HttpUtil class for HTTP requests.
 * @example
 * const reportsServices = ReportsServices.getInstance();
 * reportsServices.getEmailReports(param, onError);
 * reportsServices.getAssistantReports(param, onError);
 */
export class ReportsServices {
  // eslint-disable-next-line no-use-before-define
  private static instance: ReportsServices | null;

  private constructor() { }

  /**
   * Returns the singleton instance of ReportsServices.
   * @returns The singleton instance of ReportsServices.
   */
  public static getInstance(): ReportsServices {
    if (!this.instance) {
      ReportsServices.instance = new ReportsServices();
    }
    return ReportsServices.instance!;
  }

  /**
   * Retrieves email reports based on the provided parameters.
   * @param param - An array of IHTTPSParams objects representing the parameters for the request.
   * @param onError - An optional callback function to handle errors.
   * @returns A Promise that resolves to an IEmailReportItemResponse object representing the email reports.
   */
  public async getEmailReports(
    param: IHTTPSParams[],
    onError?: ErrorCallBack
  ): Promise<IEmailReportItemResponse> {
    const res = await HttpUtil.get(
      'api/client/assistantRecords/emailMarketer',
      param,
      false,
      onError
    );
    return res;
  }
}
