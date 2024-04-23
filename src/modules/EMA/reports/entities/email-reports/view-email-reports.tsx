import { useTranslation } from 'react-i18next';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@nextui-org/react';

import { IEmailReportItem } from './types';

interface IViewEmailReportModal {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedItem: IEmailReportItem;
}

/**
 * @description Renders the email report modal. This component displays the user's email report modal.
 * @param isOpen The modal's open state.
 * @param onOpenChange The modal's open state change handler.
 * @param selectedItem The selected item to view.
 * @returns The rendered email report modal.
 */
function ViewEmailReportModal({
  isOpen,
  onOpenChange,
  selectedItem
}: IViewEmailReportModal) {
  const { t } = useTranslation();

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
              <ModalHeader className="flex flex-col gap-1">
                {t('detailedView')}
              </ModalHeader>
              <ModalBody>
                <p>{selectedItem?.emailBody}</p>
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

export default ViewEmailReportModal;
