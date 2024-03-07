/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unstable-nested-components */
import { IUserRegister } from '@/models/user';
import {
  AuthService,
  IRegisterResponse
} from '@/services/auth-services/auth-services';
import { inputValidationText } from '@/utils/constants/validations';
import { Button } from '@nextui-org/react';
import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useLocalStorage } from 'usehooks-ts';
import AppHandledInput from '@/components/forms/input/handled-input';
// import { dictionary } from '@/utils/constants/dictionary';
import {
  inputPlaceholderText,
  selectPlaceholderText
} from '@/utils/constants/texts';
import AppHandledSelect from '@/components/forms/select/handled-select';
import { convertDDMMYYYtoISOString } from '@/utils/functions/functions';
import {
  daysList,
  genderOptions,
  monthsList,
  yearsList
} from '@/utils/constants/options';
import { toast } from 'react-toastify';
import { toastOptions } from '@/configs/global-configs';
import { useTranslation } from 'react-i18next';
import LoginLeftBar from './login-leftbar';

interface IRegisterFormProps {
  handleFlip: () => void;
}
function RegisterForm({ handleFlip }: IRegisterFormProps) {
  const { t } = useTranslation();
  const {
    handleSubmit,
    watch,
    clearErrors,
    setError,
    setValue,
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

  const onSubmit = async (data: IUserRegister) => {
    const payload: IUserRegister = {
      ...data,

      dateOfBirth: convertDDMMYYYtoISOString(
        `${data.day}.${data.month}.${data.year}`
      ),
      gender: Number(data.gender)
    };
    delete payload.day;
    delete payload.month;
    delete payload.year;

    try {
      const res: IRegisterResponse = await AuthService.getInstance().register(
        payload
      );
      if (res.isSuccess) {
        toast.success(
          'Uğurla qeydiyyatdan keçdiniz. Zəhmət olmasa yenidən daxil olun',
          toastOptions
        );
        handleFlip();
        setValue('confirmPassword', '');
        setValue('email', '');
        setValue('firstName', '');
        setValue('lastName', '');
        setValue('password', '');
        setValue('dateOfBirth', '');
        setValue('gender', '');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="p-10 py-6 text-white bg-black-500 w-96 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
        <LoginLeftBar />
      </div>

      <div className="animate-border  p-[3px] rounded-xl w-   bg-white bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%]">
        <div className="p-10 gradient-bg h-full  flex-1 flex items-start flex-col	justify-center rounded-xl ">
          <h4 className="mb-4 mb-5 tracking-widest text-sm text-default-400">
            {t('createNewAccount')}
          </h4>
          <h3 className="leading-none tracking-widest  mb-5 text-[34px] font-semibold text-white">
            {t('joinUs')}
          </h3>
          <div className="flex flex-col mb-5 md:mt-0 space-y-5">
            <span className="flex items-center justify-center ">
              <span
                aria-hidden
                onClick={handleFlip}
                className="font-normal tracking-widest   text-sm me-1"
              >
                {t('doYouHaveAccount')}
              </span>
              <span
                className=" text-blue-500 text-sm    cursor-pointer"
                aria-hidden
                onClick={handleFlip}
              >
                {t('register')}
              </span>
            </span>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-5"
          >
            <div className="flex flex-col gap-3 md:gap-5">
              <AppHandledInput
                name="email"
                inputProps={{
                  id: 'email'
                }}
                type="email"
                control={control}
                isInvalid={Boolean(errors.email?.message)}
                errors={errors}
                size="sm"
                className=" w-72"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('email'))
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: `${t('email')} ${t('regexFormatValidatorText')}`
                  }
                }}
                label={inputPlaceholderText(t('email'))}
                required
              />
              <AppHandledInput
                name="firstName"
                inputProps={{
                  id: 'firstName'
                }}
                type="text"
                className="w-72"
                control={control}
                isInvalid={Boolean(errors.firstName?.message)}
                errors={errors}
                size="sm"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('firstName'))
                  }
                }}
                label={inputPlaceholderText(t('firstName'))}
                required
              />
              <AppHandledInput
                name="lastName"
                inputProps={{
                  id: 'lastName'
                }}
                type="text"
                control={control}
                className="w-72"
                isInvalid={Boolean(errors.lastName?.message)}
                errors={errors}
                size="sm"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('lastName'))
                  }
                }}
                label={inputPlaceholderText(t('lastName'))}
                required
              />

              <div className="flex space-x-2">
                <div className="flex-1">
                  <AppHandledSelect
                    name="day"
                    selectProps={{
                      id: 'day'
                    }}
                    isInvalid={Boolean(errors.day?.message)}
                    control={control}
                    label={'Gün'}
                    size="sm"
                    required
                    rules={{
                      required: {
                        value: true,
                        message: inputValidationText('Gün')
                      }
                    }}
                    options={daysList}
                    errors={errors}
                  />
                </div>

                <div className="flex-1">
                  <AppHandledSelect
                    name="month"
                    selectProps={{
                      id: 'month'
                    }}
                    isInvalid={Boolean(errors.month?.message)}
                    control={control}
                    label={'Ay'}
                    size="sm"
                    required
                    rules={{
                      required: {
                        value: true,
                        message: inputValidationText('Ay')
                      }
                    }}
                    options={monthsList}
                    errors={errors}
                  />
                </div>

                <div className="flex-1">
                  <AppHandledSelect
                    name="year"
                    selectProps={{
                      id: 'year'
                    }}
                    isInvalid={Boolean(errors.year?.message)}
                    control={control}
                    label={'İl'}
                    size="sm"
                    required
                    rules={{
                      required: {
                        value: true,
                        message: inputValidationText('İl')
                      }
                    }}
                    options={yearsList}
                    errors={errors}
                  />
                </div>
              </div>

              <AppHandledSelect
                name="gender"
                isInvalid={Boolean(errors.gender?.message)}
                control={control}
                selectProps={{
                  id: 'gender'
                }}
                label={selectPlaceholderText(t('gender'))}
                size="sm"
                required
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('gender'))
                  }
                }}
                options={genderOptions}
                errors={errors}
              />

              <AppHandledInput
                name="password"
                control={control}
                className="w-72"
                isInvalid={Boolean(errors.password?.message)}
                errors={errors}
                onChangeApp={() => {
                  if (watch('password') !== watch('confirmPassword')) {
                    setError('password', {
                      message: t('confirmPasswordMessage')
                    });
                    setError('confirmPassword', {
                      message: t('confirmPasswordMessage')
                    });
                  } else {
                    clearErrors('password');
                    clearErrors('confirmPassword');
                  }
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('password'))
                  },
                  minLength: {
                    value: 8,
                    message: t('minLength')
                  },
                  validate: {
                    RequireDigit: value =>
                      /[0-9]/.test(value) || t('minNumber'),
                    RequireLowercase: value =>
                      /[a-z]/.test(value) || t('minSmallLetter'),
                    RequireUppercase: value =>
                      /[A-Z]/.test(value) || t('minBigLetter'),
                    RequireSpecialCharacter: value =>
                      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value) ||
                      t('minCharacter')
                  }
                }}
                label={inputPlaceholderText(t('password'))}
                required
                size="sm"
                inputProps={{
                  id: 'password',
                  endContent: (
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
                  )
                }}
                type={showPassword ? 'text' : 'password'}
              />

              <AppHandledInput
                name="confirmPassword"
                control={control}
                size="sm"
                className="w-72"
                isInvalid={Boolean(errors.confirmPassword?.message)}
                errors={errors}
                onChangeApp={() => {
                  if (watch('password') !== watch('confirmPassword')) {
                    setError('password', {
                      message: t('confirmPasswordMessage')
                    });
                    setError('confirmPassword', {
                      message: t('confirmPasswordMessage')
                    });
                  } else {
                    clearErrors('password');
                    clearErrors('confirmPassword');
                  }
                }}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('confirmPassword'))
                  },
                  minLength: {
                    value: 8,
                    message: t('minLength')
                  },
                  validate: {
                    RequireDigit: value =>
                      /[0-9]/.test(value) || t('minNumber'),
                    RequireLowercase: value =>
                      /[a-z]/.test(value) || t('minSmallLetter'),
                    RequireUppercase: value =>
                      /[A-Z]/.test(value) || t('minBigLetter'),
                    RequireSpecialCharacter: value =>
                      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value) ||
                      t('minCharacter')
                  }
                }}
                label={inputPlaceholderText(t('confirmPassword'))}
                required
                inputProps={{
                  id: 'confirmPassword',
                  endContent: (
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
                  )
                }}
                type={showPasswordConfirm ? 'text' : 'password'}
              />
            </div>

            <Button
              size="sm"
              isLoading={isSubmitting}
              variant="bordered"
              className="w-full"
              type="submit"
            >
              {t('register')}
            </Button>
          </form>
        </div>
      </div>
      <div className="invisible w-96" />
    </>
  );
}

export default RegisterForm;
