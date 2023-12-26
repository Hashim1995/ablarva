/* eslint-disable react/no-unstable-nested-components */
import { useForm } from 'react-hook-form';
import { inputValidationText } from '@/utils/constants/validations';
import { dictionary } from '@/utils/constants/dictionary';
import {
  inputPlaceholderText,
  selectPlaceholderText
} from '@/utils/constants/texts';
import { BsEnvelopeFill, BsFillPersonFill } from 'react-icons/bs';
import AppHandledInput from '@/components/forms/input/handled-input';
import AppHandledSelect from '@/components/forms/select/handled-select';
import { genderOptions } from '@/utils/constants/options';
import { toastOptions } from '@/configs/global-configs';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { AuthService } from '@/services/auth-services/auth-services';
import { IGlobalResponseEmpty, setState } from '@/models/common';
import { fetchUserData } from '@/redux/auth/auth-slice';
import { convertDDMMYYYtoISOString } from '@/utils/functions/functions';
import AppHandledDate from '@/components/forms/date/handled-date';
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
    <div className="flex-1 componentsScrollBar flex items-center rounded-lg px-5 py-5 xl:p-5">
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
              labelPlacement: 'outside',
              label: dictionary.az.email,
              isDisabled: true
            }}
            type="email"
            control={control}
            isInvalid={Boolean(errors.email?.message)}
            errors={errors}
            size="sm"
            className="text-black bg-transparent text-base sm:text-xl"
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
            placeholder={inputPlaceholderText(dictionary.az.email)}
            required
            IconElement={() => (
              <BsEnvelopeFill
                size={16}
                color={errors.email?.message ? '#f31260' : ''}
                className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
              />
            )}
          />

          <AppHandledDate
            control={control}
            errors={errors}
            fieldsIsDisable={fieldsIsDisable}
            label={dictionary.az.dateOfBirth}
          />

          {/* <AppHandledDate
            name="dateOfBirth"
            inputProps={{
              id: 'dateOfBirth',
              labelPlacement: 'outside',
              label: dictionary.az.dateOfBirth,
              isDisabled: fieldsIsDisable
            }}
            control={control}
            size="sm"
            className="text-black  relative text-base sm:text-xl"
            isInvalid={Boolean(errors.dateOfBirth?.message)}
            errors={errors}
            rules={{
              required: {
                value: true,
                message: inputValidationText(dictionary.az.dateOfBirth)
              }
            }}
            placeholder={inputPlaceholderText(dictionary.az.dateOfBirth)}
            required
            IconElement={() => (
              <BsCalendarWeekFill
                size={16}
                color={errors.dateOfBirth?.message ? '#f31260' : ''}
                className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
              />
            )}
          /> */}

          <AppHandledSelect
            name="gender"
            selectProps={{
              id: 'gender',
              labelPlacement: 'outside',
              label: dictionary.az.gender,
              isDisabled: fieldsIsDisable
            }}
            isInvalid={Boolean(errors.gender?.message)}
            control={control}
            placeholder={selectPlaceholderText(dictionary.az.gender)}
            variant="bordered"
            className=" app-select text-base sm:text-xl"
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
            IconElement={() => (
              <BsFillPersonFill
                size={16}
                color={errors.dateOfBirth?.message ? '#f31260' : ''}
                className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
              />
            )}
          />
        </div>

        <div className="flex-col w-full sm:w-1/2 xl:w-2/5 flex gap-3 sm:gap-4">
          <AppHandledInput
            name="firstName"
            inputProps={{
              id: 'firstName',
              labelPlacement: 'outside',
              label: dictionary.az.firstName,
              isDisabled: fieldsIsDisable
            }}
            type="text"
            className="text-black text-base sm:text-xl"
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
            placeholder={inputPlaceholderText(dictionary.az.firstName)}
            required
            IconElement={() => (
              <BsFillPersonFill
                size={16}
                color={errors.firstName?.message ? '#f31260' : ''}
                className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
              />
            )}
          />
          <AppHandledInput
            name="lastName"
            inputProps={{
              id: 'lastName',
              labelPlacement: 'outside',
              label: dictionary.az.lastName,
              isDisabled: fieldsIsDisable
            }}
            type="text"
            control={control}
            className="text-black text-base sm:text-xl"
            isInvalid={Boolean(errors.lastName?.message)}
            errors={errors}
            size="sm"
            rules={{
              required: {
                value: true,
                message: inputValidationText(dictionary.az.lastName)
              }
            }}
            placeholder={inputPlaceholderText(dictionary.az.lastName)}
            required
            IconElement={() => (
              <BsFillPersonFill
                size={16}
                color={errors.lastName?.message ? '#f31260' : ''}
                className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
              />
            )}
          />
        </div>
      </form>
    </div>
  );
}

export default AccountForm;
