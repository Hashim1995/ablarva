/* eslint-disable no-unused-vars */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Divider
} from '@nextui-org/react';
import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';

import { t } from 'i18next';
import { FcHighPriority } from 'react-icons/fc';

interface IModalProps {
  isOpen: boolean;
  onRemove: (e?: any) => void;
  isLoading: boolean;
  onOpenChange: () => void;
}

function AppHandledRemoveModal({
  isOpen,
  onOpenChange,
  isLoading,
  onRemove
}: IModalProps) {
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
                {t('deleteConfirmationPrompt')}
              </ModalHeader>
              <Divider className="mb-6" />

              <ModalBody className="text-default-800 dark:text-white">
                <div className="flex flex-col items-center gap-6">
                  <FcHighPriority size={70} />
                </div>
                <h1 className="text-3xl">{t('removeModalTitle')}</h1>
                <h1 className="text-sm">{t('removeModalDescription')}</h1>
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
                  title="Add Email"
                  aria-label="Add Email"
                  form="sender-information-add-form"
                  isLoading={isLoading}
                  onClick={onRemove}
                >
                  {t('delete')}
                </AppHandledSolidButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AppHandledRemoveModal;
