/* eslint-disable react/no-unstable-nested-components */
import AppHandledInput from '@/components/forms/input/handled-input';
import { IGlobalResponseEmpty } from '@/models/common';
import { ILogin } from '@/models/user';
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
import { BsEnvelopeFill } from 'react-icons/bs';

interface IForgotPassword {
  isOpen: boolean;
  onOpenChange: () => void;
}

function ForgotPassword({ isOpen, onOpenChange }: IForgotPassword) {
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control
  } = useForm<Omit<ILogin, 'password'>>({
    mode: 'onChange',
    defaultValues: {
      email: ''
    }
  });

  const [showAlert, setshowAlert] = useState(false);

  const onSubmit = async (data: Omit<ILogin, 'password'>) => {
    try {
      const res: IGlobalResponseEmpty =
        await AuthService.getInstance().forgetPassword(data);

      res.isSuccess && setshowAlert(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(
    () => () => {
      reset();
      setshowAlert(false);
    },
    []
  );
  return (
    <div>
      <Modal
        isDismissable={false}
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {dictionary.az.forgetPassword}
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col space-y-5"
                >
                  <div className="flex flex-col gap-5  ">
                    <AppHandledInput
                      name="email"
                      inputProps={{
                        id: 'email'
                      }}
                      type="email"
                      control={control}
                      isInvalid={Boolean(errors.email?.message)}
                      errors={errors}
                      size="sm"
                      className="text-black w-full"
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
                      placeholder={inputPlaceholderText(dictionary.az.email)}
                      required
                      IconElement={() => (
                        <BsEnvelopeFill
                          size={16}
                          color={errors.email?.message ? '#f31260' : ''}
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      )}
                    />
                  </div>
                  {showAlert && (
                    <div
                      className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                      role="alert"
                    >
                      <span className="font-medium">
                        {dictionary.az.successTxt}!
                      </span>{' '}
                      {dictionary.az.newPswrdSentToEmail}
                    </div>
                  )}
                  <Button
                    size="md"
                    isLoading={isSubmitting}
                    className="w-full bg-black  text-white border"
                    type="submit"
                  >
                    {dictionary.az.sendPswrdToEmail}
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
