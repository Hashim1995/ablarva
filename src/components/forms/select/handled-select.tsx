import { Select, SelectItem } from '@nextui-org/react';
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
}: IAppHandledSelect) {
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
          onChange={e => {
            onChange(e);
            onChangeApp && onChangeApp(e);
          }}
          selectedKeys={[value]}
          // onSelectionChange={onChange}
          // selectedKeys={value}
          className={className}
          errorMessage={isInvalid && 'Bu xana daxil edilməlidir'}
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
