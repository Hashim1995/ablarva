import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import AppHandledSelect from '@/components/forms/select/handled-select';
import {
  industriesOptions,
  companySizeOptions
} from '@/utils/constants/options';
import { selectPlaceholderText } from '@/utils/constants/texts';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { MdRefresh } from 'react-icons/md';

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
                  <AppHandledSelect
                    name="scheduledDateStart"
                    selectProps={{
                      id: 'scheduledDateStart'
                    }}
                    control={control}
                    label={selectPlaceholderText(t('scheduledDateStart'))}
                    // className="app-select text-base sm:text-xl"

                    options={companySizeOptions}
                    errors={errors}
                  />
                </div>
                <div className="w-full">
                  <AppHandledSelect
                    name="scheduledDateEnd"
                    selectProps={{
                      id: 'scheduledDateEnd'
                    }}
                    control={control}
                    label={selectPlaceholderText(t('scheduledDateEnd'))}
                    // className="app-select text-base sm:text-xl"

                    options={industriesOptions}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
            <div className="right flex flex-col items-end gap-2 w-40">
              <AppHandledSolidButton type="submit">
                {t('search')}
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
