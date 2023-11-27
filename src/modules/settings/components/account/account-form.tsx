/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';
import { inputValidationText } from '@/utils/constants/validations';
import { dictionary } from '@/utils/constants/dictionary';
import {
  inputPlaceholderText,
  selectPlaceholderText
} from '@/utils/constants/texts';
import {
  BsCalendarWeekFill,
  BsEnvelopeFill,
  BsFillPersonFill
} from 'react-icons/bs';
import AppHandledInput from '@/components/forms/input/handled-input';
import AppHandledDate from '@/components/forms/date/handled-date';
import AppHandledSelect from '@/components/forms/select/handled-select';
import { genderOptions } from '@/utils/constants/options';
import { useEffect } from 'react';
import { IAccountForm } from '../../types';

interface IAccountFormProps {
  fieldsIsDisable: boolean;
}

function AccountForm({ fieldsIsDisable }: IAccountFormProps) {
  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    control
  } = useForm<IAccountForm>({
    mode: 'onSubmit'
  });

  const onSubmit = async (data: IAccountForm) => {
    console.log(data);
  };

  useEffect(() => {
    setValue('email', 'bilalsadiqov@gmail.com');
    setValue('firstName', 'Bilal');
    setValue('lastName', 'Sadiqov');
    setValue('dateOfBirth', '22.11.1997');
    setValue('gender', '1');
  }, []);
  return (
    <div className="  rounded-lg   p-5">
      <form
        id="account-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full justify-between   gap-4"
      >
        <div className="flex-col w-2/5  flex gap-8">
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
            size="md"
            className="text-black bg-transparent"
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
            name="dateOfBirth"
            inputProps={{
              id: 'dateOfBirth',
              labelPlacement: 'outside',
              label: dictionary.az.dateOfBirth,
              isDisabled: fieldsIsDisable
            }}
            control={control}
            size="md"
            className="text-black  relative"
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
          />

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
            className=" app-select"
            size="md"
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
              <BsCalendarWeekFill
                size={16}
                color={errors.dateOfBirth?.message ? '#f31260' : ''}
                className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
              />
            )}
          />
        </div>

        <div className="flex-col w-2/5  flex gap-8">
          <AppHandledInput
            name="firstName"
            inputProps={{
              id: 'firstName',
              labelPlacement: 'outside',
              label: dictionary.az.firstName,
              isDisabled: fieldsIsDisable
            }}
            type="text"
            className="text-black "
            control={control}
            isInvalid={Boolean(errors.firstName?.message)}
            errors={errors}
            size="md"
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
            className="text-black "
            isInvalid={Boolean(errors.lastName?.message)}
            errors={errors}
            size="md"
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
