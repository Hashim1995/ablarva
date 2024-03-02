import { dictionary } from '@/utils/constants/dictionary';
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
            <ModalHeader className="flex flex-col gap-1">Təlimat</ModalHeader>
            <ModalBody>
              <iframe
                title="Təlimat"
                height="400"
                width="100%"
                allow="fullscreen;"
                src="https://www.youtube.com/embed/tgbNymZ7vqY"
              />
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose}>{dictionary.az.closeBtn}</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default InstructionModal;
