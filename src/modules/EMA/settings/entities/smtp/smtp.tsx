import AppHandledInput from '@/components/forms/input/handled-input';
import { toastOptions } from '@/configs/global-configs';
import { inputPlaceholderText } from '@/utils/constants/texts';
import { inputValidationText } from '@/utils/constants/validations';
import { Button, Card, Skeleton } from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SettingsService } from '@/services/settings-services/settings-services';
import { toast } from 'react-toastify';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { ISmtpItem } from './types';

/**
 * Renders the SMTP settings page. This page allows the user to configure the SMTP settings. The user can update the SMTP settings. The user can also view the current SMTP settings. Form validation is also implemented. The user can see the validation errors if the form is not valid.
 *
 * @returns The rendered SMTP settings page.
 */
function Smtp() {
  const [loading, setLoading] = useState(true);
  const [btnLoader, setBtnLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Fetches the SMTP settings from the server.
   * @returns The SMTP settings.
   * @async The function is asynchronous.
   * @throws The function throws an error if it encounters an error.
   */
  const getSmtpConfig = async () => {
    try {
      const res = await SettingsService.getInstance().getSmtp();
      if (res.isSuccess) {
        setLoading(false);
        return res?.data;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm<ISmtpItem>({
    mode: 'onSubmit',
    defaultValues: async () => getSmtpConfig()
  });
  const { t } = useTranslation();

  /**
   * Submits the form. It updates the SMTP settings.
   * @param data The SMTP settings.
   * @async The function is asynchronous.
   * @throws The function throws an error if it encounters an error.
   * @returns The result of the form submission.
   */
  const onSubmit = async (data: ISmtpItem) => {
    const payload: ISmtpItem = {
      mailAddress: data?.mailAddress,
      mailPassword: data?.mailPassword,
      hostName: data?.hostName,
      port: data?.port,
      id: data?.id
    };

    setBtnLoader(true);
    try {
      const res = await SettingsService.getInstance().updateSmtp(payload);
      if (res.isSuccess) {
        toast.success(t('successTxt'), toastOptions);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setBtnLoader(false);
    }
  };

  return (
    <Card className=" relative bg-transparent !shadow-none !rounded-none containerLg">
      <div className="flex justify-between min-h-[48px] sm:min-h-[56px] items-center p-2 sm:p-3">
        <div className="text-base sm:text-xl text-white flex flex-row gap-1 sm:gap-0 font-semibold">
          <p>{t('smtpSettings')}</p>
        </div>
      </div>

      {/* Table */}
      <div className=" px-2">
        {!loading ? (
          <form
            id="account-form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row w-full justify-between gap-3 sm:gap-4"
          >
            <div className="flex-col w-full sm:w-1/2 xl:w-2/5 flex gap-3 sm:gap-4">
              <AppHandledInput
                name="mailAddress"
                inputProps={{
                  id: 'mailAddress'
                }}
                type="email"
                className="text-white"
                control={control}
                isInvalid={Boolean(errors.mailAddress?.message)}
                errors={errors}
                size="sm"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('mailAddress'))
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: `${t('mailAddress')} ${t(
                      'regexFormatValidatorText'
                    )}`
                  }
                }}
                label={inputPlaceholderText(t('mailAddress'))}
                required
              />
              <AppHandledInput
                name="mailPassword"
                control={control}
                isInvalid={Boolean(errors.mailPassword?.message)}
                errors={errors}
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('mailPassword'))
                  },
                  minLength: {
                    value: 1,
                    message: t('minLength')
                  }
                }}
                label={inputPlaceholderText(t('mailPassword'))}
                required
                size="sm"
                inputProps={{
                  id: 'mailPassword',
                  endContent: (
                    <button
                      className="focus:outline-none"
                      title="Show Password"
                      aria-label="Show Password"
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
            </div>

            <div className="flex-col w-full sm:w-1/2 xl:w-2/5 flex gap-3 sm:gap-4">
              <AppHandledInput
                name="hostName"
                inputProps={{
                  id: 'hostName'
                }}
                type="text"
                className="text-white"
                control={control}
                isInvalid={Boolean(errors.hostName?.message)}
                errors={errors}
                size="sm"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('hostName'))
                  }
                }}
                label={inputPlaceholderText(t('hostName'))}
                required
              />{' '}
              <AppHandledInput
                name="port"
                inputProps={{
                  id: 'port'
                }}
                type="number"
                className="text-white"
                control={control}
                isInvalid={Boolean(errors.port?.message)}
                errors={errors}
                size="sm"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('port'))
                  }
                }}
                label={inputPlaceholderText(t('port'))}
                required
              />
              <Button type="submit" isLoading={btnLoader}>
                {t('toApprove')}
              </Button>
            </div>
          </form>
        ) : (
          <div className=" my-5 w-full flex items-center gap-3">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export default Smtp;
