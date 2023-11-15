/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { IGlobalResponse } from '@/models/common';
import {
  IGetNotificationsListResponse,
  IReadNotificationPayload
} from '@/modules/notifications/models';
import {
  ErrorCallBack,
  HttpUtil,
  IHTTPSParams
} from '../adapter-config/config';

export class NotificationServices {
  // eslint-disable-next-line no-use-before-define
  private static instance: NotificationServices | null;

  private constructor() {}

  public static getInstance(): NotificationServices {
    if (!this.instance) {
      NotificationServices.instance = new NotificationServices();
    }
    return NotificationServices.instance!;
  }

  public async getAllNotifications(
    params: IHTTPSParams[],
    onError?: ErrorCallBack
  ): Promise<IGetNotificationsListResponse> {
    const res = await HttpUtil.get(
      '/notification/getall',
      params,
      false,
      onError
    );
    return res;
  }

  public async readAllNotifications(
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.post('/notification/readall', onError);
    return res;
  }

  public async readNotification(
    payload: IReadNotificationPayload,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.post('/notification/read', payload, onError);
    return res;
  }
}
