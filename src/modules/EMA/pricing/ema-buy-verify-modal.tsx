import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react';

import { useTranslation } from 'react-i18next';

interface IPricingModal {
  isOpen: boolean;
  onOpenChange: () => void;
  onOkFunction: () => void;
  loading: boolean;
}

/**
 * @description Renders the pricing modal. This component displays the pricing modal.
 * @param isOpen The modal's open state.
 * @param onOpenChange The modal's open state change handler.
 * @param onOkFunction The function to execute when the user clicks the "Yes" button.
 * @param loading The loading state.
 * @returns The rendered pricing modal.
 */
function BuyVerifyModal({
  isOpen,
  onOpenChange,
  onOkFunction,
  loading
}: IPricingModal) {
  const { t } = useTranslation();

  return (
    <div>
      <Modal
        size="lg"
        backdrop="opaque"
        isOpen={isOpen}
        className="text-default-900 dark:text-white centerModalOnMobile"
        onOpenChange={onOpenChange}
        hideCloseButton
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-row items-center gap-1">
                {t('verification')}
              </ModalHeader>
              <ModalBody className="overflow-y-scroll scrollBar">
                {t('resetPackageConfirmation')}
              </ModalBody>
              <ModalFooter>
                <Button
                  title="Yes"
                  aria-label="Yes"
                  className="text-default-900 dark:text-white"
                  onPress={onOkFunction}
                  isLoading={loading}
                  variant="bordered"
                >
                  {t('yesTxt')}
                </Button>
                <Button
                  title="Close Modal"
                  aria-label="Close Modal"
                  onPress={onClose}
                >
                  {t('noTxt')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default BuyVerifyModal;
