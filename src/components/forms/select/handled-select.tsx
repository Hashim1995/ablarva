import { Select, SelectItem, SelectProps } from '@nextui-org/react';
import React from 'react';
import { Controller, FieldValues, RegisterOptions } from 'react-hook-form';
import { BsGenderAmbiguous } from 'react-icons/bs';

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
  IsDynamic?: boolean;
  className?: string;
  errors?: any;
  selectProps?: SelectProps;
  options: { value: string | number; label: string }[];
}

function AppHandledSelect({
  name,
  control,
  placeholder = 'Seçin',
  rules,
  onChangeApp,
  variant = 'bordered',
  required = false,
  className,
  selectProps,
  options
}: IAppHandledSelect) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <Select
          classNames={{
            mainWrapper: 'h-8',
            trigger: [
              'relative',
              'w-full',
              'inline',
              'h-full',
              'inline-flex',
              'tap-highlight-transparent',
              'shadow-sm',
              'min-h-unit-8',
              'flex-col',
              'items-start',
              'justify-center',
              'gap-0',
              'border',
              ' px-3',
              'py-1',
              'rounded-md',
              ' h-8',
              'data-[hover=true]:border-gray-400',
              'group-data-[focus=true]:border-gray-400',
              'transition-background',
              '!duration-150 ',
              'transition-colors',
              'motion-reduce:transition-none ',
              'hover:border-red-400',
              'focus:border-red-400'
            ]
          }}
          variant={variant}
          required={required}
          onChange={e => {
            onChange(e);
            onChangeApp && onChangeApp(e);
          }}
          value={value}
          className={className}
          placeholder={placeholder}
          startContent={
            <BsGenderAmbiguous
              className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
              size={16}
            />
          }
          {...selectProps}
        >
          {options?.map(z => (
            <SelectItem key={z.value} value={z.value}>
              {z.label}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
}

export default AppHandledSelect;
