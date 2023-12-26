import { dictionary } from '@/utils/constants/dictionary';
import { inputValidationText } from '@/utils/constants/validations';
import AppHandledInput from '../input/handled-input';

interface IHandledDate {
  control: any;
  errors?: any;
  fieldsIsDisable?: boolean;
  IconElement: any;
  label?: string;
}

function AppHandledDate({
  control,
  errors,
  fieldsIsDisable,
  IconElement,
  label
}: IHandledDate) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <AppHandledInput
        name="day"
        inputProps={{
          id: 'day',
          labelPlacement: 'outside',
          label,
          isDisabled: fieldsIsDisable
        }}
        type="text"
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
        IconElement={IconElement}
      />
      <AppHandledInput
        name="month"
        inputProps={{
          id: 'month',
          labelPlacement: 'outside',
          label: label ? ' ' : '',
          isDisabled: fieldsIsDisable
        }}
        type="text"
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
        IconElement={IconElement}
      />
      <AppHandledInput
        name="year"
        inputProps={{
          id: 'year',
          labelPlacement: 'outside',
          label: label ? ' ' : '',
          isDisabled: fieldsIsDisable
        }}
        type="text"
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
        IconElement={IconElement}
      />
    </div>
  );
}

export default AppHandledDate;
