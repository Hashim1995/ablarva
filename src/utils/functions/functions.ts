/* eslint-disable no-restricted-globals */
/* eslint-disable no-else-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-prototype-builtins */
import { selectOption } from '@/models/common';
import { IHTTPSParams } from '@/services/adapter-config/config';
// import { noTxt, sureModalDescription, sureModalTitle, yesTxt } from '../constants/texts';
import { dictionary } from '../constants/dictionary';

const userToken: any = localStorage.getItem('userToken');

/* eslint-disable no-restricted-syntax */
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

function formatDate(inputDateTime: string | Date): string {
  const date = new Date(inputDateTime);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are zero-based
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

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
    return `${seconds}  ${dictionary.en.second} ${dictionary.en.ago}`;
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes}  ${dictionary.en.minute} ${dictionary.en.ago}`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours}  ${dictionary.en.hour} ${dictionary.en.ago}`;
  } else if (diff < week) {
    const days = Math.floor(diff / day);
    return `${days}  ${dictionary.en.day} ${dictionary.en.ago}`;
  } else if (diff < month) {
    const weeks = Math.floor(diff / week);
    return `${weeks}  ${dictionary.en.week} ${dictionary.en.ago}`;
  } else if (diff < year) {
    const months = Math.floor(diff / month);
    return `${months}  ${dictionary.en.month} ${dictionary.en.ago}`;
  } else {
    const years = Math.floor(diff / year);
    return `${years}  ${dictionary.en.year} ${dictionary.en.ago}`;
  }
}

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

const tokenizeImage = async (file: any): Promise<any> => {
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
};

function toCapitalize(str: string): string {
  const words: string[] = str.split(' ');
  const capitalizedWords: string[] = words.map(
    (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return capitalizedWords.join(' ');
}

export {
  convertFormDataToQueryParams,
  generateOptionListPerNumber,
  convertBytesToReadableSize,
  formatDateToWords,
  tokenizeImage,
  formatDate,
  toCapitalize
};

export function convertDateFormat(dateStr: string): string {
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
