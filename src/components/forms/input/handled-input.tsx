import { inputConfig } from '@/configs/global-configs';
import { Input, InputProps, Tooltip } from '@nextui-org/react';
import { Controller, FieldValues, RegisterOptions } from 'react-hook-form';

interface IHandledInput {
  name: string;
  control: any;
  isInvalid?: boolean;
  placeholder?: string;
  rules?: Omit<
    RegisterOptions<FieldValues>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
  required?: boolean;
  onAppChange?: any;
  startContentIconType?: null;
  errors?: any;
  type?: string;
  inputProps?: InputProps;
  className?: string;
  IconElement?: any;
  size?: 'sm' | 'md' | 'lg';
}

function AppHandledInput({
  name,
  control,
  placeholder = 'Daxil edin',
  rules,
  variant = 'bordered',
  required = false,
  inputProps,
  errors,
  isInvalid = false,
  className = '',
  type = 'text',
  size,
  IconElement
}: IHandledInput) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          type={type}
          placeholder={placeholder}
          variant={variant}
          required={required}
          onBlur={onBlur}
          onChange={onChange}
          isInvalid={isInvalid}
          value={value}
          className={className}
          classNames={inputConfig}
          size={size}
          startContent={
            errors[name]?.message ? (
              <Tooltip
                className={'!bg-black !text-white'}
                placement="top-start"
                offset={12}
                content={errors[name] ? errors[name].message : ''}
              >
                <div>{IconElement()}</div>
              </Tooltip>
            ) : (
              <div>{IconElement}</div>
            )
          }
          {...inputProps}
        />
      )}
    />
  );
}

export default AppHandledInput;
