/* eslint-disable no-use-before-define */
// import AppHandledAutocomplete from '@/components/forms/autocomplete/autocomplete';
import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import AppHandledDatePicker from '@/components/forms/date/app-handled-date-picker';
import AppHandledSelect from '@/components/forms/select/handled-select';
// import { parseDate } from '@internationalized/date';

import {
  industriesOptions,
  companySizeOptions
} from '@/utils/constants/options';
import { selectPlaceholderText } from '@/utils/constants/texts';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { MdRefresh, MdSearch } from 'react-icons/md';

function PendingMailsFilter() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<any>({
    mode: 'onSubmit',
    defaultValues: {
      country: '',
      annualRevenue: '',
      companySize: ''
      // scheduledDateStart: parseDate('2024-04-04')
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
          {t('pendingMailsFilter')} 🪪
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
              <div className="flex flex-col gap-5 w-1/3">
                <div className="w-full">
                  <AppHandledSelect
                    name="campaign"
                    selectProps={{
                      id: 'campaign'
                    }}
                    control={control}
                    label={selectPlaceholderText(t('campaign'))}
                    // className="app-select text-base sm:text-xl"

                    options={companySizeOptions}
                    errors={errors}
                  />
                </div>
                <div className="w-full">
                  <AppHandledSelect
                    name="language"
                    selectProps={{
                      id: 'language'
                    }}
                    control={control}
                    label={selectPlaceholderText(t('language'))}
                    // className="app-select text-base sm:text-xl"

                    options={industriesOptions}
                    errors={errors}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5 w-1/3">
                <div className="w-full">
                  <AppHandledSelect
                    name="templateType"
                    selectProps={{
                      id: 'templateType'
                    }}
                    control={control}
                    label={selectPlaceholderText(t('templateType'))}
                    // className="app-select text-base sm:text-xl"

                    options={companySizeOptions}
                    errors={errors}
                  />
                </div>
                {/* 
                <div className="w-full">
                  <AppHandledAutocomplete
                    name="test"
                    selectProps={{
                      id: 'test'
                    }}
                    control={control}
                    label={selectPlaceholderText(t('test'))}
                    // className="app-select text-base sm:text-xl"

                    options={industriesOptions}
                    errors={errors}
                  />
                </div> */}
                <div className="w-full">
                  <AppHandledSelect
                    name="sender"
                    selectProps={{
                      id: 'sender'
                    }}
                    control={control}
                    label={selectPlaceholderText(t('sender'))}
                    // className="app-select text-base sm:text-xl"

                    options={industriesOptions}
                    errors={errors}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5 w-1/3">
                <div className="w-full">
                  <AppHandledDatePicker
                    name="scheduledDateStart"
                    selectProps={{
                      id: 'scheduledDateStart'
                    }}
                    control={control}
                    label={selectPlaceholderText(t('scheduledDateStart'))}
                    // className="app-select text-base sm:text-xl"

                    errors={errors}
                  />
                </div>
                <div className="w-full">
                  <AppHandledDatePicker
                    name="scheduledDateEnd"
                    selectProps={{
                      id: 'scheduledDateEnd'
                    }}
                    control={control}
                    label={selectPlaceholderText(t('scheduledDateEnd'))}
                    // className="app-select text-base sm:text-xl"

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

export default PendingMailsFilter;
