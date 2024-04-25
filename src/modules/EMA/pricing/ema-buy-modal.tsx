import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import EmaPricing from './ema-pricing';

interface IPricingModal {
  isOpen: boolean;
  onOpenChange: () => void;
}

/**
 * @description Renders the pricing modal. This component displays the pricing modal. EmaPricing is component that display the pricing for the chat and assistant features.
 * @param isOpen The modal's open state.
 * @param onOpenChange The modal's open state change handler.
 * @returns The rendered pricing modal.
 */
function PricingModal({ isOpen, onOpenChange }: IPricingModal) {
  const { t } = useTranslation();

  return (
    <div>
      <Modal
        size="5xl"
        isDismissable={false}
        backdrop="opaque"
        className="centerModalOnMobile"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-default-900 dar:text-white">
                {t('tariffs')}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col w-full">
                  <EmaPricing />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  title="Close Modal"
                  aria-label="Close Modal"
                  onPress={onClose}
                >
                  {t('closeBtn')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default PricingModal;
