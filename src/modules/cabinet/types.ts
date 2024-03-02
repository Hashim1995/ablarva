import { selectOption } from '@/models/common';

interface IAccountForm {
  email: string;
  firstName: string;
  lastName: string;
  gender: selectOption | null | string;
  dateOfBirth: string | Date;
  day?: any;
  month?: any;
  year?: any;
}

interface ITransactionsItem {
  id: number;
  userId: number;
  packageId: number;
  amount: number;
  transactionDate: string | Date;
  status: string;
  orderId: string;
}

interface IAccountPayload extends Omit<IAccountForm, 'email'> {}

export type { IAccountForm, ITransactionsItem, IAccountPayload };
