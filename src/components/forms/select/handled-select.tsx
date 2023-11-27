import { Select, SelectItem, Tooltip } from '@nextui-org/react';
import { Controller, FieldValues, RegisterOptions } from 'react-hook-form';

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
  selectProps?: any;
  options: { value: string | number; label: string }[];
  size?: 'sm' | 'md' | 'lg';
  IconElement?: any;
}

function AppHandledSelect({
  name,
  control,
  placeholder = 'Seçin',
  rules,
  errors,
  isInvalid,
  onChangeApp,
  variant = 'bordered',
  required = false,
  className,
  IconElement,
  selectProps,
  options,
  size
}: IAppHandledSelect) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <Select
          classNames={{
            label: 'text-md font-normal',
            trigger: [
              'relative',
              'w-full',
              'inline',
              'h-full',
              'inline-flex',
              'tap-highlight-transparent',
              'shadow-sm',
              'flex-col',
              'items-start',
              'justify-center',
              'gap-0',
              'border',
              ' px-3',
              'py-1',
              'rounded-md',
              'data-[hover=true]:border-gray-400',
              'group-data-[focus=true]:border-gray-400',
              'data-[active=true]:border-gray-400',
              'border-[#292D32]',

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
          size={size}
          isInvalid={isInvalid}
          onChange={e => {
            onChange(e);
            onChangeApp && onChangeApp(e);
          }}
          value={value}
          onSelectionChange={onChange}
          selectedKeys={value}
          className={className}
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
              <div>{IconElement()}</div>
            )
          }
          placeholder={placeholder}
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
