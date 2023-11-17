import { inputConfig } from '@/configs/global-configs';
import { Input, InputProps, Tooltip } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { Controller, FieldValues, RegisterOptions } from 'react-hook-form';
import DatePicker from 'tailwind-datepicker-react';
import { IOptions } from 'tailwind-datepicker-react/types/Options';
import { useOnClickOutside } from 'usehooks-ts';

const options: IOptions = {
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: 'Təmizlə',
  maxDate: new Date('2023-01-01'),
  theme: {
    background: 'bg-black dark:bg-black',
    todayBtn: 'bg-black',
    clearBtn: '!bg-black',
    icons: '!bg-black',
    text: '',
    disabledText:
      'hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center  dark:text-white font-semibold text-sm  text-gray-900  ',
    input: '!bg-black',
    inputIcon: '!bg-black',
    selected: 'bg-black'
  },
  datepickerClassNames: 'top-6 z-50',
  defaultDate: new Date('2022-01-01'),
  language: 'en',
  // disabledDates: [],
  weekDays: ['Be', 'Ça', 'Ç', 'Ca', 'C', 'Ş', 'B'],
  inputNameProp: 'date',
  inputIdProp: 'date',
  inputPlaceholderProp: 'Select Date',
  inputDateFormatProp: {
    formatMatcher: 'basic',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  }
};

interface IHandledDate {
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
  startContentIconType?: null;
  errors?: any;
  inputProps?: InputProps;
  onChangeApp?: any;
  className?: string;
  IconElement?: any;
  size?: 'sm' | 'md' | 'lg';
}

function AppHandledDate({
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
  onChangeApp,
  size,
  IconElement
}: IHandledDate) {
  const [show, setShow] = useState<boolean>(false);

  const dateRef = useRef(null);

  const handleOutSideClick = () => {
    setShow(false);
  };

  useOnClickOutside(dateRef, handleOutSideClick);

  return (
    <div className="relative" ref={dateRef}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            options={options}
            show={show}
            onChange={e => {
              onChange(dayjs(e).format('DD.MM.YYYY'));
              onChangeApp && onChangeApp(e);
            }}
            setShow={() => setShow(z => !z)}
          >
            <div className="... relative">
              <Input
                type="text"
                placeholder={placeholder}
                variant={variant}
                isInvalid={isInvalid}
                readOnly
                onFocus={() => setShow(true)}
                required={required}
                value={String(value || '')}
                size={size}
                className={className}
                classNames={inputConfig}
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
                {...inputProps}
              />
            </div>
          </DatePicker>
        )}
      />
    </div>
  );
}

export default AppHandledDate;
