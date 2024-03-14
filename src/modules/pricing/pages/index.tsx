import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tab,
  Tabs
} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import ChatPricing from '../components/chatPricing';
import AsistanPricing from '../components/asistanPricing';

interface IPricingModal {
  isOpen: boolean;
  onOpenChange: () => void;
}

/**
 * @description Renders the pricing modal. This component displays the pricing modal. ChatPricing and AsistanPricing are components that display the pricing for the chat and assistant features.
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
        className="centerModalOnMobile "
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t('tariffs')}
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col">
                  <Tabs
                    className="w-full"
                    variant="underlined"
                    classNames={{
                      tabList: 'w-full'
                    }}
                    aria-label="Options"
                  >
                    <Tab key="chat" title={t('chat')}>
                      <ChatPricing />
                    </Tab>
                    <Tab key="assistant" title={t('assistant')}>
                      <AsistanPricing />
                    </Tab>
                    <Tab isDisabled key="catalyst" title={t('catalyst')}>
                      {t('catalyst')}
                    </Tab>
                  </Tabs>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>{t('closeBtn')}</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default PricingModal;
