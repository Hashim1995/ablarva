/* eslint-disable no-shadow */

import { Dispatch, SetStateAction } from 'react';

/* eslint-disable no-unused-vars */
interface IGlobalResponse {
  errors: null | string | string[];
  isSuccess: boolean;
}
interface IGlobalResponseEmpty {
  errors: null | string | string[];
  isSuccess: boolean;
  data: null | boolean,
}

interface selectOption {
  value: string | number;
  label: string;
}

interface IMenuItemsNavbar {
  label: string;
  path: string;
  icon: any;
}

type setState = Dispatch<SetStateAction<boolean>>;
export type {
  IGlobalResponseEmpty,
  selectOption,
  setState,
  IGlobalResponse,
  IMenuItemsNavbar
};
