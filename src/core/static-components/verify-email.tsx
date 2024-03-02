/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unstable-nested-components */
import AppHandledInput from '@/components/forms/input/handled-input';
import { toastOptions } from '@/configs/global-configs';
import { IGlobalResponseEmpty } from '@/models/common';
import { fetchUserData } from '@/redux/auth/auth-slice';
import { AppDispatch } from '@/redux/store';
import { AuthService } from '@/services/auth-services/auth-services';
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
  Button,
  Divider
} from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsQuestionCircleFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'usehooks-ts';

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
  const dispatch = useDispatch<AppDispatch>();
  const matches = useMediaQuery('(max-width: 468px)');

  const onSubmit = async (data: IVerifyEmailForm) => {
    try {
      const res: IGlobalResponseEmpty =
        await AuthService.getInstance().verifyEmail({
          code: Number(data.code)
        });
      if (res.isSuccess) {
        onOpenChange();
        toast.success('Email ünvanınız uğurla təsdiqləndi', toastOptions);
        dispatch(fetchUserData());
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
        className="centerModalOnMobile"
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
                  </div>

                  <ButtonGroup>
                    <Button
                      size={matches ? 'sm' : 'md'}
                      isLoading={isSubmitting}
                      variant="bordered"
                      type="submit"
                    >
                      {dictionary.az.approve}
                    </Button>
                    <Button
                      size={matches ? 'sm' : 'md'}
                      onClick={resendVerificationCode}
                      isLoading={loading}
                      variant="bordered"
                      type="button"
                    >
                      {dictionary.az.sendCodeToEmail}
                    </Button>
                  </ButtonGroup>
                  <Divider />
                  <p className="text-sm text-left clear-both    ">
                    <BsQuestionCircleFill
                      size={26}
                      color="orange"
                      className="float-left mr-2"
                    />
                    Email ünvanızızı təsdiqlədiyiniz təqdirdə, balansınıza,
                    bizim tərəfimizdən{' '}
                    <span className="font-semibold"> 300 Sadə</span> və
                    <span className="font-semibold"> 100 Premium</span> sorğu
                    imkanı əlavə oluncaqdır
                  </p>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>{dictionary.az.closeBtn}</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default VerifyEmail;
