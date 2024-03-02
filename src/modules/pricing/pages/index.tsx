import { dictionary } from '@/utils/constants/dictionary';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
  Tab,
  Tabs
} from '@nextui-org/react';

interface IPricingModal {
  isOpen: boolean;
  onOpenChange: () => void;
}

function PricingModal({ isOpen, onOpenChange }: IPricingModal) {
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
                {dictionary?.az?.tariffs}
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col">
                  <Tabs aria-label="Options">
                    <Tab key="chat" title={dictionary?.az?.chat}>
                      <Card>
                        <CardBody>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </CardBody>
                      </Card>
                    </Tab>
                    <Tab key="assistan" title={dictionary?.az?.assistan}>
                      <Card>
                        <CardBody>
                          Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat. Duis aute irure dolor in reprehenderit in
                          voluptate velit esse cillum dolore eu fugiat nulla
                          pariatur.
                        </CardBody>
                      </Card>
                    </Tab>
                    <Tab key="kataliz" title={dictionary?.az?.kataliz}>
                      <Card>
                        <CardBody>
                          Excepteur sint occaecat cupidatat non proident, sunt
                          in culpa qui officia deserunt mollit anim id est
                          laborum.
                        </CardBody>
                      </Card>
                    </Tab>
                  </Tabs>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>{dictionary.az.closeBtn}</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default PricingModal;
