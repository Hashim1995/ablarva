import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Divider
} from '@nextui-org/react';
import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import AppHandledInput from '@/components/forms/input/handled-input';
import { inputValidationText } from '@/utils/constants/validations';
import { useForm } from 'react-hook-form';
import { inputPlaceholderText } from '@/utils/constants/texts';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';

interface IProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

function LeadsAddModal({ isOpen, onOpenChange }: IProps) {
  const { t } = useTranslation();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control
  } = useForm<{ groupName: string }>({
    mode: 'onChange'
  });

  async function onSubmit() {
    console.log('object');
  }
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
                {t('add')}
              </ModalHeader>
              <Divider className="mb-6" />

              <ModalBody className="text-default-800 dark:text-white">
                <form
                  id="sender-information-add-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col space-y-5"
                >
                  {' '}
                  <div className="flex flex-col gap-5">
                    <AppHandledInput
                      name="groupName"
                      inputProps={{
                        id: 'groupName'
                      }}
                      type="text"
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText(t('groupName'))
                        }
                      }}
                      control={control}
                      isInvalid={Boolean(errors.groupName?.message)}
                      errors={errors}
                      size="sm"
                      label={inputPlaceholderText(t('groupName'))}
                    />
                  </div>{' '}
                  <Divider />
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
                  title="Upload Lead"
                  aria-label="Upload Lead"
                  form="sender-information-add-form"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  {t('addBtn')}
                </AppHandledSolidButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default LeadsAddModal;
