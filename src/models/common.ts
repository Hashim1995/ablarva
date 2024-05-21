/* eslint-disable no-unused-vars */
/**
 * This file contains interfaces and types used in the application.
 */

/* eslint-disable no-shadow */

import { Dispatch, SetStateAction } from 'react';

/**
 * Represents the global response object.
 */
interface IGlobalResponse {
  errors: null | string | string[];
  isSuccess: boolean;
}

/**
 * Represents the global response object with an additional data property.
 */
interface IGlobalResponseEmpty {
  errors: null | string | string[];
  isSuccess: boolean;
  data: null | boolean;
}

/**
 * Represents a select option.
 */
interface selectOption {
  value: string | number;
  label: string;
}

/**
 * Represents a menu item in the navigation bar.
 */
interface IMenuItemsNavbar {
  label: string;
  path: string;
  icon: any;
}

/**
 * Represents the usage statistics.
 */
interface UsageStats {
  total: number;
  usage: number;
  remainder: number;
}

/**
 * Represents the statistics update data.
 */
interface StatisticsUpdateData {
  isSuccess: boolean;
  data: {
    title: string;
    packageName: string;
    basic: UsageStats;
    premium: UsageStats;
    basicAssistant: UsageStats;
    premiumAssistant: UsageStats;
  };
  errors: any;
}

/**
 * Represents the layout language options.
 */
export enum LayoutLanguage {
  Azerbaijani = 'az',
  English = 'en',
  Russian = 'ru'
}

/**
 * Represents the state setter function.
 */
type setState<T> = Dispatch<SetStateAction<T>>;


interface IDropzoneFile {
  path: string,
  lastModifiedDate: Date,
  name: string,
  size: number,
  type: string,
}

export type {
  IGlobalResponseEmpty,
  selectOption,
  setState,
  IGlobalResponse,
  IMenuItemsNavbar,
  StatisticsUpdateData, IDropzoneFile
};
