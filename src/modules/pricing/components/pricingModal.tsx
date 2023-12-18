import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react';
import { dictionary } from '@/utils/constants/dictionary';

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
                Təstiqləmə
              </ModalHeader>
              <ModalBody className="scrollBar overflow-y-scroll">
                Əməliyyatı yerinə yetirmək istədiyinizə əminsinizmi?
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-black text-white"
                  onPress={onOkFunction}
                  isLoading={loading}
                >
                  {dictionary.az.yesTxt}
                </Button>
                <Button variant="bordered" onPress={onClose}>
                  {dictionary.az.noTxt}
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
