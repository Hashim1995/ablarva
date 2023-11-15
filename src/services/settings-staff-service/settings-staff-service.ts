/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

import { IGlobalResponse } from '@/models/common';
import {
  IAddStaffForm,
  IGetPermissionResponse,
  IGetSingleStaffResponse,
  IGetStaffResponse,
  IStaffStatus
  // IUpdateStaff
} from '@/modules/settings/staff/models';
import {
  ErrorCallBack,
  HttpUtil,
  IHTTPSParams
} from '../adapter-config/config';

export class StaffServies {
  // eslint-disable-next-line no-use-before-define
  private static instance: StaffServies | null;

  private constructor() {}

  public static getInstance(): StaffServies {
    if (!this.instance) {
      StaffServies.instance = new StaffServies();
    }
    return StaffServies.instance!;
  }

  public async changeStatus(
    id: number,
    body: IStaffStatus,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.patch(
      `/authperson/changestatus/${id}`,
      body,
      onError
    );
    return res;
  }

  public async addStaff(
    body: IAddStaffForm,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.post('/authperson', body, onError);
    return res;
  }

  public async getPermisions(
    onError?: ErrorCallBack
  ): Promise<IGetPermissionResponse> {
    const res = await HttpUtil.get('/permission', null, false, onError);
    return res;
  }

  public async getSingleStaff(
    id: number,
    onError?: ErrorCallBack
  ): Promise<IGetSingleStaffResponse> {
    const res = await HttpUtil.get(`/authperson/${id}`, null, false, onError);
    return res;
  }

  public async updateStaff(
    id: number,
    body: IAddStaffForm,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.put(`/authperson/${id}`, body, onError);
    return res;
  }

  public async getStaffList(
    params: IHTTPSParams[],
    onError?: ErrorCallBack
  ): Promise<IGetStaffResponse> {
    const res = await HttpUtil.get(
      '/legalentity/authorizedpersons',
      params,
      false,
      onError
    );
    return res;
  }
}
