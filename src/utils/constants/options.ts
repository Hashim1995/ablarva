/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-restricted-globals */
import { selectOption } from '@/models/common';
import { dictionary } from './dictionary';

const statusOptions: selectOption[] = [
  {
    value: '1',
    label: dictionary.en.active
  },
  {
    value: '2',
    label: dictionary.en.deactivated
  }
];

const isBlockedOptions: selectOption[] = [
  {
    value: '1',
    label: dictionary.en.blocked
  },
  {
    value: '2',
    label: dictionary.en.unblocked
  }
];

const roleOptions: selectOption[] = [
  {
    value: '1',
    label: dictionary.en.admin
  },
  {
    value: '2',
    label: dictionary.en.moderator
  }
];

const docStatusOptions: selectOption[] = [
  {
    value: 1,
    label: dictionary.en.docStatusAgree
  },
  {
    value: 2,
    label: dictionary.en.docStatusSign
  }
];

const fileTypeOptions: selectOption[] = [
  {
    value: 1,
    label: dictionary.en.fileTypeIsMain
  },
  {
    value: 2,
    label: dictionary.en.fileTypeIsPrivate
  }
];

const genderOptions: selectOption[] = [
  {
    value: '1',
    label: dictionary.az.male
  },
  {
    value: '2',
    label: dictionary.az.female
  }
];

export {
  genderOptions,
  roleOptions,
  fileTypeOptions,
  docStatusOptions,
  isBlockedOptions,
  statusOptions
};
