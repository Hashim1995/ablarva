/* eslint-disable no-use-before-define */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import {
  ILogin,
  IUserData,
  IUserLoggedData,
  IUserRegister
} from '@/models/user';
import { IGlobalResponse, IGlobalResponseEmpty } from '@/models/common';
import { IAccountPayload } from '@/modules/cabinet/types';
import { IForgotPasswordForm } from '@/core/static-components/login/forgot-password';
import { IVerifyEmailForm } from '@/core/static-components/verify-email';
import { IChangePasswordForm } from '@/modules/cabinet/components/account/change-password';
import { IFeedbackModalForm } from '@/core/static-components/feedback-modal';
import { ErrorCallBack, HttpUtil } from '../adapter-config/config';

export interface IGetMeResponse extends IGlobalResponse {
  data: IUserLoggedData;
}
export interface ILoginResponse extends IGlobalResponse {
  data: IUserData;
}
export interface IRegisterResponse extends IGlobalResponse {
  data: IUserRegister;
}

/**
 * Represents the AuthService class. It contains methods for authentication services. It is a singleton class. It is used to get user details, login, forget password, reset password, verify email, send feedback, resend verification code, change password, change user details, and register. It uses the HttpUtil class for HTTP requests.
 * @example
 * const authService = AuthService.getInstance();
 * authService.getMe(onError);
 * authService.login(body, onError);
 */
export class AuthService {
  /**
   * The singleton instance of the AuthService class.
   */
  private static instance: AuthService | null;

  /**
   * Constructs a new instance of the AuthService class.
   * Private to enforce the singleton pattern.
   */
  private constructor() {}

  /**
   * Gets the singleton instance of the AuthService class.
   * If the instance does not exist, creates a new instance.
   * @returns The singleton instance of the AuthService class.
   */
  public static getInstance(): AuthService {
    if (!this.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance!;
  }

  /**
   * Retrieves the user details.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to the user details.
   */
  public async getMe(onError?: ErrorCallBack): Promise<IGetMeResponse> {
    const res = await HttpUtil.get(
      'api/client/user/Details',
      null,
      false,
      onError
    );
    return res;
  }

  /**
   * Logs in the user.
   * @param body - The login credentials.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to the login response.
   */
  public async login(
    body: ILogin,
    onError?: ErrorCallBack
  ): Promise<ILoginResponse> {
    const res = await HttpUtil.post('api/client/user/Login', body, onError);
    return res;
  }

  /**
   * Sends a request to reset the user's password.
   * @param body - The forgot password form data.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to an empty response.
   */
  public async forgetPassword(
    body: IForgotPasswordForm,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponseEmpty> {
    const res = await HttpUtil.post(
      'api/client/user/ResetPassword',
      body,
      onError
    );
    return res;
  }

  /**
   * Sends a request to update the user's password.
   * @param body - The forgot password form data.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to an empty response.
   */
  public async resetPassword(
    body: IForgotPasswordForm,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponseEmpty> {
    const res = await HttpUtil.put(
      'api/client/user/UpdatePassword',
      body,
      onError
    );
    return res;
  }

  /**
   * Sends a request to verify the user's email.
   * @param body - The verify email form data.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to an empty response.
   */
  public async verifyEmail(
    body: IVerifyEmailForm,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponseEmpty> {
    const res = await HttpUtil.post('api/client/user/Verify', body, onError);
    return res;
  }

  /**
   * Sends a request to send feedback.
   * @param body - The feedback form data.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to an empty response.
   */
  public async sendFeedback(
    body: IFeedbackModalForm,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponseEmpty> {
    const res = await HttpUtil.post('api/client/user/feedback', body, onError);
    return res;
  }

  /**
   * Sends a request to resend the verification code.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to an empty response.
   */
  public async resendVerificationCode(
    onError?: ErrorCallBack
  ): Promise<IGlobalResponseEmpty> {
    const res = await HttpUtil.post(
      'api/client/user/ResendVerificationCode',
      null,
      onError
    );
    return res;
  }

  /**
   * Sends a request to change the user's password.
   * @param body - The change password form data.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to an empty response.
   */
  public async changePassword(
    body: IChangePasswordForm,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponseEmpty> {
    const res = await HttpUtil.put('api/client/user/Password', body, onError);
    return res;
  }

  /**
   * Sends a request to change the user's details.
   * @param body - The account payload data.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to an empty response.
   */
  public async changeUserDetail(
    body: IAccountPayload,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponseEmpty> {
    const res = await HttpUtil.put('api/client/user/Details', body, onError);
    return res;
  }

  /**
   * Sends a request to register a new user.
   * @param body - The user registration data.
   * @param onError - Optional callback function to handle errors.
   * @returns A promise that resolves to the registration response.
   */
  public async register(
    body: IUserRegister,
    onError?: ErrorCallBack
  ): Promise<IRegisterResponse> {
    const res = await HttpUtil.post('api/client/user/Register', body, onError);
    return res;
  }

  /**
   * Sends a request to remove a user session.
   * @param id - The ID of the session to remove.
   * @param onError - Optional callback function to handle errors.
   * @param abortController - Optional AbortController signal to abort the request.
   * @returns A promise that resolves to an empty response.
   */
  public async removeSession(
    id: number,
    onError?: ErrorCallBack,
    abortController?: AbortController['signal']
  ): Promise<IGlobalResponseEmpty> {
    const res = await HttpUtil.delete(
      `api/client/user/Sessions/${id}`,
      onError,
      abortController
    );
    return res;
  }
}
