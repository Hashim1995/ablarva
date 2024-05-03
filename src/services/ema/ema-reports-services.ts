/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import {
  ErrorCallBack,
  HttpUtil,
  IHTTPSParams
} from '../adapter-config/config';

/**
 * Represents the EmaReportsServices class. It contains methods for reports services. It is a singleton class. It is used to retrieve email reports. It uses the HttpUtil class for HTTP requests.
 * @example
 * const reportsServices = EmaReportsServices.getInstance();
 * EmaReportsServices.getEmailReports(param, onError);
 * EmaReportsServices.getAssistantReports(param, onError);
 */
export class EmaReportsServices {
  // eslint-disable-next-line no-use-before-define
  private static instance: EmaReportsServices | null;

  private constructor() { }

  /**
   * Returns the singleton instance of EmaReportsServices.
   * @returns The singleton instance of EmaReportsServices.
   */
  public static getInstance(): EmaReportsServices {
    if (!this.instance) {
      EmaReportsServices.instance = new EmaReportsServices();
    }
    return EmaReportsServices.instance!;
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
  ): Promise<any> {
    const res = await HttpUtil.get(
      'api/client/assistantRecords/emailMarketer',
      param,
      false,
      onError
    );
    return res;
  }
}
