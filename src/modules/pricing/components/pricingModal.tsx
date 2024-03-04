import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react';
// import { dictionary } from '@/utils/constants/dictionary';
import { useTranslation } from 'react-i18next';

interface IPricingModal {
  isOpen: boolean;
  onOpenChange: () => void;
  onOkFunction: () => void;
  loading: boolean;
}

function PricingModal({
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
        className="centerModalOnMobile"
        onOpenChange={onOpenChange}
        hideCloseButton
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-row items-center gap-1">
                {t('verification')}
              </ModalHeader>
              <ModalBody className="scrollBar overflow-y-scroll">
                {t('resetPackageConfirmation')}
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-black text-white"
                  onPress={onOkFunction}
                  isLoading={loading}
                  variant="bordered"
                >
                  {t('yesTxt')}
                </Button>
                <Button onPress={onClose}>{t('noTxt')}</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default PricingModal;
