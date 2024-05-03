import AppHandledInput from '@/components/forms/input/handled-input';
import { useTranslation } from 'react-i18next';
import { toastOptions } from '@/configs/global-configs';
import { inputPlaceholderText } from '@/utils/constants/texts';
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
import { ISenderInformationItem } from '../types';

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

function SenderInformationAddModal({
  isOpen,
  onOpenChange,
  reloadData
}: IModalProps) {
  const { t } = useTranslation();

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm<ISenderInformationItem>({
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
  const onSubmit = async (data: ISenderInformationItem) => {
    setLoading(true);
    const payload: Omit<ISenderInformationItem, 'id'> = {
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
                {t('addSenderInformation')}
              </ModalHeader>
              <Divider className="mb-6" />

              <ModalBody>
                <form
                  id="sender-information-add-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col space-y-5"
                >
                  {' '}
                  <div className="flex flex-col gap-5">
                    <AppHandledInput
                      name="senderFullName"
                      inputProps={{
                        id: 'senderFullName'
                      }}
                      type="text"
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText(t('senderFullName'))
                        }
                      }}
                      control={control}
                      isInvalid={Boolean(errors.senderFullName?.message)}
                      errors={errors}
                      size="sm"
                      label={inputPlaceholderText(t('senderFullName'))}
                    />
                  </div>{' '}
                  <div className="flex flex-col gap-5">
                    <AppHandledInput
                      name="senderJobTitle"
                      inputProps={{
                        id: 'senderJobTitle'
                      }}
                      type="text"
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText(t('senderJobTitle'))
                        }
                      }}
                      control={control}
                      isInvalid={Boolean(errors.senderJobTitle?.message)}
                      errors={errors}
                      size="sm"
                      label={inputPlaceholderText(t('senderJobTitle'))}
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    <AppHandledInput
                      name="senderCompany"
                      inputProps={{
                        id: 'senderCompany'
                      }}
                      type="text"
                      control={control}
                      isInvalid={Boolean(errors.senderCompany?.message)}
                      errors={errors}
                      size="sm"
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText(t('senderCompany'))
                        }
                      }}
                      label={inputPlaceholderText(t('senderCompany'))}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    <AppHandledInput
                      name="senderWebsite"
                      inputProps={{
                        id: 'senderWebsite'
                      }}
                      type="text"
                      control={control}
                      isInvalid={Boolean(errors.senderWebsite?.message)}
                      errors={errors}
                      size="sm"
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText(t('senderWebsite'))
                        }
                      }}
                      label={inputPlaceholderText(t('senderWebsite'))}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    <AppHandledInput
                      name="senderPhone"
                      inputProps={{
                        id: 'senderPhone'
                      }}
                      type="text"
                      control={control}
                      isInvalid={Boolean(errors.senderPhone?.message)}
                      errors={errors}
                      size="sm"
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText(t('senderPhone'))
                        }
                      }}
                      label={inputPlaceholderText(t('senderPhone'))}
                      required
                    />
                  </div>
                  <Divider />
                </form>
              </ModalBody>
              <ModalFooter>
                <AppHandledBorderedButton
                  title="Close Modal"
                  aria-label="Close Modal"
                  onPress={onClose}
                >
                  {t('closeBtn')}
                </AppHandledBorderedButton>
                <AppHandledSolidButton
                  title="Add Email"
                  aria-label="Add Email"
                  form="sender-information-add-form"
                  isLoading={loading}
                  type="submit"
                >
                  {t('addBtn')}
                </AppHandledSolidButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default SenderInformationAddModal;
