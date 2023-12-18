/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unstable-nested-components */
import AppHandledInput from '@/components/forms/input/handled-input';
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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEye, BsEyeSlash, BsFillPersonFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const onSubmit = async (data: IChangePasswordForm) => {
    try {
      const res: IGlobalResponseEmpty =
        await AuthService.getInstance().changePassword(data);
      if (res.isSuccess) {
        onOpenChange();
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
                {dictionary.az.changePassWord}
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col space-y-5"
                >
                  <div className="flex flex-col gap-5  ">
                    <AppHandledInput
                      name="oldPassword"
                      className="text-black"
                      control={control}
                      isInvalid={Boolean(errors.oldPassword?.message)}
                      errors={errors}
                      size="sm"
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText(
                            dictionary.az.oldPassword
                          )
                        }
                      }}
                      placeholder={inputPlaceholderText(
                        dictionary.az.oldPassword
                      )}
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
                      IconElement={() => (
                        <BsFillPersonFill
                          size={16}
                          color={errors.oldPassword?.message ? '#f31260' : ''}
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      )}
                    />
                    <AppHandledInput
                      name="password"
                      control={control}
                      className="text-black"
                      isInvalid={Boolean(errors.password?.message)}
                      errors={errors}
                      onChangeApp={() => {
                        if (watch('password') !== watch('confirmPassword')) {
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
                          message: inputValidationText(dictionary.az.password)
                        },
                        minLength: {
                          value: 8,
                          message: `${dictionary.az.minLength}`
                        },
                        validate: {
                          RequireDigit: value =>
                            /[0-9]/.test(value) || `${dictionary.az.minNumber}`,
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
                      placeholder={inputPlaceholderText(dictionary.az.password)}
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
                      IconElement={() => (
                        <BsFillPersonFill
                          size={16}
                          color={errors.password?.message ? '#f31260' : ''}
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      )}
                    />

                    <AppHandledInput
                      name="confirmPassword"
                      control={control}
                      size="sm"
                      className="text-black"
                      isInvalid={Boolean(errors.confirmPassword?.message)}
                      errors={errors}
                      onChangeApp={() => {
                        if (watch('password') !== watch('confirmPassword')) {
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
                            /[0-9]/.test(value) || `${dictionary.az.minNumber}`,
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
                      placeholder={inputPlaceholderText(
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
                      IconElement={() => (
                        <BsFillPersonFill
                          size={16}
                          color={
                            errors.confirmPassword?.message ? '#f31260' : ''
                          }
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      )}
                    />
                  </div>

                  <Button
                    size="md"
                    isLoading={isSubmitting}
                    className="w-full bg-black  text-white border"
                    type="submit"
                  >
                    {dictionary.az.approve}
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

export default ChangePassword;
