/* eslint-disable prefer-destructuring */
import i18next from 'i18next'

export const inputPlaceholderText = (t?: string): string =>
  t ? `${t} ${i18next.t('enter')}` : i18next.t('enter');

export const selectPlaceholderText = (t?: string): string =>
  t ? `${t} ${i18next.t("pick")}` : i18next.t("pick");

