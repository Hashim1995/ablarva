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
import { SettingsService } from '@/services/settings-services/settings-services';
import { IEmailItemUpdate } from './types';

interface IEditEmailModal {
  isOpen: boolean;
  reloadData: () => void;
  onOpenChange: () => void;
  selectedItem: IEmailItemUpdate;
}

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
      const res = await SettingsService.getInstance().updateEmailItem(payload);
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
                  <div className="flex flex-col gap-5  ">
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
                  <div className="flex flex-col gap-5  ">
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
                  <div className="flex flex-col gap-5  ">
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
                <Button onPress={onClose}>{t('closeBtn')}</Button>
                <Button
                  form="edit-email-form"
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
