/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { toast } from 'react-toastify';
import { toastOptions } from '@/configs/global-configs';

/**
 * Represents an error handler that handles and displays error messages.
 */
export class ErrorHandler {
  private static instance: ErrorHandler | null;

  private constructor() {}

  /**
   * Gets the singleton instance of the ErrorHandler class.
   * @returns The ErrorHandler instance.
   */
  public static getInstance(): ErrorHandler {
    if (!this.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance!;
  }

  /**
   * Displays an error message.
   * @param messageText - The error message to display. It can be a string or an array of strings.
   */
  public showError(messageText: string | string[]): void {
    if (Array.isArray(messageText)) {
      messageText.map((z: string) => {
        // toast.error(z, toastOptions);
      });
    } else {
      // toast.error(messageText, toastOptions);
    }
  }
}
