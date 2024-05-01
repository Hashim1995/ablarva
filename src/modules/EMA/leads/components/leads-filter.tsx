import AppHandledInput from '@/components/forms/input/handled-input';
import AppHandledSelect from '@/components/forms/select/handled-select';
import { industriesOptions } from '@/utils/constants/options';
import {
  inputPlaceholderText,
  selectPlaceholderText
} from '@/utils/constants/texts';
import { inputValidationText } from '@/utils/constants/validations';
import { Button } from '@nextui-org/react';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { MdRefresh } from 'react-icons/md';
import { ILeadsListForm } from '../types';

function LeadsFilter() {
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm<ILeadsListForm>({
    mode: 'onSubmit'
    // defaultValues: async () => getSmtpConfig()
  });

  function onSubmit() {
    console.log('test');
  }
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div className="flex justify-between">
        <h3 className="font-semibold text-default-800 text-xl dark:text-white">
          {t('leads')} 🪪
        </h3>
      </div>
      <div className="border-1 border-divider bg-transparent shadow-lg p-6 rounded-2xl w-full">
        <form
          id="account-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex sm:flex-row flex-col justify-between gap-3 sm:gap-4 w-full"
        >
          <div className="flex w-full">
            <div className="left flex gap-5 w-full">
              <div className="flex flex-col gap-5 w-1/2">
                <div className="w-full">
                  <AppHandledInput
                    name="country"
                    inputProps={{
                      id: 'country'
                    }}
                    type="email"
                    className="text-default-900 dark:text-white"
                    control={control}
                    isInvalid={Boolean(errors.country?.message)}
                    errors={errors}
                    size="sm"
                    rules={{
                      required: {
                        value: true,
                        message: inputValidationText(t('country'))
                      },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: `${t('country')} ${t(
                          'regexFormatValidatorText'
                        )}`
                      }
                    }}
                    label={inputPlaceholderText(t('country'))}
                    required
                  />
                </div>
                <div className="w-full">
                  <AppHandledInput
                    name="annualRevenue"
                    inputProps={{
                      id: 'annualRevenue'
                    }}
                    type="email"
                    className="text-default-900 dark:text-white"
                    control={control}
                    isInvalid={Boolean(errors.annualRevenue?.message)}
                    errors={errors}
                    size="sm"
                    rules={{
                      required: {
                        value: true,
                        message: inputValidationText(t('annualRevenue'))
                      },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: `${t('annualRevenue')} ${t(
                          'regexFormatValidatorText'
                        )}`
                      }
                    }}
                    label={inputPlaceholderText(t('annualRevenue'))}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5 w-1/2">
                <div className="w-full">
                  <AppHandledInput
                    name="companySize"
                    inputProps={{
                      id: 'companySize'
                    }}
                    type="email"
                    className="text-default-900 dark:text-white"
                    control={control}
                    isInvalid={Boolean(errors.companySize?.message)}
                    errors={errors}
                    size="sm"
                    rules={{
                      required: {
                        value: true,
                        message: inputValidationText(t('companySize'))
                      },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: `${t('companySize')} ${t(
                          'regexFormatValidatorText'
                        )}`
                      }
                    }}
                    label={inputPlaceholderText(t('companySize'))}
                    required
                  />
                </div>
                <div className="w-full">
                  <AppHandledSelect
                    name="industries"
                    selectProps={{
                      id: 'industries'
                    }}
                    isInvalid={Boolean(errors.industries?.message)}
                    control={control}
                    label={selectPlaceholderText(t('industries'))}
                    // className="app-select text-base sm:text-xl"
                    required
                    rules={{
                      required: {
                        value: true,
                        message: inputValidationText(t('industries'))
                      }
                    }}
                    options={industriesOptions}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
            <div className="right flex flex-col items-end gap-2 w-40">
              <Button type="submit" isLoading={false}>
                {t('search')}
              </Button>
              <Button type="button" isLoading={false}>
                <MdRefresh size={20} />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LeadsFilter;
