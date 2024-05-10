/* eslint-disable no-undef */
import { Input, InputProps } from '@nextui-org/react';
import { Controller, FieldValues, RegisterOptions } from 'react-hook-form';

/**
 * A versatile input component tightly integrated with `react-hook-form`, offering flexible validation, labeling, and size options.
 * This component leverages `react-hook-form` for form state management and validation, and uses `@nextui-org/react` for UI rendering.
 *
 * @author Hashim Hashilmi
 * @module AppHandledInput
 * @exports AppHandledInput
 * @summary A versatile input component controlled by a form library, enabling flexible validation and customization. Ideal for forms requiring responsive and intuitive input fields.
 * @example
 * // Example usage:
 * <AppHandledInput
 *   name="username"
 *   control={formControl}
 *   label="Username"
 *   placeholder="Enter your username"
 *   required={true}
 *   onChangeApp={(value) => console.log('Input changed:', value)}
 *   rules={{ required: 'Username is required' }}
 * />
 *
 * @param {IHandledInput} props - The component's properties, detailing the configuration and behavior of the input field.
 * @param {string} props.name - The identifier for the input field within the form; used by `react-hook-form` for registering and handling the input data.
 * @param {Object} props.control - The `control` object provided by `react-hook-form`, which is used to manage the form's state and facilitate form validation.
 * @param {string} [props.placeholder] - Text displayed inside the input when it's empty, guiding the user on what to enter.
 * @param {Object} [props.rules] - Validation constraints for the input, as defined in `react-hook-form`. Dictates the criteria the input must meet to be considered valid.
 * @param {boolean} [props.required=false] - Marks the input field as mandatory, informing `react-hook-form` that this field must not be empty.
 * @param {InputProps} [props.inputProps] - Additional properties that are passed directly to the `Input` component from `@nextui-org/react`. Allows for customization of the underlying input component.
 * @param {boolean} [props.isInvalid=false] - Flag indicating whether the input is visually marked as invalid, usually in response to validation errors managed by `react-hook-form`.
 * @param {string} [props.className=''] - CSS class names for additional styling. Applied directly to the `Input` component to modify its appearance.
 * @param {string} [props.label] - Descriptive label displayed alongside the input field. Provides context or instructions associated with the input.
 * @param {Object} [props.errors] - Error messages from `react-hook-form` associated with this input, used to display validation feedback or error messages to the user.
 * @param {string} [props.type='text'] - Specifies the type of data the input field should accept, such as 'text', 'number', etc.
 * @param {Function} [props.onChangeApp] - An optional callback function that is executed when the input's value changes. This is in addition to the internal handling by `react-hook-form`.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - The size of the input field, which can affect the visual layout and styling as defined in `@nextui-org/react`.
 * @returns {JSX.Element} A responsive and customizable input component managed by `react-hook-form` and rendered using `@nextui-org/react`.
 */

interface IHandledInput {
  name: string;
  control: any;
  isInvalid?: boolean;
  placeholder?: string;
  label?: string;
  rules?: Omit<
    RegisterOptions<FieldValues>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  required?: boolean;
  startContentIconType?: null;
  errors?: any;
  type?: string;
  inputProps?: InputProps;
  onChangeApp?: any;
  className?: string;
  IconElement?: any;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * A custom input component that is controlled by a form library.
 *
 * @param {IHandledInput} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function AppHandledInput({
  name,
  control,
  placeholder,
  rules,
  required = false,
  inputProps,
  isInvalid = false,
  className = '',
  label,
  errors,
  type = 'text',
  onChangeApp
}: IHandledInput): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          type={type}
          classNames={{
            inputWrapper: `border-1 border-divider ${
              inputProps?.isDisabled ? 'bg-[#d7d7d7] dark:bg-[#27272A]' : ''
            }`
          }}
          label={label}
          variant={inputProps?.isDisabled ? 'flat' : 'bordered'}
          placeholder={placeholder}
          required={required}
          onBlur={onBlur}
          onChange={e => {
            onChange(e);
            onChangeApp && onChangeApp(e);
          }}
          onKeyDown={e => {
            (e.keyCode === 38 || e.keyCode === 40) &&
              type === 'number' &&
              e.preventDefault();
          }}
          onKeyUp={e => {
            (e.keyCode === 38 || e.keyCode === 40) &&
              type === 'number' &&
              e.preventDefault();
          }}
          isInvalid={isInvalid}
          value={value}
          className={`text-default-900 dark:text-white ${className}`}
          errorMessage={(isInvalid && errors[name].message) || ''}
          size="md"
          {...inputProps}
        />
      )}
    />
  );
}

export default AppHandledInput;
