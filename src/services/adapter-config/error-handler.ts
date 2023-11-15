/* eslint-disable array-callback-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { toast } from 'react-toastify';
import { toastOptions } from '@/configs/global-configs';

export class ErrorHandler {
  private static instance: ErrorHandler | null;

  private constructor() {}

  public static getInstance(): ErrorHandler {
    if (!this.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance!;
  }

  public showError(messageText: string | string[]): void {
    if (Array.isArray(messageText)) {
      messageText.map((z: string) => {
        toast.error(z, toastOptions);
      });
    } else {
      toast.error(messageText, toastOptions);
    }
  }
}
