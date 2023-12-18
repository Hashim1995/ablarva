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
  Button
} from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { BsQuestionCircleFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

interface IFeedbackModal {
  isOpen: boolean;
  onOpenChange: () => void;
}

export interface IFeedbackModalForm {
  feedbackMessage: string;
}

function FeedbackModal({ isOpen, onOpenChange }: IFeedbackModal) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control
  } = useForm<IFeedbackModalForm>({
    mode: 'onChange'
  });

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: IFeedbackModalForm) => {
    try {
      const res: IGlobalResponseEmpty =
        await AuthService.getInstance().sendFeedback({
          feedbackMessage: data.feedbackMessage
        });
      if (res.isSuccess) {
        onOpenChange();
        dispatch(fetchUserData());
        toast.success('Mesajınız uğurla göndərildi', toastOptions);
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
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Təklif və iradlarınızı bizə bildirin
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col space-y-5"
                >
                  <div className="flex flex-col gap-5  ">
                    <AppHandledInput
                      name="feedbackMessage"
                      inputProps={{
                        id: 'feedbackMessage'
                      }}
                      type="text"
                      className="text-black"
                      control={control}
                      isInvalid={Boolean(errors.feedbackMessage?.message)}
                      errors={errors}
                      size="sm"
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText('Mesaj')
                        }
                      }}
                      placeholder={inputPlaceholderText('Mesaj')}
                      required
                      IconElement={() => (
                        <BsQuestionCircleFill
                          size={16}
                          color={
                            errors.feedbackMessage?.message ? '#f31260' : ''
                          }
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
                      {dictionary.az.send}
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

export default FeedbackModal;
