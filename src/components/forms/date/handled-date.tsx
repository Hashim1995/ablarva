import { dictionary } from '@/utils/constants/dictionary';
import { inputValidationText } from '@/utils/constants/validations';
import { BsCalendarWeekFill } from 'react-icons/bs';
import AppHandledInput from '../input/handled-input';

interface IHandledDate {
  control: any;
  errors?: any;
  fieldsIsDisable?: boolean;
  label?: string;
  className?: string;
}

function AppHandledDate({
  control,
  errors,
  fieldsIsDisable,
  label,
  className
}: IHandledDate) {
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
            message: inputValidationText(dictionary.az.day)
          },
          pattern: {
            value: /(0[1-9]|[12]\d|3[01])/,
            message: `${dictionary.az.day} ${dictionary.az.regexFormatValidatorText}`
          },
          minLength: {
            value: 2,
            message: `${dictionary.az.day} ${dictionary.az.regexFormatValidatorText}`
          },
          maxLength: {
            value: 2,
            message: `${dictionary.az.day} ${dictionary.az.regexFormatValidatorText}`
          }
        }}
        placeholder={dictionary.az.day}
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
            message: inputValidationText(dictionary.az.month)
          },
          pattern: {
            value: /\b(0[1-9]|1[0-2])/,
            message: `${dictionary.az.day} ${dictionary.az.regexFormatValidatorText}`
          },
          minLength: {
            value: 2,
            message: `${dictionary.az.day} ${dictionary.az.regexFormatValidatorText}`
          },
          maxLength: {
            value: 2,
            message: `${dictionary.az.day} ${dictionary.az.regexFormatValidatorText}`
          }
        }}
        placeholder={dictionary.az.month}
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
            message: inputValidationText(dictionary.az.year)
          },
          pattern: {
            value: /(19\d\d|20\d\d)\b/,
            message: `${dictionary.az.day} ${dictionary.az.regexFormatValidatorText}`
          },
          minLength: {
            value: 4,
            message: `${dictionary.az.day} ${dictionary.az.regexFormatValidatorText}`
          },
          maxLength: {
            value: 4,
            message: `${dictionary.az.day} ${dictionary.az.regexFormatValidatorText}`
          }
        }}
        placeholder={dictionary.az.year}
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
