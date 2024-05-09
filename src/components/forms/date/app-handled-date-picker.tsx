import { DatePicker } from '@nextui-org/date-picker';
import { ReactElement } from 'react';
import { Controller, FieldValues, RegisterOptions } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import './app-handled-date-picker.scss';

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

/**
 * A custom handled date component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the select input.
 * @param {Object} props.control - The control object from react-hook-form.
 * @param {Object} props.rules - The validation rules for the select input.
 * @param {boolean} props.isInvalid - Indicates if the select input is invalid.
 * @param {Function} props.onChangeApp - The callback function to handle select input change.
 * @param {boolean} [props.required=false] - Indicates if the select input is required.
 * @param {string} [props.className] - The CSS class name for the select input.
 * @param {Object} [props.selectProps] - Additional props to be passed to the Select component.
 * @param {string} props.size - The size of the select input.
 * @param {string} props.label - The label for the select input.
 * @returns {JSX.Element} The rendered handled select component.
 */
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
          // classNames={{
          //   base: `!border-1 border-divider rounded-2xl ${
          //     selectProps?.isDisabled ? 'bg-[#d7d7d7] dark:bg-[#27272A]' : ''
          //   }`
          // }}
          onChange={e => {
            onChange(e);
            onChangeApp && onChangeApp(e);
          }}
          // onSelectionChange={onChange}
          // selectedKeys={value}
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
