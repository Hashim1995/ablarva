/* eslint-disable no-shadow */

import { Dispatch, SetStateAction } from "react";

/* eslint-disable no-unused-vars */
interface IGlobalResponse {
  errors: null | string | string[];
  isSuccess: boolean;
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

type setState = Dispatch<SetStateAction<boolean>>
export type { selectOption, setState, IGlobalResponse, IMenuItemsNavbar };
