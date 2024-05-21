import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import AppHandledInput from '@/components/forms/input/handled-input';
import AppHandledSelect from '@/components/forms/select/handled-select';
import {
  industriesOptions,
  companySizeOptions
} from '@/utils/constants/options';
import {
  inputPlaceholderText,
  selectPlaceholderText
} from '@/utils/constants/texts';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { MdRefresh, MdSearch } from 'react-icons/md';
import { ILeadsListForm } from '../types';

function LeadsFilter() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<ILeadsListForm>({
    mode: 'onSubmit',
    defaultValues: {
      country: '',
      annualRevenue: '',
      companySize: ''
    }
    // defaultValues: async () => getSmtpConfig()
  });

  function onSubmit() {
    console.log('test');
  }
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div className="flex justify-between">
        <h3 className="font-semibold text-default-800 text-xl dark:text-white">
          {t('leadsFilter')} 🪪
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
                    size="sm"
                    label={inputPlaceholderText(t('country'))}
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
                    size="sm"
                    label={inputPlaceholderText(t('annualRevenue'))}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5 w-1/2">
                <div className="w-full">
                  <AppHandledSelect
                    name="companySize"
                    selectProps={{
                      id: 'companySize'
                    }}
                    control={control}
                    label={selectPlaceholderText(t('companySize'))}
                    // className="app-select text-base sm:text-xl"

                    options={companySizeOptions}
                    errors={errors}
                  />
                </div>
                <div className="w-full">
                  <AppHandledSelect
                    name="industries"
                    selectProps={{
                      id: 'industries'
                    }}
                    control={control}
                    label={selectPlaceholderText(t('industries'))}
                    // className="app-select text-base sm:text-xl"

                    options={industriesOptions}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
            <div className="right flex flex-col items-end gap-2 w-40">
              <AppHandledSolidButton type="submit">
                <MdSearch size={21} />
              </AppHandledSolidButton>
              <AppHandledBorderedButton type="button" onClick={() => reset()}>
                <MdRefresh size={20} />
              </AppHandledBorderedButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LeadsFilter;
