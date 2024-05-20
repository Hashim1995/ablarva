import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import {
  Divider,
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
function AreYouSureResetPackage({
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
              <ModalHeader className="flex flex-row items-center gap-1 pr-10">
                {t('verification')}
              </ModalHeader>
              <Divider className="mb-6" />

              <ModalBody className="overflow-y-scroll scrollBar">
                {t('resetPackageConfirmation')}
              </ModalBody>
              <ModalFooter>
                <AppHandledBorderedButton
                  title="Close Modal"
                  aria-label="Close Modal"
                  onPress={onClose}
                >
                  {t('noTxt')}
                </AppHandledBorderedButton>
                <AppHandledSolidButton
                  title="Yes"
                  aria-label="Yes"
                  onPress={onOkFunction}
                  isLoading={loading}
                >
                  {t('yesTxt')}
                </AppHandledSolidButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AreYouSureResetPackage;
