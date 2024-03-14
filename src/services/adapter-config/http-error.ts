/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/**
 * Represents an HTTP error.
 */
export class HttpError {
  /**
   * Creates a new instance of the HttpError class.
   * @param code The HTTP status code of the error.
   * @param message The error message.
   * @param rawError The raw error object.
   */
  constructor(
    public code: number,
    public message: string | string[],
    public rawError: any
  ) { }

  /**
   * Indicates whether the default behavior should be prevented.
   */
  preventDefault: boolean = false;
}
