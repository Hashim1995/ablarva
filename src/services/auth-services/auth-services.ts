/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { IAuth, ILogin, IUserData, IUserRegister } from '@/models/user';
import { IGlobalResponse } from '@/models/common';
import { ErrorCallBack, HttpUtil } from '../adapter-config/config';

export interface IAuthResponse extends IGlobalResponse {
  Data: IAuth;
}
export interface ILoginResponse extends IGlobalResponse {
  data: IUserData;
}
export interface IRegisterResponse extends IGlobalResponse {
  data: IUserRegister;
}


export class AuthService {
  // eslint-disable-next-line no-use-before-define
  private static instance: AuthService | null;

  private constructor() { }

  public static getInstance(): AuthService {
    if (!this.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance!;
  }

  public async getUserData(onError?: ErrorCallBack): Promise<IAuthResponse> {
    const res = await HttpUtil.get(
      '/authpersonauthentication/me',
      null,
      false,
      onError
    );
    return res;
  }

  public async login(
    body: ILogin,
    onError?: ErrorCallBack
  ): Promise<ILoginResponse> {
    const res = await HttpUtil.post('api/client/user/Login', body, onError);
    return res;
  }

  public async register(body: IUserRegister, onError?: ErrorCallBack): Promise<IRegisterResponse> {
    const res = await HttpUtil.post('api/client/user/Register', body, onError);
    return res;
  }

}
