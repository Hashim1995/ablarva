/* eslint-disable jsx-a11y/label-has-associated-control */
import { dictionary } from '@/utils/constants/dictionary';
import { inputPlaceholderText } from '@/utils/constants/texts';
import { Tooltip } from '@nextui-org/react';
import { useState } from 'react';
import { Controller, FieldValues, RegisterOptions } from 'react-hook-form';
import { BsCalendarWeekFill } from 'react-icons/bs';
import ReactInputMask from 'react-input-mask';

interface IHandledDate {
  name: string;
  control: any;
  placeholder?: string;
  label?: string;
  rules?: Omit<
    RegisterOptions<FieldValues>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  required?: boolean;
  errors?: any;
  // inputProps?: InputProps;
  onChangeApp?: any;
  fieldsIsDisable?: boolean;
  className?: string;
}

function AppHandledDate({
  name,
  control,
  placeholder = 'Daxil edin',
  rules,
  required = false,
  // inputProps,
  errors,
  fieldsIsDisable,
  label,
  className = '',
  onChangeApp
}: IHandledDate) {
  const [datePlaceholder, setDatePlaceholder] = useState<string>('');
  return (
    <div
      className={className}
      style={{ opacity: fieldsIsDisable ? 0.5 : 1, marginTop: -7 }}
    >
      {label && <label> {label}</label>}
      <div
        style={{
          border: '1px solid black',
          borderRadius: '0.375rem',
          borderColor: errors.dateOfBirth?.message ? '#f31260' : 'black'
        }}
        className="flex items-center ps-3 mt-1 h-full"
      >
        {errors.dateOfBirth?.message ? (
          <Tooltip
            className={'!bg-black !text-white'}
            placement="top-start"
            offset={12}
            content={errors.dateOfBirth ? errors.dateOfBirth.message : ''}
          >
            <div>
              {' '}
              <BsCalendarWeekFill
                size={16}
                color={errors.dateOfBirth?.message ? '#f31260' : ''}
                className="text-2xl text-default-400 pointer-events-none flex-shrink-0 mr-1.5"
              />
            </div>
          </Tooltip>
        ) : (
          <BsCalendarWeekFill
            size={16}
            color={errors.dateOfBirth?.message ? '#f31260' : ''}
            className="text-2xl text-default-400 pointer-events-none flex-shrink-0 mr-1.5"
          />
        )}

        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <ReactInputMask
              placeholder={
                datePlaceholder ||
                inputPlaceholderText(dictionary.az.dateOfBirth) ||
                placeholder
              }
              onFocus={() => setDatePlaceholder('YYYY-MM-DD')}
              required={required}
              onBlur={() => {
                setDatePlaceholder('');
                onBlur();
              }}
              style={{ fontSize: '0.875rem' }}
              onChange={e => {
                onChangeApp && onChangeApp();
                onChange(e);
              }}
              value={value}
              mask="9999-99-99"
              disabled={fieldsIsDisable}
              maskChar=""
              className="text-black bg-transparent text-base sm:text-xl w-full h-full outline-none"
            />
          )}
        />
      </div>
    </div>
  );
}

export default AppHandledDate;
