import { selectOption } from '@/models/common';

interface IAccountForm {
  email: string;
  firstName: string;
  lastName: string;
  gender: selectOption | null | string;
  dateOfBirth: string | Date;
}

export type { IAccountForm };
