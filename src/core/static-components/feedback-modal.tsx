/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unstable-nested-components */
import { toastOptions } from '@/configs/global-configs';
import { IGlobalResponseEmpty } from '@/models/common';
import { fetchUserData } from '@/redux/auth/auth-slice';
import { AppDispatch } from '@/redux/store';
import { AuthService } from '@/services/auth-services/auth-services';
import { dictionary } from '@/utils/constants/dictionary';
import { inputPlaceholderText } from '@/utils/constants/texts';
// import { inputPlaceholderText } from '@/utils/constants/texts';
import { inputValidationText } from '@/utils/constants/validations';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ButtonGroup,
  ModalFooter,
  Textarea,
  // Tooltip,
  Button,
  useDisclosure
} from '@nextui-org/react';
import { useForm } from 'react-hook-form';
// import { BsQuestionCircleFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import InstructionModal from './instruction-modal';

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
    register,
    formState: { errors, isSubmitting }
  } = useForm<IFeedbackModalForm>({
    mode: 'onChange'
  });

  const dispatch = useDispatch<AppDispatch>();
  const {
    isOpen: instructionIsOpen,
    onOpen: instructionOnOpen,
    onOpenChange: instructionOnOpenChange
  } = useDisclosure();

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
        className="centerModalOnMobile"
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
                    <Textarea
                      {...register('feedbackMessage', {
                        required: {
                          value: true,
                          message: inputValidationText('Mesaj')
                        }
                      })}
                      variant="bordered"
                      fullWidth
                      isRequired
                      label={inputPlaceholderText('Mesaj')}
                      classNames={{
                        label: 'text-md font-normal',
                        innerWrapper: ' flex items-center',
                        inputWrapper: [
                          'relative',
                          'w-full',
                          'inline',
                          'inline-flex',
                          'tap-highlight-transparent',
                          'shadow-sm',
                          'min-h-unit-8',
                          'flex-col',
                          'items-start',
                          'justify-center',
                          'gap-0',
                          'border',
                          ' px-3',
                          'py-1',
                          'rounded-md',
                          'data-[hover=true]:border-[#292D32]',
                          'group-data-[focus=true]:border-gray-200',
                          'border-[#292D32]',
                          'transition-background',
                          '!duration-150 ',
                          'transition-colors',
                          '',
                          'motion-reduce:transition-none '
                        ],
                        input: ' font-light '
                      }}
                      minRows={5}
                      rows={5}
                      className="flex-1 "
                      errorMessage={
                        (errors.feedbackMessage &&
                          errors.feedbackMessage?.message) ||
                        ''
                      }
                      isInvalid={Boolean(errors.feedbackMessage)}
                      maxRows={5}
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
                <Button variant="bordered" onClick={instructionOnOpen}>
                  Təlimat
                </Button>
                <Button variant="bordered" onPress={onClose}>
                  {dictionary.az.closeBtn}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {instructionIsOpen && (
        <InstructionModal
          onOpenChange={instructionOnOpenChange}
          isOpen={instructionIsOpen}
        />
      )}
    </div>
  );
}

export default FeedbackModal;
