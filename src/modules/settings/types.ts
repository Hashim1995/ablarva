import { selectOption } from '@/models/common';

interface IAccountForm {
  email: string;
  firstName: string;
  lastName: string;
  gender: string | number;
  dateOfBirth: string | Date | selectOption;
}

export type { IAccountForm };
