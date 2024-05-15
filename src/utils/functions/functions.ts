/* eslint-disable radix */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-else-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-prototype-builtins */
import { selectOption } from '@/models/common';
import { IHTTPSParams } from '@/services/adapter-config/config';
import i18next from 'i18next';

/**
 * Converts form data to query parameters.
 * @param formData - The form data to convert.
 * @returns An array of objects representing the query parameters.
 * @example convertFormDataToQueryParams({ name: 'John', age: 30 }) // returns [{ name: 'name', value: 'John' }, { name: 'age', value: 30 }]
 */
function convertFormDataToQueryParams<T>(formData: T): IHTTPSParams[] {
  const z: IHTTPSParams[] = [];
  for (const key in formData) {
    if (formData?.hasOwnProperty(key)) {
      z.push({
        name: key,
        value: formData[key] as string | number | null | selectOption
      });
    }
  }
  return z;
}

/**
 * Converts a number of bytes to a human-readable size format.
 * @param bytes - The number of bytes to convert.
 * @returns A string representing the human-readable size format.
 * @example convertBytesToReadableSize(1024) // returns '1 KB'
 */
function convertBytesToReadableSize(bytes: number): string {
  const suffixes: string[] = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let i: number = 0;
  while (bytes >= 1024 && i < suffixes.length - 1) {
    bytes /= 1024;
    i++;
  }
  const sizeFormat: string = `${bytes?.toFixed(1)} ${suffixes[i]}`;
  return sizeFormat;
}

/**
 * Formats a date or string to a human-readable format in words. The format is based on the difference between the given date and the current date. The difference is calculated in seconds, minutes, hours, days, weeks, months, and years.
 * @param date - The date or string to be formatted.
 * @returns A string representing the formatted date in words.
 * @example formatDateToWords(new Date('2021-08-01T12:00:00')) // returns '1 month ago'
 */
function formatDateToWords(date: Date | string): string {
  const now = new Date();
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const diff = now.getTime() - date.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (diff < minute) {
    const seconds = Math.floor(diff / 1000);
    return `${seconds}  ${i18next.t('second')} ${i18next.t('ago')}`;
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes}  ${i18next.t('minute')} ${i18next.t('ago')}`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours}  ${i18next.t('hour')} ${i18next.t('ago')}`;
  } else if (diff < week) {
    const days = Math.floor(diff / day);
    return `${days}  ${i18next.t('day')} ${i18next.t('ago')}`;
  } else if (diff < month) {
    const weeks = Math.floor(diff / week);
    return `${weeks}  ${i18next.t('week')} ${i18next.t('ago')}`;
  } else if (diff < year) {
    const months = Math.floor(diff / month);
    return `${months}  ${i18next.t('month')} ${i18next.t('ago')}`;
  } else {
    const years = Math.floor(diff / year);
    return `${years}  ${i18next.t('year')} ${i18next.t('ago')}`;
  }
}

/**
 * Generates an array of select options based on the given number.
 * Each option has a value and label equal to the corresponding number.
 * @param num - The number to generate options for.
 * @returns An array of select options.
 */
function generateOptionListPerNumber(num: number): selectOption[] {
  const data = [];
  for (let i = 1; i < num + 1; i++) {
    data.push({
      value: i,
      label: `${i}`
    });
  }
  return data;
}

/**
 * Tokenizes an image file. It fetches the image file from the server and creates a tokenized version of the image file. The tokenized image file is then returned. If the image file is already cached, the cached version is used.
 * @param file - The image file to be tokenized.
 * @param userToken - The user token to be used for authentication.
 * @param userToken - The user token to be used for authentication.
 * @param cache - The cache to be used for caching the image file.
 * @param fetch - The fetch function to be used for fetching the image file.
 * @param Response - The Response object to be used for creating a response.
 * @returns A Promise that resolves to the tokenized image file.
 */

async function tokenizeImage(file: any, userToken: any): Promise<any> {
  const newFile = {
    ...file,
    status: 'done'
  };

  const src = newFile.fileUrl;
  const cache = await caches.open('imageCache');
  const cachedResponse = await cache.match(src);
  if (cachedResponse) {
    const blob = await cachedResponse.blob();
    const objectUrl = URL.createObjectURL(blob);
    newFile.url = objectUrl;
  } else {
    const response = await fetch(src, {
      headers: {
        AuthPerson: userToken?.replace(/['"]+/g, '')
      }
    });
    if (response.ok) {
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      src && (await cache.put(src, new Response(blob)));
      newFile.url = objectUrl;
    }
  }
  return newFile;
}

/**
 * Capitalizes the first letter of each word in a given string.
 *
 * @param str - The string to be capitalized.
 * @returns The capitalized string.
 */
function toCapitalize(str: string): string {
  const words: string[] = str.split(' ');
  const capitalizedWords: string[] = words.map(
    (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return capitalizedWords.join(' ');
}

/**
 * Converts a date string from the format 'dd.mm.yyyy' to 'yyyy-mm-dd'.
 *
 * @param dateStr - The date string to be converted.
 * @returns The converted date string in the format 'yyyy-mm-dd'.
 * @throws Error if the date string is invalid or contains invalid components.
 */
function convertDateFormat(dateStr: string): string {
  // Split the date by the '.' delimiter
  const parts = dateStr.split('.');
  // Check if the date string is valid
  if (parts.length !== 3) {
    throw new Error('Invalid date format');
  }
  const [day, month, year] = parts;

  // Check if day, month, and year are valid numbers
  if (isNaN(+day) || isNaN(+month) || isNaN(+year)) {
    throw new Error('Invalid date components');
  }
  // Pad the day and month with leading zero if necessary
  const paddedDay = day.padStart(2, '0');
  const paddedMonth = month.padStart(2, '0');
  // Format the date as 'yyyy-mm-dd'
  return `${year}-${paddedMonth}-${paddedDay}`;
}

/**
 * Converts a date string in the format "DD.MM.YYYY" to an ISO string.
 * @param dateStr - The date string to convert.
 * @returns The converted date string in ISO format.
 */
function convertDDMMYYYtoISOString(dateStr: string): string {
  const [day, month, year] = dateStr.split('.');
  // Set the date at noon to avoid any DST changes that might affect the date
  const dateObj = new Date(+year, +month - 1, +day, 12).toISOString();
  return dateObj;
}

function formatUrl(url: string) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

export {
  convertFormDataToQueryParams,
  generateOptionListPerNumber,
  convertBytesToReadableSize,
  formatDateToWords,
  tokenizeImage,
  toCapitalize,
  convertDateFormat,
  convertDDMMYYYtoISOString, formatUrl
};
