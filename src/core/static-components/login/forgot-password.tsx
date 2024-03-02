/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unstable-nested-components */
import AppHandledInput from '@/components/forms/input/handled-input';
import { toastOptions } from '@/configs/global-configs';
import { IGlobalResponseEmpty } from '@/models/common';
import { AuthService } from '@/services/auth-services/auth-services';
import { dictionary } from '@/utils/constants/dictionary';
import { inputPlaceholderText } from '@/utils/constants/texts';
import { inputValidationText } from '@/utils/constants/validations';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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

function ForgotPassword({ isOpen, onOpenChange }: IForgotPassword) {
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
  const [hasCode, setHasCode] = useState(false);

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
          toast.success('Şifrəniz uğurla dəyişdirildi', toastOptions);
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
              <ModalHeader className="flex flex-col px-6 py-3 md:px-6 md:py-4 gap-1">
                {dictionary.az.forgetPassword}
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col space-y-3 md:space-y-5"
                >
                  <div className="flex flex-col gap-5  ">
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
                          message: inputValidationText(dictionary.az.email)
                        },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: `${dictionary.az.email} ${dictionary.az.regexFormatValidatorText}`
                        }
                      }}
                      label={inputPlaceholderText(dictionary.az.email)}
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
                              message: inputValidationText(dictionary.az.code)
                            }
                          }}
                          label={inputPlaceholderText(dictionary.az.code)}
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
                                message: `${dictionary.az.confirmPasswordMessage}`
                              });
                              setError('confirmPassword', {
                                message: `${dictionary.az.confirmPasswordMessage}`
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
                                dictionary.az.password
                              )
                            },
                            minLength: {
                              value: 8,
                              message: `${dictionary.az.minLength}`
                            },
                            validate: {
                              RequireDigit: value =>
                                /[0-9]/.test(value) ||
                                `${dictionary.az.minNumber}`,
                              RequireLowercase: value =>
                                /[a-z]/.test(value) ||
                                `${dictionary.az.minSmallLetter}`,
                              RequireUppercase: value =>
                                /[A-Z]/.test(value) ||
                                `${dictionary.az.minBigLetter}`,
                              RequireSpecialCharacter: value =>
                                /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                                  value
                                ) || `${dictionary.az.minCharacter}`
                            }
                          }}
                          label={inputPlaceholderText(dictionary.az.password)}
                          required
                          size="sm"
                          inputProps={{
                            id: 'password',
                            endContent: (
                              <button
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
                                message: `${dictionary.az.confirmPasswordMessage}`
                              });
                              setError('confirmPassword', {
                                message: `${dictionary.az.confirmPasswordMessage}`
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
                                dictionary.az.confirmPassword
                              )
                            },
                            minLength: {
                              value: 8,
                              message: `${dictionary.az.minLength}`
                            },
                            validate: {
                              RequireDigit: value =>
                                /[0-9]/.test(value) ||
                                `${dictionary.az.minNumber}`,
                              RequireLowercase: value =>
                                /[a-z]/.test(value) ||
                                `${dictionary.az.minSmallLetter}`,
                              RequireUppercase: value =>
                                /[A-Z]/.test(value) ||
                                `${dictionary.az.minBigLetter}`,
                              RequireSpecialCharacter: value =>
                                /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                                  value
                                ) || `${dictionary.az.minCharacter}`
                            }
                          }}
                          label={inputPlaceholderText(
                            dictionary.az.confirmPassword
                          )}
                          required
                          inputProps={{
                            id: 'confirmPassword',
                            endContent: (
                              <button
                                className="focus:outline-none"
                                type="button"
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
                      className="p-4 mb-4 text-sm  rounded-lg bg-green-50 text-green-400"
                      role="alert"
                    >
                      <span className="font-medium">
                        {dictionary.az.newPswrdSentToEmail}
                      </span>
                    </div>
                  )}
                  <Button
                    size="md"
                    isLoading={isSubmitting}
                    className="w-full bg-black  text-white border"
                    type="submit"
                  >
                    {!hasCode
                      ? dictionary.az.sendPswrdToEmail
                      : dictionary.az.approve}
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button variant="bordered" onPress={onClose}>
                  {dictionary.az.closeBtn}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ForgotPassword;
