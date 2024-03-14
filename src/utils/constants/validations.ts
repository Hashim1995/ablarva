import i18next from 'i18next';

/**
 * Returns a string with the provided text and a validation message.
 * If the text is provided, it appends the validation message to it.
 * If the text is not provided, it returns only the validation message.
 *
 * @param t - The text to append the validation message to (optional).
 * @returns A string with the provided text and a validation message.
 */
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
