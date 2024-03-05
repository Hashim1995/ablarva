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
                    <Tab key="assistan" title={t('assistan')}>
                      <AsistanPricing />
                    </Tab>
                    <Tab isDisabled key="kataliz" title={t('kataliz')}>
                      {t('kataliz')}
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
