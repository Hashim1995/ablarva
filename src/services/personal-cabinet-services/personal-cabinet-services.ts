/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { IGlobalResponse } from '@/models/common';
import { IPersonalData } from '@/modules/personal-cabinet/models';

import { ErrorCallBack, HttpUtil } from '../adapter-config/config';

export class PersonalCabinetServies {
  // eslint-disable-next-line no-use-before-define
  private static instance: PersonalCabinetServies | null;

  private constructor() {}

  public static getInstance(): PersonalCabinetServies {
    if (!this.instance) {
      PersonalCabinetServies.instance = new PersonalCabinetServies();
    }
    return PersonalCabinetServies.instance!;
  }

  public async updatePersonalData(
    body: Partial<IPersonalData>,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.put(`/authperson`, body, onError);
    return res;
  }
}
