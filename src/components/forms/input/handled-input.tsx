/* eslint-disable no-undef */
import { Input, InputProps } from '@nextui-org/react';
import { Controller, FieldValues, RegisterOptions } from 'react-hook-form';

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
          className={className}
          errorMessage={(isInvalid && errors[name].message) || ''}
          size="md"
          {...inputProps}
        />
      )}
    />
  );
}

export default AppHandledInput;
