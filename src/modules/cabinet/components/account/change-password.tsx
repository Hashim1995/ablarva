/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unstable-nested-components */
import AppHandledInput from '@/components/forms/input/handled-input';
import { toastOptions } from '@/configs/global-configs';
import { IGlobalResponseEmpty } from '@/models/common';
import { AuthService } from '@/services/auth-services/auth-services';
// import { dictionary } from '@/utils/constants/dictionary';
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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface IChangePasswordProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export interface IChangePasswordForm {
  password: string;
  confirmPassword: string;
  oldPassword: string;
}

function ChangePassword({ isOpen, onOpenChange }: IChangePasswordProps) {
  const {
    handleSubmit,
    watch,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
    control
  } = useForm<IChangePasswordForm>({
    mode: 'onChange'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const onSubmit = async (data: IChangePasswordForm) => {
    try {
      const res: IGlobalResponseEmpty =
        await AuthService.getInstance().changePassword(data);
      if (res.isSuccess) {
        onOpenChange();
        toast.success('Şifrəniz uğurla yeniləndi', toastOptions);

        localStorage.removeItem('userToken');
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Modal
        size="lg"
        isDismissable={false}
        className="centerModalOnMobile"
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t('changePassWord')}
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col space-y-5"
                >
                  <div className="flex flex-col gap-5  ">
                    <AppHandledInput
                      name="oldPassword"
                      control={control}
                      isInvalid={Boolean(errors.oldPassword?.message)}
                      errors={errors}
                      size="sm"
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText(t('oldPassword'))
                        }
                      }}
                      label={inputPlaceholderText(t('oldPassword'))}
                      required
                      inputProps={{
                        id: 'oldPassword',
                        endContent: (
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={() => setShowOldPassword(z => !z)}
                          >
                            {showOldPassword ? (
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
                      type={showOldPassword ? 'text' : 'password'}
                    />
                    <AppHandledInput
                      name="password"
                      control={control}
                      isInvalid={Boolean(errors.password?.message)}
                      errors={errors}
                      onChangeApp={() => {
                        if (watch('password') !== watch('confirmPassword')) {
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
                          message: t('minLength')
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
                      label={inputPlaceholderText(t('password'))}
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
                      isInvalid={Boolean(errors.confirmPassword?.message)}
                      errors={errors}
                      onChangeApp={() => {
                        if (watch('password') !== watch('confirmPassword')) {
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
                          message: inputValidationText(t('confirmPassword'))
                        },
                        minLength: {
                          value: 8,
                          message: t('minLength')
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
                  </div>

                  <Button
                    size="md"
                    isLoading={isSubmitting}
                    variant="bordered"
                    type="submit"
                  >
                    {t('approve')}
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>{t('closeBtn')}</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ChangePassword;
