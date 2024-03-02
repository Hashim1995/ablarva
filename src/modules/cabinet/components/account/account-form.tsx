/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import { Controller, useForm } from 'react-hook-form';
import { inputValidationText } from '@/utils/constants/validations';
import { dictionary } from '@/utils/constants/dictionary';
import {
  inputPlaceholderText,
  selectPlaceholderText
} from '@/utils/constants/texts';
// import { BsFillPersonFill } from 'react-icons/bs';
import AppHandledInput from '@/components/forms/input/handled-input';
import AppHandledSelect from '@/components/forms/select/handled-select';
import {
  daysList,
  genderOptions,
  monthsList,
  yearsList
} from '@/utils/constants/options';
import { toastOptions } from '@/configs/global-configs';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { AuthService } from '@/services/auth-services/auth-services';
import { IGlobalResponseEmpty, setState } from '@/models/common';
import { fetchUserData } from '@/redux/auth/auth-slice';
import { convertDDMMYYYtoISOString } from '@/utils/functions/functions';
import { Select, SelectItem } from '@nextui-org/react';
import { IAccountForm } from '../../types';

interface IAccountFormProps {
  fieldsIsDisable: boolean;
  setIsLoading: setState;
}

function AccountForm({ setIsLoading, fieldsIsDisable }: IAccountFormProps) {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    control
  } = useForm<IAccountForm>({
    mode: 'onSubmit',
    defaultValues: {}
  });

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: IAccountForm) => {
    const payload: Omit<IAccountForm, 'email'> = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      gender: data?.gender,
      dateOfBirth: convertDDMMYYYtoISOString(
        `${data.day}.${data.month}.${data.year}`
      )
    };
    delete payload.day;
    delete payload.month;
    delete payload.year;
    console.log(payload, 'aaa');

    setIsLoading(true);
    try {
      const res: IGlobalResponseEmpty =
        await AuthService.getInstance().changeUserDetail(payload);

      if (res.isSuccess) {
        dispatch(fetchUserData());
        toast.success('Hesab məlumatlarınız uğurla yeniləndi', toastOptions);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    setValue('email', user.email);
    setValue('firstName', user.firstName);
    setValue('lastName', user.lastName);
    setValue('dateOfBirth', user.dateOfBirth);
    const date = String(user.dateOfBirth).split('.');
    setValue('day', date[0]);
    setValue('month', date[1]);
    setValue('year', date[2]);
    setValue('gender', String(user.gender));
  }, [user]);
  return (
    <div className="flex-1 remove-scrollbar flex items-center rounded-lg px-5 py-5 xl:p-5">
      <form
        id="account-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row w-full justify-between gap-3 sm:gap-4"
      >
        <div className="flex-col w-full sm:w-1/2 xl:w-2/5 flex gap-3 sm:gap-4">
          <AppHandledInput
            name="email"
            inputProps={{
              id: 'email',
              isDisabled: fieldsIsDisable
            }}
            type="email"
            className="text-white"
            control={control}
            isInvalid={Boolean(errors.email?.message)}
            errors={errors}
            size="sm"
            // className="text-black bg-transparent text-base sm:text-xl"
            rules={{
              required: {
                value: true,
                message: inputValidationText(dictionary.az.email)
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: `${dictionary.az.email} ${dictionary.az.regexFormatValidatorText}`
              }
            }}
            label={inputPlaceholderText(dictionary.az.email)}
            required
          />
          <div className="flex space-x-4">
            <div className="flex-1">
              <AppHandledSelect
                name="day"
                selectProps={{
                  id: 'day',
                  isDisabled: fieldsIsDisable
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
                  id: 'month',
                  isDisabled: fieldsIsDisable
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
                  id: 'year',
                  isDisabled: fieldsIsDisable
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
            selectProps={{
              id: 'gender',

              isDisabled: fieldsIsDisable
            }}
            isInvalid={Boolean(errors.gender?.message)}
            control={control}
            label={selectPlaceholderText(dictionary.az.gender)}
            // className=" app-select text-base sm:text-xl"
            size="sm"
            required
            rules={{
              required: {
                value: true,
                message: inputValidationText(dictionary.az.gender)
              }
            }}
            options={genderOptions}
            errors={errors}
          />
        </div>

        <div className="flex-col w-full sm:w-1/2 xl:w-2/5 flex gap-3 sm:gap-4">
          <AppHandledInput
            name="firstName"
            inputProps={{
              id: 'firstName',

              isDisabled: fieldsIsDisable
            }}
            type="text"
            control={control}
            isInvalid={Boolean(errors.firstName?.message)}
            errors={errors}
            size="sm"
            rules={{
              required: {
                value: true,
                message: inputValidationText(dictionary.az.firstName)
              }
            }}
            label={inputPlaceholderText(dictionary.az.firstName)}
            required
          />
          <AppHandledInput
            name="lastName"
            inputProps={{
              id: 'lastName',

              isDisabled: fieldsIsDisable
            }}
            type="text"
            control={control}
            isInvalid={Boolean(errors.lastName?.message)}
            errors={errors}
            size="sm"
            rules={{
              required: {
                value: true,
                message: inputValidationText(dictionary.az.lastName)
              }
            }}
            label={inputPlaceholderText(dictionary.az.lastName)}
            required
          />
        </div>
      </form>
    </div>
  );
}

export default AccountForm;
