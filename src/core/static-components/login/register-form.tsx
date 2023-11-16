/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unstable-nested-components */
import { IUserRegister } from '@/models/user';
import {
  AuthService,
  ILoginResponse
} from '@/services/auth-services/auth-services';
import { inputValidationText } from '@/utils/constants/validations';
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Tooltip
} from '@nextui-org/react';
import { useState } from 'react';
import dayjs from 'dayjs';

import { Controller, useForm } from 'react-hook-form';
import {
  BsEye,
  BsRobot,
  BsCalendarWeekFill,
  BsEnvelopeFill,
  BsFillKeyFill,
  BsFillPersonFill,
  BsEyeSlash
} from 'react-icons/bs';
import { useLocalStorage } from 'usehooks-ts';
import Datepicker from 'tailwind-datepicker-react';
import { IOptions } from 'tailwind-datepicker-react/types/Options';
import { inputConfig } from '@/configs/global-configs';

interface IRegisterFormProps {
  handleFlip: () => void;
}
function RegisterForm({ handleFlip }: IRegisterFormProps) {
  const {
    handleSubmit,
    watch,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
    control
  } = useForm<IUserRegister>({
    mode: 'onChange',
    defaultValues: {}
  });
  // eslint-disable-next-line no-unused-vars
  const [userToken, setUserToken] = useLocalStorage<any>('userToken', null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [show, setShow] = useState<boolean>(false);

  const onSubmit = async (data: IUserRegister) => {
    try {
      const res: ILoginResponse = await AuthService.getInstance().login(data);
      setUserToken(res.data.accessToken);
    } catch (err) {
      console.log(err);
    }
  };

  const options: IOptions = {
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: 'Təmizlə',
    // maxDate: new Date('2023-01-01'),
    theme: {
      background: 'border-1 border-black',
      todayBtn: '!bg-white !text-black',
      clearBtn: '!bg-white !text-black',
      icons: '',
      text: '!text-black',
      disabledText: 'bg-red',
      input: '',
      inputIcon: '',
      selected: '!bg-black !text-white'
    },
    datepickerClassNames: 'top-12',
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
  return (
    <>
      <div className="p-4 py-6 text-white bg-black-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
        <div className="my-3 text-4xl font-bold tracking-wider text-center">
          <BsRobot className="animate-pulse	" size={68} />
        </div>
        <p className="mt-6 text-sm font-normal text-center text-white md:mt-0">
          With necəsən, gəle, öp, qıdığla the power of K-WD, you can now focus
          only on functionaries for your digital products, while leaving the UI
          design on us!
        </p>

        <p className="mt-6 text-sm text-center text-white">
          Read our{' '}
          <a href="/#" className="underline">
            terms
          </a>{' '}
          and{' '}
          <a href="/#" className="underline">
            conditions
          </a>
        </p>
      </div>

      <div className="p-3 bg-white md:flex-1 flex items-center		flex-col	justify-around">
        <h3 className="leading-none text-2xl font-semibold text-gray-700">
          Bizə qoşul
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-5"
        >
          <div className="flex flex-col gap-5  ">
            <Controller
              control={control}
              name="email"
              rules={{
                required: {
                  value: true,
                  message: 'Email xanası məcburidir'
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Düzgün olmayan email adresi'
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  type="email"
                  placeholder="Email adresinizi daxil edin"
                  variant="bordered"
                  required
                  onBlur={onBlur}
                  value={value}
                  isInvalid={Boolean(errors.email?.message)}
                  size="sm"
                  onChange={onChange}
                  className="!text-black  w-72"
                  classNames={inputConfig}
                  startContent={
                    errors.email?.message ? (
                      <Tooltip
                        className="!bg-black !text-white"
                        placement="top-start"
                        offset={12}
                        content={errors.email?.message || ''}
                      >
                        <div>
                          <BsEnvelopeFill
                            size={16}
                            color={errors.email?.message ? 'red' : ''}
                            className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                          />
                        </div>
                      </Tooltip>
                    ) : (
                      <div>
                        <BsEnvelopeFill
                          size={16}
                          color={errors.email?.message ? 'red' : ''}
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      </div>
                    )
                  }
                />
              )}
            />

            <Controller
              control={control}
              name="firstName"
              rules={{
                required: {
                  value: true,
                  message: 'Ad xanası məcburidir'
                }
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  placeholder="Adınızı daxil edin"
                  variant="bordered"
                  required
                  value={value}
                  size="sm"
                  onChange={onChange}
                  className="text-black  w-72"
                  classNames={inputConfig}
                  errorMessage={errors.firstName?.message || ''}
                  startContent={
                    <BsFillPersonFill
                      size={16}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="lastName"
              rules={{
                required: {
                  value: true,
                  message: 'Soyad xanası məcburidir'
                }
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  placeholder="Soyadınızı daxil edin"
                  variant="bordered"
                  required
                  value={value}
                  size="sm"
                  onChange={onChange}
                  className="text-black  w-72"
                  classNames={inputConfig}
                  errorMessage={errors.lastName?.message || ''}
                  startContent={
                    <BsFillPersonFill
                      size={16}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="dateOfBirth"
              rules={{
                required: {
                  value: true,
                  message: 'Soyad xanası məcburidir'
                }
              }}
              render={({ field: { onChange, value } }) => (
                <Datepicker
                  options={options}
                  show={show}
                  onChange={e => {
                    onChange(dayjs(e).format('YYYY-MM-DD'));
                    console.log(e);
                  }}
                  setShow={() => setShow(z => !z)}
                >
                  <div className="...">
                    <Input
                      type="text"
                      placeholder="doğum tarixinizi daxil edin"
                      variant="bordered"
                      readOnly
                      onFocus={() => setShow(true)}
                      required
                      value={String(value || '')}
                      size="sm"
                      className="text-black  w-72"
                      classNames={inputConfig}
                      // errorMessage={errors.lastName?.message || ''}
                      startContent={
                        <BsCalendarWeekFill
                          size={16}
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      }
                    />
                  </div>
                </Datepicker>
              )}
            />

            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange, value } }) => (
                <div className="flex  gap-3">
                  <RadioGroup
                    orientation="horizontal"
                    value={value}
                    defaultValue="1"
                    size="sm"
                    className="gap-5 text-black"
                    onValueChange={onChange}
                  >
                    <Radio
                      classNames={{
                        label: 'text-black'
                      }}
                      size="sm"
                      value={'1'}
                    >
                      Kişi
                    </Radio>
                    <Radio
                      classNames={{
                        label: 'text-black'
                      }}
                      size="sm"
                      value={'2'}
                    >
                      Qadın
                    </Radio>
                  </RadioGroup>
                </div>
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{
                required: {
                  value: true,
                  message: inputValidationText('Yeni Şifrə')
                },
                minLength: {
                  value: 8,
                  message: 'Şifrə ən az 8 xarakter olmalıdı'
                },
                validate: {
                  RequireDigit: value =>
                    /[^0-9]/.test(value) || 'Şifrəda ən azı 1 rəqəm olmalıdır ',
                  RequireLowercase: value =>
                    /[a-z]/.test(value) ||
                    'Şifrədə ən az 1 kiçik hərf olmalıdır',
                  RequireUppercase: value =>
                    /[A-Z]/.test(value) ||
                    'Şifrədə ən az 1 böyük hərf olmalıdır  '
                }
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  // label="Password"
                  variant="bordered"
                  required
                  errorMessage={errors.password?.message || ''}
                  value={value}
                  size="sm"
                  onChange={e => {
                    onChange(e);
                    if (watch('password') !== watch('confirmPassword')) {
                      setError('password', {
                        message:
                          'Yeni şifrə və yeni şifrənin təkrarı eyni olmalıdı'
                      });
                      setError('confirmPassword', {
                        message:
                          'Yeni şifrə və yeni şifrənin təkrarı eyni olmalıdı'
                      });
                    } else {
                      clearErrors('password');
                      clearErrors('confirmPassword');
                    }
                  }}
                  className="text-black w-72"
                  classNames={inputConfig}
                  placeholder="Şifrənizi daxil edin"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => setShowPassword(z => !z)}
                    >
                      {showPassword ? (
                        <BsEye
                          size={16}
                          className="text-2xl text-default-400 pointer-events-none"
                        />
                      ) : (
                        <BsEyeSlash
                          size={16}
                          className="text-2xl text-default-400 pointer-events-none"
                        />
                      )}
                    </button>
                  }
                  type={showPassword ? 'text' : 'password'}
                  startContent={
                    <BsFillKeyFill
                      size={16}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: {
                  value: true,
                  message: inputValidationText('Yeni Şifrə')
                },
                minLength: {
                  value: 8,
                  message: 'Şifrə ən az 8 xarakter olmalıdı'
                },
                validate: {
                  RequireDigit: value =>
                    /[^0-9]/.test(value) || 'Şifrəda ən azı 1 rəqəm olmalıdır ',
                  RequireLowercase: value =>
                    /[a-z]/.test(value) ||
                    'Şifrədə ən az 1 kiçik hərf olmalıdır',
                  RequireUppercase: value =>
                    /[A-Z]/.test(value) ||
                    'Şifrədə ən az 1 böyük hərf olmalıdır  '
                }
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  // label="Password"
                  variant="bordered"
                  required
                  errorMessage={errors.password?.message || ''}
                  value={value}
                  size="sm"
                  onChange={e => {
                    onChange(e);
                    if (watch('password') !== watch('confirmPassword')) {
                      setError('password', {
                        message:
                          'Yeni şifrə və yeni şifrənin təkrarı eyni olmalıdı'
                      });
                      setError('confirmPassword', {
                        message:
                          'Yeni şifrə və yeni şifrənin təkrarı eyni olmalıdı'
                      });
                    } else {
                      clearErrors('password');
                      clearErrors('confirmPassword');
                    }
                  }}
                  className="text-black w-72"
                  classNames={inputConfig}
                  placeholder="Şifrənizi daxil edin"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => setShowPasswordConfirm(z => !z)}
                    >
                      {showPasswordConfirm ? (
                        <BsEye
                          size={16}
                          className="text-2xl text-default-400 pointer-events-none"
                        />
                      ) : (
                        <BsEyeSlash
                          size={16}
                          className="text-2xl text-default-400 pointer-events-none"
                        />
                      )}
                    </button>
                  }
                  type={showPassword ? 'text' : 'password'}
                  startContent={
                    <BsFillKeyFill
                      size={16}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                />
              )}
            />
          </div>
          <Button
            size="sm"
            isLoading={isSubmitting}
            className="w-full  text-white border"
            type="submit"
          >
            Qeydiyyat
          </Button>
        </form>
        <div className="flex flex-col space-y-5">
          <span className="flex items-center justify-center space-x-2">
            <span className="h-px bg-gray-400 w-10" />
            <span
              aria-hidden
              onClick={handleFlip}
              className="font-normal text-black  text-sm"
            >
              və ya{' '}
              <span
                className=" text-blue-500   cursor-pointer"
                aria-hidden
                onClick={handleFlip}
              >
                Daxil ol
              </span>
            </span>
            <span className="h-px bg-gray-400 w-10" />
          </span>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
