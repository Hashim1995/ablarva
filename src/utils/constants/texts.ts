/* eslint-disable prefer-destructuring */
import i18next from 'i18next';

export const selectPlaceholderText = (t?: string): string =>
  t
    ? ` ${i18next.t('placeholderSelectDynamic', { dynamicValue: t })}`
    : i18next.t('pick');

export const inputPlaceholderText = (t?: string): string =>
  t
    ? ` ${i18next.t('placeholderDynamic', { dynamicValue: t })}`
    : i18next.t('enter');

export const templateMessageTexts: string[] = [
  i18next.t('templateMessageText1'),
  i18next.t('templateMessageText2'),
  i18next.t('templateMessageText3'),
  i18next.t('templateMessageText4')
];
