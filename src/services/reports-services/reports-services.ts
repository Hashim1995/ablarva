/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */


import { IEmailReportItemResponse } from '@/modules/reports/entities/email-reports/types';
import {
    ErrorCallBack,
    HttpUtil,
    IHTTPSParams,
} from '../adapter-config/config';

export class ReportsServices {
    // eslint-disable-next-line no-use-before-define
    private static instance: ReportsServices | null;

    private constructor() { }

    public static getInstance(): ReportsServices {
        if (!this.instance) {
            ReportsServices.instance = new ReportsServices();
        }
        return ReportsServices.instance!;
    }



    public async getEmailReports(param: IHTTPSParams[], onError?: ErrorCallBack): Promise<IEmailReportItemResponse> {
        const res = await HttpUtil.get(
            'api/client/assistantRecords/emailMarketer',
            param,
            false,
            onError
        );
        return res;
    }


}
