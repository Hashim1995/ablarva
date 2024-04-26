/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { IGlobalResponseEmpty } from '@/models/common';
import { ISenderInformationItem } from '@/modules/EMA/sender-information/types';
import {
    ErrorCallBack,
    HttpUtil,
} from '../adapter-config/config';


export class EmaSenderInformationService {
    // eslint-disable-next-line no-use-before-define
    private static instance: EmaSenderInformationService | null;

    private constructor() { }

    /**
     * Returns the singleton instance of EmaSenderInformationService.
     * @returns The singleton instance of EmaSenderInformationService.
     */
    public static getInstance(): EmaSenderInformationService {
        if (!this.instance) {
            EmaSenderInformationService.instance = new EmaSenderInformationService();
        }
        return EmaSenderInformationService.instance!;
    }

    public async createSenderInformation(
        payload: Omit<ISenderInformationItem, 'id'>,
        onError?: ErrorCallBack,
    ): Promise<IGlobalResponseEmpty> {
        const res = await HttpUtil.post(
            `api/client/settings/emailEntity`,
            payload,
            onError,
            null
        );
        return res;
    }
}
