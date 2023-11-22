/* eslint-disable no-shadow */
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

export type { selectOption, IGlobalResponse, IMenuItemsNavbar };
