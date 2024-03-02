// import { inputConfig } from '@/configs/global-configs';
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
  // variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
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

function AppHandledInput({
  name,
  control,
  placeholder,
  rules,
  // variant = 'bordered',
  required = false,
  inputProps,
  isInvalid = false,
  className = '',
  label,
  errors,
  type = 'text',
  onChangeApp // size // IconElement
}: IHandledInput) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          type={type}
          label={label}
          placeholder={placeholder}
          required={required}
          // labelPlacement="outside"
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
