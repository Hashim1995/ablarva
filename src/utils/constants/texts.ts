/* eslint-disable prefer-destructuring */
import { dictionary } from './dictionary';

export const inputPlaceholderText = (t?: string): string =>
  t ? `${t} daxil edin` : dictionary.en.enter;

export const selectPlaceholderText = (t?: string): string =>
  t ? `Please select from ${t} field` : dictionary.en.select;

// export const yesTxt: string = dictionary.en.yesTxt;
// export const searchTxt: string = dictionary.en.searchTxt;
// export const resetTxt: string = dictionary.en.resetTxt;
// export const refreshTxt: string = dictionary.en.refreshTxt;
// export const noTxt: string = dictionary.en.noTxt;
// export const addBtn: string = dictionary.en.addBtn;
// export const editBtn: string = dictionary.en.editBtn;
// export const closeBtn: string = dictionary.en.closeBtn;
// export const viewImgModalHeader: string = dictionary.en.viewImgModalHeader;
// export const noDataText: string = dictionary.en.noDataText;
// export const sureModalTitle: string = dictionary.en.confirmTitle;
// export const sureModalDescription: string = dictionary.en.confirmDelete;
