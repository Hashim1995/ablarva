import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import AppHandledInput from '@/components/forms/input/handled-input';
import { setState } from '@/models/common';
import { IHTTPSParams } from '@/services/adapter-config/config';
import { inputPlaceholderText } from '@/utils/constants/texts';
import { convertFormDataToQueryParams } from '@/utils/functions/functions';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { MdRefresh, MdSearch } from 'react-icons/md';
import { ILeadsListForm } from '../types';

interface IProps {
  setCurrentPage: setState<number>;
  setReFetch: setState<boolean>;
  setQueryParams: setState<IHTTPSParams[]>;
}

function LeadsFilter({ setCurrentPage, setReFetch, setQueryParams }: IProps) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<ILeadsListForm>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      company: '',
      email: '',
      jobTitle: '',
      website: '',
      country: '',
      linkedin: ''
    }
  });

  const onSubmit = async (data: ILeadsListForm) => {
    setCurrentPage(1);
    const queryParamsData: IHTTPSParams[] =
      convertFormDataToQueryParams<ILeadsListForm>(data);
    setQueryParams(queryParamsData);
    setReFetch(z => !z);
  };
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div className="flex justify-between">
        <h3 className="font-semibold text-default-800 text-xl dark:text-white">
          {t('leadsFilter')} 🪪
        </h3>
      </div>
      <div className="border-1 border-divider bg-transparent shadow-lg p-6 rounded-2xl w-full">
        <form
          id="leads-filter-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex sm:flex-row flex-col justify-between gap-3 sm:gap-4 w-full"
        >
          <div className="flex w-full">
            <div className="left flex gap-5 w-full">
              <div className="flex flex-col gap-5 w-1/2">
                <div className="w-full">
                  <AppHandledInput
                    name="name"
                    required={false}
                    errors={errors}
                    inputProps={{
                      id: 'name'
                    }}
                    type="text"
                    className="text-default-900 dark:text-white"
                    control={control}
                    size="sm"
                    label={inputPlaceholderText(t('name'))}
                  />
                </div>
                <div className="w-full">
                  <AppHandledInput
                    name="company"
                    inputProps={{
                      id: 'company'
                    }}
                    type="text"
                    className="text-default-900 dark:text-white"
                    control={control}
                    required={false}
                    errors={errors}
                    size="sm"
                    label={inputPlaceholderText(t('company'))}
                  />
                </div>
                <div className="w-full">
                  <AppHandledInput
                    name="email"
                    inputProps={{
                      id: 'email'
                    }}
                    type="text"
                    className="text-default-900 dark:text-white"
                    control={control}
                    required={false}
                    errors={errors}
                    size="sm"
                    label={inputPlaceholderText(t('email'))}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-5 w-1/2">
                <div className="w-full">
                  <AppHandledInput
                    name="linkedin"
                    inputProps={{
                      id: 'linkedin'
                    }}
                    type="text"
                    className="text-default-900 dark:text-white"
                    control={control}
                    required={false}
                    errors={errors}
                    size="sm"
                    label={inputPlaceholderText(t('linkedin'))}
                  />
                </div>
                <div className="w-full">
                  <AppHandledInput
                    name="jobTitle"
                    inputProps={{
                      id: 'jobTitle'
                    }}
                    type="text"
                    className="text-default-900 dark:text-white"
                    control={control}
                    required={false}
                    errors={errors}
                    size="sm"
                    label={inputPlaceholderText(t('jobTitle'))}
                  />
                </div>
                <div className="w-full">
                  <AppHandledInput
                    name="country"
                    inputProps={{
                      id: 'country'
                    }}
                    type="text"
                    className="text-default-900 dark:text-white"
                    control={control}
                    required={false}
                    errors={errors}
                    size="sm"
                    label={inputPlaceholderText(t('country'))}
                  />
                </div>
              </div>
            </div>
            <div className="right flex flex-col items-end gap-2 w-40">
              <AppHandledSolidButton form="leads-filter-form" type="submit">
                <MdSearch size={21} />
              </AppHandledSolidButton>
              <AppHandledBorderedButton
                type="button"
                onClick={() => {
                  reset();
                  setQueryParams([]);
                  setReFetch(z => !z);
                  setCurrentPage(1);
                }}
              >
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
