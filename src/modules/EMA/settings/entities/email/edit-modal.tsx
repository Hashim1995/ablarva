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
  Button,
  Divider
} from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { EmaSettingsService } from '@/services/ema/ema-settings-services';
import { IEmailItemUpdate } from './types';

interface IEditEmailModal {
  isOpen: boolean;
  reloadData: () => void;
  onOpenChange: () => void;
  selectedItem: IEmailItemUpdate;
}

/**
 * Renders the edit email modal. This modal allows the user to edit an existing email in the email list.
 * @param props.isOpen The state of the modal.
 * @param props.reloadData The function to reload the email list.
 * @param props.onOpenChange The function to change the state of the modal.
 * @param props.selectedItem The selected email item to be edited.
 * @returns The rendered edit email modal.
 */
function EditEmailModal({
  isOpen,
  onOpenChange,
  selectedItem,
  reloadData
}: IEditEmailModal) {
  const { t } = useTranslation();

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm<IEmailItemUpdate>({
    mode: 'onChange',
    defaultValues: {
      emailAddress: selectedItem?.emailAddress,
      name: selectedItem?.name,
      surname: selectedItem?.surname
    }
  });

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: IEmailItemUpdate) => {
    setLoading(true);
    const payload: IEmailItemUpdate = {
      id: selectedItem?.id,
      emailAddress: data?.emailAddress,
      name: data?.name,
      surname: data?.surname
    };
    try {
      const res = await EmaSettingsService.getInstance().updateEmailItem(
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
              <ModalHeader className="flex flex-col gap-1">
                {t('editAnyData')}
              </ModalHeader>
              <ModalBody>
                <form
                  id="edit-email-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col space-y-5"
                >
                  <div className="flex flex-col gap-5">
                    <AppHandledInput
                      name="name"
                      inputProps={{
                        id: 'name'
                      }}
                      type="text"
                      control={control}
                      isInvalid={Boolean(errors.name?.message)}
                      errors={errors}
                      size="sm"
                      label={inputPlaceholderText(t('name'))}
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    <AppHandledInput
                      name="surname"
                      inputProps={{
                        id: 'surname'
                      }}
                      type="text"
                      control={control}
                      isInvalid={Boolean(errors.surname?.message)}
                      errors={errors}
                      size="sm"
                      label={inputPlaceholderText(t('surname'))}
                    />
                  </div>{' '}
                  <div className="flex flex-col gap-5">
                    <AppHandledInput
                      name="emailAddress"
                      inputProps={{
                        id: 'emailAddress'
                      }}
                      type="email"
                      control={control}
                      isInvalid={Boolean(errors.emailAddress?.message)}
                      errors={errors}
                      size="sm"
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText(t('mailAddress'))
                        }
                      }}
                      label={inputPlaceholderText(t('mailAddress'))}
                      required
                    />
                  </div>
                  <Divider />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  title="Close Modal"
                  aria-label="Close Modal"
                  onPress={onClose}
                >
                  {t('closeBtn')}
                </Button>
                <Button
                  form="edit-email-form"
                  title="Edit Email"
                  aria-label="Edit Email"
                  isLoading={loading}
                  type="submit"
                >
                  {t('editBtn')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default EditEmailModal;
