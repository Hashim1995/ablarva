import { useTranslation } from 'react-i18next';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@nextui-org/react';

interface IInstructionModal {
  isOpen: boolean;
  onOpenChange: () => void;
}
function InstructionModal({ isOpen, onOpenChange }: IInstructionModal) {
  const { t } = useTranslation();

  return (
    <Modal
      size="4xl"
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
              {t('instructionText')}
            </ModalHeader>
            <ModalBody>
              <iframe
                title={t('instructionText')}
                height="400"
                width="100%"
                allow="fullscreen;"
                src="https://www.youtube.com/embed/tgbNymZ7vqY"
              />
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose}>{t('closeBtn')}</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default InstructionModal;
