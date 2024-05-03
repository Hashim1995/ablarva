import { useTranslation } from 'react-i18next';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  User,
  Avatar,
  Chip
} from '@nextui-org/react';
import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';

interface ILeadViewModal {
  isOpen: boolean;
  onOpenChange: () => void;
}

/**
 * Renders the add email modal. This modal allows the user to add a new email to the email list.
 * @param props.isOpen The state of the modal.
 * @param props.reloadData The function to reload the email list.
 * @param props.onOpenChange The function to change the state of the modal.
 * @returns The rendered add email modal.
 */
function LeadViewModal({ isOpen, onOpenChange }: ILeadViewModal) {
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
              <ModalHeader className="flex flex-col gap-1 text-default-800 dark:text-white">
                Jane Doe
              </ModalHeader>
              <ModalBody className="text-default-800 dark:text-white">
                <div className="flex flex-col">
                  <div className="flex items-center border-divider pb-1 border-b-1 h-16">
                    <User
                      name="Jane Doe"
                      description="Product Designer"
                      classNames={{
                        description: 'text-[13px]'
                      }}
                      avatarProps={{
                        size: 'lg',
                        src: 'https://i.pravatar.cc/150?u=a04258114e29026702d'
                      }}
                      className="text-default-800 text-md dark:text-white"
                    />
                  </div>
                  <div className="flex items-center border-divider pb-1 border-b-1 h-16 text-sm">
                    <p className="mb-0">
                      Lead Information
                      <br />
                      Project Manager @Professional IT
                    </p>
                  </div>
                  <div className="flex items-center border-divider pb-1 border-b-1 h-16">
                    <Chip
                      variant="bordered"
                      className="p-2 h-10"
                      size="md"
                      avatar={
                        <Avatar
                          size="lg"
                          name="JW"
                          src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
                        />
                      }
                    >
                      <a
                        className="text-blue-400"
                        href="https://www.linkedin.com/in/sadig-latifli/"
                      >
                        https://www.linkedin.com/in/sadig-latifli/
                      </a>
                    </Chip>
                  </div>
                  <div className="flex items-center border-divider pb-1 border-b-1 h-16">
                    <Chip variant="bordered" className="p-2 h-10" size="md">
                      <a
                        className="text-blue-400"
                        href=" https://www.aizade.com"
                      >
                        https://www.aizade.com
                      </a>
                    </Chip>
                  </div>
                  <div className="flex items-center border-divider pb-1 border-b-1">
                    <div className="flex flex-wrap gap-2 py-2">
                      <Chip variant="bordered" className="h-7" size="sm">
                        Information technologies
                      </Chip>{' '}
                      <Chip variant="bordered" className="h-7" size="sm">
                        Marketing
                      </Chip>{' '}
                      <Chip variant="bordered" className="h-7" size="sm">
                        Sales
                      </Chip>{' '}
                      <Chip variant="bordered" className="h-7" size="sm">
                        Machine learning
                      </Chip>{' '}
                      <Chip variant="bordered" className="h-7" size="sm">
                        Alternative Energy
                      </Chip>
                    </div>
                  </div>
                  <div className="flex items-center border-divider pb-1 h-16 text-sm">
                    <p className="mb-0">Azerbaijan</p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <AppHandledBorderedButton
                  buttonProps={{
                    title: 'Close Modal',
                    'aria-label': 'Close Modal'
                  }}
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

export default LeadViewModal;
