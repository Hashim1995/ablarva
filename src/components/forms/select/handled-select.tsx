import { Select, SelectItem } from '@nextui-org/react';
import { ReactElement } from 'react';
import { Controller, FieldValues, RegisterOptions } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/**
 * A select dropdown component with advanced form handling and validation.
 * It integrates the NextUI Select component with React Hook Form, providing
 * a smooth selection experience, validation, and error handling.
 *
 * @summary A customizable select dropdown component with form validation.
 * @module AppHandledSelect
 * @exports AppHandledSelect
 * @example
 * // Example usage:
 * <AppHandledSelect
 *   name="country"
 *   control={formControl}
 *   rules={{ required: true }}
 *   isInvalid={formErrors.country}
 *   label="Country"
 *   size="md"
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'ca', label: 'Canada' }
 *   ]}
 * />
 *
 * @param {Object} props - The properties object.
 * @param {string} props.name - The name of the select field in the form.
 * @param {Object} props.control - The control object from `react-hook-form`.
 * @param {Object} [props.rules] - Validation rules from `react-hook-form` to apply to the select field.
 * @param {boolean} [props.isInvalid=false] - Indicates whether the select field is in an invalid state.
 * @param {Function} [props.onChangeApp] - Callback function triggered when the selected value changes.
 * @param {boolean} [props.required=false] - If `true`, marks the field as required for form validation.
 * @param {string} [props.className] - Additional custom styles for the select field.
 * @param {Object} [props.selectProps] - Extra properties to pass directly to the NextUI Select component.
 * @param {{value: string | number, label: string}[]} props.options - The list of options to display in the dropdown.
 * @param {'flat' | 'bordered' | 'faded' | 'underlined'} [props.variant] - The visual style of the select field.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - The size of the select field.
 * @param {string} [props.label] - Text label displayed alongside the select input field.
 * @param {ReactElement} [props.IconElement] - An optional icon to be displayed inside the select field.
 * @returns {ReactElement} The handled select dropdown component.
 */

interface IAppHandledSelect {
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
  options: { value: string | number; label: string }[];
  size?: 'sm' | 'md' | 'lg';
  IconElement?: any;
}

function AppHandledSelect({
  name,
  control,
  rules,
  isInvalid,
  onChangeApp,
  required = false,
  className,
  selectProps,
  options,
  size,
  label
}: IAppHandledSelect): ReactElement {
  const { t } = useTranslation();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <Select
          required={required}
          label={label}
          size={size}
          isInvalid={isInvalid}
          classNames={{
            trigger: `border-1 border-divider ${
              selectProps?.isDisabled ? 'bg-[#d7d7d7] dark:bg-[#27272A]' : ''
            }`
          }}
          onChange={e => {
            onChange(e);
            onChangeApp && onChangeApp(e);
          }}
          selectedKeys={[value]}
          // onSelectionChange={onChange}
          // selectedKeys={value}
          className={className}
          errorMessage={isInvalid && t('thisFieldMustEntered')}
          {...selectProps}
          variant={selectProps?.isDisabled ? 'flat' : 'bordered'}
        >
          {options?.map(z => (
            <SelectItem
              className="text-default-900 dark:text-white"
              key={z.value}
              value={z.value}
            >
              {z.label}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
}

export default AppHandledSelect;
