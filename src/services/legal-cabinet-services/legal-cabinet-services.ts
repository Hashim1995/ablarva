/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { IGlobalResponse } from '@/models/common';
import {
  IGetLegalEntityDataResponse,
  IImageDataResponse,
  ILegalEntityData
} from '@/modules/legal-cabinet/models';

import { ErrorCallBack, HttpUtil } from '../adapter-config/config';

export class LegalCabinetServies {
  // eslint-disable-next-line no-use-before-define
  private static instance: LegalCabinetServies | null;

  private constructor() {}

  public static getInstance(): LegalCabinetServies {
    if (!this.instance) {
      LegalCabinetServies.instance = new LegalCabinetServies();
    }
    return LegalCabinetServies.instance!;
  }

  public async updateLegalEntityData(
    body: Partial<ILegalEntityData>,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.put(`/legalentity`, body, onError);
    return res;
  }

  public async postLegalEntityImage(
    folderType: number,
    payload: any,
    onError?: ErrorCallBack
  ): Promise<IImageDataResponse> {
    const res = await HttpUtil.post(`/file/${folderType}`, payload, onError);
    return res;
  }

  public async getLegalEntityData(
    onError?: ErrorCallBack
  ): Promise<IGetLegalEntityDataResponse> {
    const res = await HttpUtil.get('/legalentity/signed', null, false, onError);
    return res;
  }
}
