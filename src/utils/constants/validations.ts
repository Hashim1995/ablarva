import i18next from 'i18next';

export const onlyNumber = (t?: string): string =>
  t
    ? `${t} ${i18next.t('fieldShouldContainNumbers')}`
    : i18next.t('fieldShouldContainNumbers');

export const inputValidationText = (t?: string): string =>
  t ? `${t} ${i18next.t('xFieldMustBeEntered')}` : i18next.t('required');
export const minLengthCheck = (t: string, l: string): string =>
  `${t} ${i18next.t('xfieldShouldContainAtLeastSymbol', {
    dynamicValue: l || 1
  })}`;
export const maxLengthCheck = (t: string, l: string): string =>
  `${t} ${i18next.t('xfieldShouldContainMaxSymbol', { dynamicValue: l || 1 })}`;
