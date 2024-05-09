/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unstable-nested-components */
import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import AppHandledInput from '@/components/forms/input/handled-input';
import { toastOptions } from '@/configs/global-configs';
import { IGlobalResponseEmpty } from '@/models/common';
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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { toast } from 'react-toastify';

interface IForgotPassword {
  isOpen: boolean;
  onOpenChange: () => void;
}

export interface IForgotPasswordForm {
  email?: string;
  password?: string;
  confirmPassword?: string;
  code?: string;
}

/**
 * Renders a forgot password component.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Indicates whether the modal is open or not.
 * @param {Function} props.onOpenChange - Callback function to handle open/close state changes.
 * @example <ForgotPassword isOpen={true} onOpenChange={() => {}} />
 * @returns {JSX.Element} The forgot password component.
 */

function ForgotPassword({
  isOpen,
  onOpenChange
}: IForgotPassword): JSX.Element {
  const { t } = useTranslation();

  const {
    handleSubmit,
    watch,
    clearErrors,
    setError,
    reset,
    formState: { errors, isSubmitting },
    control
  } = useForm<IForgotPasswordForm>({
    mode: 'onChange'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  /**
   * Represents the state of whether a code has been entered or not.
   */
  const [hasCode, setHasCode] = useState(false);

  /**
   * Handles the form submission for the forgot password functionality.
   * If `hasCode` is false, it calls the `forgetPassword` method of the `AuthService` to initiate the password reset process.
   * If `hasCode` is true, it calls the `resetPassword` method of the `AuthService` to reset the password.
   *
   * @param data - The form data containing the necessary information for password reset.
   */
  const onSubmit = async (data: IForgotPasswordForm) => {
    if (!hasCode) {
      try {
        const res = await AuthService.getInstance().forgetPassword(data, e => {
          console.log(e.rawError, 'edahim');
          if (e.rawError.data) {
            setHasCode(true);
          }
        });
        if (res.isSuccess) {
          setHasCode(true);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res: IGlobalResponseEmpty =
          await AuthService.getInstance().resetPassword(data);
        if (res.isSuccess) {
          onOpenChange();
          toast.success(t('yourPasswordChangedSuccessfully'), toastOptions);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(
    () => () => {
      reset();
      setHasCode(false);
    },
    []
  );
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
                {t('forgetPassword')}
              </ModalHeader>
              <Divider className="mb-6" />

              <ModalBody>
                <form
                  id="forget-password-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col space-y-3 md:space-y-5"
                >
                  <div className="flex flex-col gap-5">
                    <AppHandledInput
                      name="email"
                      inputProps={{
                        id: 'email',
                        isDisabled: hasCode
                      }}
                      type="email"
                      control={control}
                      isInvalid={Boolean(errors.email?.message)}
                      errors={errors}
                      size="sm"
                      className="w-full"
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText(t('email'))
                        },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: t('email') + t('regexFormatValidatorText')
                        }
                      }}
                      label={inputPlaceholderText(t('email'))}
                      required
                    />

                    {hasCode && (
                      <>
                        <AppHandledInput
                          name="code"
                          inputProps={{
                            id: 'code'
                          }}
                          type="text"
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
                        <AppHandledInput
                          name="password"
                          control={control}
                          isInvalid={Boolean(errors.password?.message)}
                          errors={errors}
                          onChangeApp={() => {
                            if (
                              watch('password') !== watch('confirmPassword')
                            ) {
                              setError('password', {
                                message: t('confirmPasswordMessage')
                              });
                              setError('confirmPassword', {
                                message: t('confirmPasswordMessage')
                              });
                            } else {
                              clearErrors('password');
                              clearErrors('confirmPassword');
                            }
                          }}
                          rules={{
                            required: {
                              value: true,
                              message: inputValidationText(t('password'))
                            },
                            minLength: {
                              value: 8,
                              message: `${t('minLength')}`
                            },
                            validate: {
                              RequireDigit: value =>
                                /[0-9]/.test(value) || t('minNumber'),
                              RequireLowercase: value =>
                                /[a-z]/.test(value) || t('minSmallLetter'),
                              RequireUppercase: value =>
                                /[A-Z]/.test(value) || t('minBigLetter'),
                              RequireSpecialCharacter: value =>
                                /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                                  value
                                ) || `${t('minCharacter')}`
                            }
                          }}
                          label={inputPlaceholderText(t('password'))}
                          required
                          size="sm"
                          inputProps={{
                            id: 'password',
                            endContent: (
                              <button
                                aria-label="Show Password"
                                title="Show Password"
                                className="focus:outline-none"
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

                        <AppHandledInput
                          name="confirmPassword"
                          control={control}
                          size="sm"
                          className="text-black"
                          isInvalid={Boolean(errors.confirmPassword?.message)}
                          errors={errors}
                          onChangeApp={() => {
                            if (
                              watch('password') !== watch('confirmPassword')
                            ) {
                              setError('password', {
                                message: t('confirmPasswordMessage')
                              });
                              setError('confirmPassword', {
                                message: t('confirmPasswordMessage')
                              });
                            } else {
                              clearErrors('password');
                              clearErrors('confirmPassword');
                            }
                          }}
                          rules={{
                            required: {
                              value: true,
                              message: inputValidationText(
                                t('confirmPasswordMessage')
                              )
                            },
                            minLength: {
                              value: 8,
                              message: `${t('minLength')}`
                            },
                            validate: {
                              RequireDigit: value =>
                                /[0-9]/.test(value) || t('minNumber'),
                              RequireLowercase: value =>
                                /[a-z]/.test(value) || t('minSmallLetter'),
                              RequireUppercase: value =>
                                /[A-Z]/.test(value) || t('minBigLetter'),
                              RequireSpecialCharacter: value =>
                                /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                                  value
                                ) || t('minCharacter')
                            }
                          }}
                          label={inputPlaceholderText(t('confirmPassword'))}
                          required
                          inputProps={{
                            id: 'confirmPassword',
                            endContent: (
                              <button
                                className="focus:outline-none"
                                type="button"
                                aria-label="Show Password"
                                title="Show Password"
                                onClick={() => setShowPasswordConfirm(z => !z)}
                              >
                                {showPasswordConfirm ? (
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
                          type={showPasswordConfirm ? 'text' : 'password'}
                        />
                      </>
                    )}
                  </div>
                  {hasCode && (
                    <div
                      className="bg-green-50 mb-4 p-4 rounded-lg text-green-400 text-sm"
                      role="alert"
                    >
                      <span className="font-medium">
                        {t('newPswrdSentToEmail')}
                      </span>
                    </div>
                  )}
                </form>
              </ModalBody>
              <ModalFooter>
                <AppHandledBorderedButton
                  title="Close Modal"
                  aria-label="Close Modal"
                  onPress={onClose}
                >
                  {t('closeBtn')}
                </AppHandledBorderedButton>
                <AppHandledSolidButton
                  form="forget-password-form"
                  title="Send Password To Email"
                  aria-label="Send Password To Email"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  {!hasCode ? t('send') : t('approve')}
                </AppHandledSolidButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ForgotPassword;
