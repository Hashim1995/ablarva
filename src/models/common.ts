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

export type { selectOption, IGlobalResponse };
