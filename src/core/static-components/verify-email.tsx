/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unstable-nested-components */
import AppHandledInput from '@/components/forms/input/handled-input';
import { toastOptions } from '@/configs/global-configs';
import { IGlobalResponseEmpty } from '@/models/common';
import { IUserLoggedData } from '@/models/user';
import { setUser } from '@/redux/auth/auth-slice';
import {
  AuthService,
  IGetMeResponse
} from '@/services/auth-services/auth-services';
import { dictionary } from '@/utils/constants/dictionary';
import { inputPlaceholderText } from '@/utils/constants/texts';
import { inputValidationText } from '@/utils/constants/validations';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ButtonGroup,
  ModalFooter,
  Button
} from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsFillKeyFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

interface IVerifyEmail {
  isOpen: boolean;
  onOpenChange: () => void;
}

export interface IVerifyEmailForm {
  code?: string | number;
}

function VerifyEmail({ isOpen, onOpenChange }: IVerifyEmail) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control
  } = useForm<IVerifyEmailForm>({
    mode: 'onChange'
  });

  const [loading, setLoading] = useState<boolean>(false);
  const disptach = useDispatch();

  const getMe = async () => {
    try {
      const res: IGetMeResponse = await AuthService.getInstance().getMe();
      const userSlicePayload: IUserLoggedData = res.data;
      disptach(setUser(userSlicePayload));
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data: IVerifyEmailForm) => {
    try {
      const res: IGlobalResponseEmpty =
        await AuthService.getInstance().verifyEmail({
          code: Number(data.code)
        });
      if (res.isSuccess) {
        onOpenChange();
        getMe();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const resendVerificationCode = async () => {
    setLoading(true);
    try {
      const res = await AuthService.getInstance().resendVerificationCode();
      if (res.isSuccess) {
        toast.success(dictionary.az.verifyCodeSentSuccesfully, toastOptions);
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
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {dictionary.az.emailVerify}
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col space-y-5"
                >
                  <div className="flex flex-col gap-5  ">
                    <AppHandledInput
                      name="code"
                      inputProps={{
                        id: 'code'
                      }}
                      type="number"
                      className="text-black"
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
                      placeholder={inputPlaceholderText(dictionary.az.code)}
                      required
                      IconElement={() => (
                        <BsFillKeyFill
                          size={16}
                          color={errors.code?.message ? '#f31260' : ''}
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        />
                      )}
                    />
                  </div>

                  <ButtonGroup>
                    <Button
                      size="md"
                      isLoading={isSubmitting}
                      className="w-full bg-black  text-white border"
                      type="submit"
                    >
                      {dictionary.az.approve}
                    </Button>
                    <Button
                      size="md"
                      onClick={resendVerificationCode}
                      isLoading={loading}
                      className="w-full bg-black  text-white border"
                      type="button"
                    >
                      {dictionary.az.sendCodeToEmail}
                    </Button>
                  </ButtonGroup>
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

export default VerifyEmail;
