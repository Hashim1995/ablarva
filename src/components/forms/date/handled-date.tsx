import { useTranslation } from 'react-i18next';
import { dictionary } from '@/utils/constants/dictionary';
import { inputValidationText } from '@/utils/constants/validations';
import { BsCalendarWeekFill } from 'react-icons/bs';
import { ReactNode } from 'react';
import AppHandledInput from '../input/handled-input';

interface IHandledDate {
  control: any;
  errors?: any;
  fieldsIsDisable?: boolean;
  label?: ReactNode;
  className?: string;
}

function AppHandledDate({
  control,
  errors,
  fieldsIsDisable,
  label,
  className
}: IHandledDate) {
  const { t } = useTranslation();

  return (
    <div className={`grid grid-cols-3 gap-4 ${className}`}>
      <AppHandledInput
        name="day"
        inputProps={{
          id: 'day',
          labelPlacement: 'outside',
          label,
          isDisabled: fieldsIsDisable
        }}
        type="number"
        control={control}
        isInvalid={Boolean(errors.day?.message)}
        errors={errors}
        size="sm"
        className="text-black bg-transparent text-base sm:text-xl"
        rules={{
          required: {
            value: true,
            message: inputValidationText(t('day'))
          },
          pattern: {
            value: /(0[1-9]|[12]\d|3[01])/,
            message: `${t('day')} ${t('regexFormatValidatorText')}`
          },
          minLength: {
            value: 2,
            message: `${t('day')} ${t('regexFormatValidatorText')}`
          },
          maxLength: {
            value: 2,
            message: `${t('day')} ${t('regexFormatValidatorText')}`
          }
        }}
        placeholder={t('day')}
        required
        // eslint-disable-next-line react/no-unstable-nested-components
        IconElement={() => (
          <BsCalendarWeekFill
            size={16}
            color={errors.day?.message ? '#f31260' : ''}
            className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
          />
        )}
      />
      <AppHandledInput
        name="month"
        inputProps={{
          id: 'month',
          labelPlacement: 'outside',
          label: label ? ' ' : '',
          isDisabled: fieldsIsDisable
        }}
        type="number"
        control={control}
        isInvalid={Boolean(errors.month?.message)}
        errors={errors}
        size="sm"
        className="text-black bg-transparent text-base sm:text-xl"
        rules={{
          required: {
            value: true,
            message: inputValidationText(t('month'))
          },
          pattern: {
            value: /\b(0[1-9]|1[0-2])/,
            message: `${t('day')} ${t('regexFormatValidatorText')}`
          },
          minLength: {
            value: 2,
            message: `${t('day')} ${t('regexFormatValidatorText')}`
          },
          maxLength: {
            value: 2,
            message: `${t('day')} ${t('regexFormatValidatorText')}`
          }
        }}
        placeholder={t('month')}
        required
        // eslint-disable-next-line react/no-unstable-nested-components
        IconElement={() => (
          <BsCalendarWeekFill
            size={16}
            color={errors.month?.message ? '#f31260' : ''}
            className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
          />
        )}
      />
      <AppHandledInput
        name="year"
        inputProps={{
          id: 'year',
          labelPlacement: 'outside',
          label: label ? ' ' : '',
          isDisabled: fieldsIsDisable
        }}
        type="number"
        control={control}
        isInvalid={Boolean(errors.year?.message)}
        errors={errors}
        size="sm"
        className="text-black bg-transparent text-base sm:text-xl"
        rules={{
          required: {
            value: true,
            message: inputValidationText(t('year'))
          },
          pattern: {
            value: /(19\d\d|20\d\d)\b/,
            message: `${t('day')} ${t('regexFormatValidatorText')}`
          },
          minLength: {
            value: 4,
            message: `${t('day')} ${t('regexFormatValidatorText')}`
          },
          maxLength: {
            value: 4,
            message: `${t('day')} ${t('regexFormatValidatorText')}`
          }
        }}
        placeholder={t('year')}
        required
        // eslint-disable-next-line react/no-unstable-nested-components
        IconElement={() => (
          <BsCalendarWeekFill
            size={16}
            color={errors.year?.message ? '#f31260' : ''}
            className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
          />
        )}
      />
    </div>
  );
}

export default AppHandledDate;
