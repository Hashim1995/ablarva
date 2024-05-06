import { useTranslation } from 'react-i18next';
import { toastOptions } from '@/configs/global-configs';
import { selectPlaceholderText } from '@/utils/constants/texts';
import { inputValidationText } from '@/utils/constants/validations';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Divider
} from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { EmaSenderInformationService } from '@/services/ema/ema-sender-information-services';
import { toast } from 'react-toastify';
import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import gmail from '@assets/icons/gmail.svg';
import amazon from '@assets/icons/amazon.svg';
import microsoft from '@assets/icons/microsoft.svg';

import AppHandledSelect from '@/components/forms/select/handled-select';
import { industriesOptions } from '@/utils/constants/options';
import { BsQuestionCircleFill } from 'react-icons/bs';

interface IModalProps {
  isOpen: boolean;
  reloadData: () => void;
  onOpenChange: () => void;
}

/**
 * Renders the add email modal. This modal allows the user to add a new email to the email list.
 * @param props.isOpen The state of the modal.
 * @param props.reloadData The function to reload the email list.
 * @param props.onOpenChange The function to change the state of the modal.
 * @returns The rendered add email modal.
 */

function ConnectMailsModal({ isOpen, onOpenChange, reloadData }: IModalProps) {
  const { t } = useTranslation();

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm<any>({
    mode: 'onChange'
  });

  const [loading, setLoading] = useState<boolean>(false);
  /**
   * Submits the form. It adds a new email to the email list.
   * @param data The email to be added.
   * @async The function is asynchronous.
   * @throws The function throws an error if it encounters an error.
   * @returns The result of the form submission.
   */
  const onSubmit = async (data: any) => {
    setLoading(true);
    const payload: Omit<any, 'id'> = {
      senderCompany: data?.senderCompany,
      senderFullName: data?.senderFullName,
      senderJobTitle: data?.senderJobTitle,
      senderPhone: data?.senderPhone,
      senderWebsite: data?.senderWebsite
    };
    try {
      const res =
        await EmaSenderInformationService.getInstance().createSenderInformation(
          payload
        );
      if (res.isSuccess) {
        onOpenChange();
        toast.success(t('successTxt'), toastOptions);
        reloadData();
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

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
              <ModalHeader className="flex flex-col gap-1 pr-10 text-default-800 dark:text-white">
                {t('connectNewMail')}
              </ModalHeader>
              <Divider className="mb-6" />

              <ModalBody>
                <form
                  id="sender-information-add-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col space-y-5"
                >
                  <div className="flex flex-col gap-5">
                    <AppHandledSelect
                      name="sender"
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText(t('sender'))
                        }
                      }}
                      isInvalid={Boolean(errors.sender?.message)}
                      selectProps={{
                        id: 'sender'
                      }}
                      control={control}
                      label={selectPlaceholderText(t('sender'))}
                      // className="app-select text-base sm:text-xl"
                      options={industriesOptions}
                      errors={errors}
                    />
                  </div>
                  <p className="clear-both text-default-800 text-left text-sm dark:text-white">
                    <BsQuestionCircleFill
                      size={26}
                      color="orange"
                      className="float-left mr-2"
                    />
                    {t('connectNewMailModalText')}
                  </p>

                  <Divider />
                </form>
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <AppHandledBorderedButton
                  title="Close Modal"
                  aria-label="Close Modal"
                  onPress={onClose}
                >
                  {t('closeBtn')}
                </AppHandledBorderedButton>
                <div className="flex gap-2">
                  <AppHandledSolidButton
                    title="Add Email"
                    aria-label="Add Email"
                    form="sender-information-add-form"
                    isLoading={loading}
                    type="submit"
                  >
                    <img className="h-5" alt="gmail" src={gmail} />
                    {t('google')}
                  </AppHandledSolidButton>
                  <AppHandledSolidButton
                    title="Add Email"
                    aria-label="Add Email"
                    form="sender-information-add-form"
                    isLoading={loading}
                    type="submit"
                  >
                    <img className="h-5" alt="gmail" src={microsoft} />
                    {t('microsoft')}
                  </AppHandledSolidButton>
                  <AppHandledSolidButton
                    title="Add Email"
                    aria-label="Add Email"
                    form="sender-information-add-form"
                    isLoading={loading}
                    type="submit"
                  >
                    <img className="h-5" alt="gmail" src={amazon} />
                    {t('aws')}
                  </AppHandledSolidButton>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ConnectMailsModal;
