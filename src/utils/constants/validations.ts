import { dictionary } from './dictionary';

export const onlyNumber = (t?: string): string =>
  t ? `${t} filed should contain only digits` : dictionary.en.onlyDigitsField;

export const inputValidationText = (t?: string): string =>
  t ? `${t} xanasının daxil edilməsi məcburidir` : dictionary.en.required;
export const minLengthCheck = (t: string, l: string): string =>
  `${t} field should contain at least ${l} characters`;
export const maxLengthCheck = (t: string, l: string): string =>
  `${t} field shoud be maximum ${l} characters`;
