/* eslint-disable no-unused-vars */
import { selectOption } from '@/models/common';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { ReactElement } from 'react';
import { Controller, FieldValues, RegisterOptions } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface IAppHandledAutocomplete {
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

function AppHandledAutocomplete({
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
}: IAppHandledAutocomplete): ReactElement {
  const { t } = useTranslation();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          required={required}
          label={label}
          size={size}
          isInvalid={isInvalid}
          classNames={{
            trigger: `border-1 border-divider ${
              selectProps?.isDisabled ? 'bg-[#d7d7d7] dark:bg-[#27272A]' : ''
            }`
          }}
          onSelectionChange={e => {
            onChange(e);
            onChangeApp && onChangeApp(e);
          }}
          selectedKey={value}
          // onSelectionChange={onChange}
          // selectedKeys={value}
          className={className}
          defaultItems={options}
          errorMessage={isInvalid && t('thisFieldMustEntered')}
          {...selectProps}
          variant={selectProps?.isDisabled ? 'flat' : 'bordered'}
        >
          {(item: selectOption) => (
            <AutocompleteItem
              className="text-default-900 dark:text-white"
              key={item.value}
            >
              {item.label}
            </AutocompleteItem>
          )}

          {/* {options?.map(z => (
            <AutocompleteItem
              className="text-default-900 dark:text-white"
              key={z.value}
              value={z.value}
            >
              {z.label}
            </AutocompleteItem>
          ))} */}
        </Autocomplete>
      )}
    />
  );
}

export default AppHandledAutocomplete;
