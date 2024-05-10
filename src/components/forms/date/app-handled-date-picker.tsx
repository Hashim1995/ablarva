import { DatePicker } from '@nextui-org/date-picker';
import { ReactElement } from 'react';
import { Controller, FieldValues, RegisterOptions } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import './app-handled-date-picker.scss';

/**
 * A date picker component with advanced form handling, validation, and translation support.
 * It integrates the NextUI DatePicker with React Hook Form, allowing fine-grained control over
 * date selection, validation, and error messages. This component ensures a consistent user experience
 * across different forms and use cases.
 *
 * @summary A highly customizable and translated date picker component with validation and dynamic event handling.
 * @author Hashim Hashimli
 * @module AppHandledDatePicker
 * @exports AppHandledDatePicker
 * @example
 * // Example usage:
 * <AppHandledDatePicker
 *   name="birthDate"
 *   control={formControl}
 *   rules={{ required: true }}
 *   isInvalid={formErrors.birthDate}
 *   label="Birth Date"
 *   size="md"
 *   onChangeApp={(value) => console.log('Selected Date:', value)}
 * />
 *
 * @param {Object} props - The properties object.
 * @param {string} props.name - The name of the input field in the form, which is used by `react-hook-form` for state management and validation.
 * @param {Object} props.control - The control object from `react-hook-form`, responsible for managing form state and facilitating validation.
 * @param {Object} [props.rules] - Validation rules from `react-hook-form` to apply to the date picker, ensuring correct and consistent data input.
 * @param {boolean} [props.isInvalid=false] - Indicates whether the input field is in an invalid state and should visually display an error message.
 * @param {Function} [props.onChangeApp] - An additional callback function triggered when the selected date changes, useful for external data handling.
 * @param {boolean} [props.required=false] - If `true`, marks the field as required for form validation, helping enforce mandatory data input.
 * @param {string} [props.className] - Additional custom styles that can be applied to the date picker, helping align it with broader design systems.
 * @param {Object} [props.selectProps] - Extra properties passed directly to the date picker component for fine-tuned customization.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Specifies the size of the date picker input field, affecting its overall appearance and layout.
 * @param {string} [props.label] - Text label displayed alongside the date picker input field, providing contextual information about the expected input.
 * @param {boolean} [props.showMonthAndYearPickers=false] - If `true`, enables the month and year selection in the date picker for broader date selection.
 * @returns {ReactElement} The handled date picker component, fully integrated with `react-hook-form` and NextUI's DatePicker.
 */

interface IAppHandledDatePicker {
  name: string;
  control: any;
  rules?: Omit<
    RegisterOptions<FieldValues>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  required?: boolean;
  isInvalid?: boolean;
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
  placeholder?: string;
  onChangeApp?: any;
  label?: string;
  IsDynamic?: boolean;
  className?: string;
  errors?: any;
  selectProps?: any;
  size?: 'sm' | 'md' | 'lg';
  IconElement?: any;
  showMonthAndYearPickers?: boolean;
}

function AppHandledDatePicker({
  name,
  control,
  rules,
  isInvalid,
  onChangeApp,
  required = false,
  className,
  selectProps,
  size,
  label,
  showMonthAndYearPickers = false
}: IAppHandledDatePicker): ReactElement {
  const { t } = useTranslation();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <DatePicker
          required={required}
          label={label}
          size={size}
          value={value}
          isInvalid={isInvalid}
          onChange={e => {
            onChange(e);
            onChangeApp && onChangeApp(e);
          }}
          className={`app-handled-date-picker ${className}`}
          showMonthAndYearPickers={showMonthAndYearPickers}
          errorMessage={isInvalid && t('thisFieldMustEntered')}
          {...selectProps}
          variant={selectProps?.isDisabled ? 'flat' : 'bordered'}
        />
      )}
    />
  );
}

export default AppHandledDatePicker;
