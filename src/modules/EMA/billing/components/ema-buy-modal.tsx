import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Divider
} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import EmaBillingPackages from './ema-billing-packages';

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
              <ModalHeader className="flex flex-col gap-1 pr-10 text-default-800 dar:text-white">
                {t('tariffs')}
              </ModalHeader>
              <Divider className="mb-6" />

              <ModalBody>
                <div className="flex flex-col w-full">
                  <EmaBillingPackages />
                </div>
              </ModalBody>
              <ModalFooter>
                <AppHandledBorderedButton
                  title="Close Modal"
                  aria-label="Close Modal"
                  onPress={onClose}
                >
                  {t('closeBtn')}
                </AppHandledBorderedButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default PricingModal;
