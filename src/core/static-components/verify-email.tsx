/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unstable-nested-components */
import AppHandledInput from '@/components/forms/input/handled-input';
import { useTranslation } from 'react-i18next';
import { toastOptions } from '@/configs/global-configs';
import { IGlobalResponseEmpty } from '@/models/common';
import { fetchUserData } from '@/redux/auth/auth-slice';
import { AppDispatch } from '@/redux/store';
import { AuthService } from '@/services/auth-services/auth-services';

import { inputPlaceholderText } from '@/utils/constants/texts';
import { inputValidationText } from '@/utils/constants/validations';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Divider
} from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsQuestionCircleFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';

interface IVerifyEmail {
  isOpen: boolean;
  onOpenChange: () => void;
}

export interface IVerifyEmailForm {
  code?: string | number;
}

/**
 * The VerifyEmail component is responsible for rendering a modal that allows users to verify their email address.
 * It includes a form where users can enter a verification code and submit it for verification.
 * The component also provides an option to resend the verification code if needed.
 * Once the email is successfully verified, the component triggers a callback function to handle the change in the modal's open state.
 * Additionally, the component displays some informational text and buttons for user interaction.
 * @component
 * @param {IVerifyEmail} props - The component props.
 * @param {boolean} props.isOpen - Indicates whether the verification modal is open or not.
 * @param {Function} props.onOpenChange - Callback function to handle the change in modal open state.
 * @returns {JSX.Element} The VerifyEmail component.
 * @example
 * // Example here
 * <VerifyEmail isOpen={true} onOpenChange={() => {}} />
 */
function VerifyEmail({ isOpen, onOpenChange }: IVerifyEmail): JSX.Element {
  const { t } = useTranslation();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control
  } = useForm<IVerifyEmailForm>({
    mode: 'onChange'
  });

  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Handles the form submission for verifying email.
   * @param data - The form data containing the email verification code.
   */
  const onSubmit = async (data: IVerifyEmailForm) => {
    try {
      const res: IGlobalResponseEmpty =
        await AuthService.getInstance().verifyEmail({
          code: Number(data.code)
        });
      if (res.isSuccess) {
        onOpenChange();
        toast.success(t('yourEmailApprovedSuccessfully'), toastOptions);
        dispatch(fetchUserData());
      }
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Resends the verification code for email verification.
   */
  const resendVerificationCode = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await AuthService.getInstance().resendVerificationCode();
      if (res.isSuccess) {
        toast.success(t('verifyCodeSentSuccesfully'), toastOptions);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <Modal
        size="lg"
        isDismissable={false}
        backdrop="opaque"
        className="centerModalOnMobile"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1 pr-10 text-default-800 dark:text-white">
                {t('emailVerify')}
              </ModalHeader>
              <Divider className="mb-6" />

              <ModalBody>
                <form
                  id="email-verify-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col space-y-5"
                >
                  <div className="flex flex-col gap-5">
                    <AppHandledInput
                      name="code"
                      inputProps={{
                        id: 'code'
                      }}
                      type="number"
                      control={control}
                      isInvalid={Boolean(errors.code?.message)}
                      errors={errors}
                      size="sm"
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText(t('code'))
                        }
                      }}
                      label={inputPlaceholderText(t('code'))}
                      required
                    />
                  </div>

                  <p className="clear-both text-default-800 text-left text-sm dark:text-white">
                    <BsQuestionCircleFill
                      size={26}
                      color="orange"
                      className="float-left mr-2"
                    />
                    {t('confirmEmailBalance')}
                    <span className="font-semibold"> 300 {t('ordinary')}</span>
                    {t('andText')}
                    <span className="font-semibold"> 100 {t('premium')}</span>
                    {t('requestOptionAdded')}
                  </p>
                </form>
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <AppHandledBorderedButton
                  aria-label="Resend"
                  title="Resend"
                  onClick={resendVerificationCode}
                  isLoading={loading}
                  type="button"
                >
                  {t('sendCodeToEmail')}
                </AppHandledBorderedButton>
                <div className="flex gap-2">
                  <AppHandledBorderedButton
                    title="Close"
                    aria-label="Close"
                    onPress={onClose}
                  >
                    {t('closeBtn')}
                  </AppHandledBorderedButton>

                  <AppHandledSolidButton
                    aria-label="Approve"
                    form="email-verify-form"
                    title="Approve"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    {t('approve')}
                  </AppHandledSolidButton>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default VerifyEmail;
