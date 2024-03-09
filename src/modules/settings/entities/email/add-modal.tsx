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
import { IEmailItemCreate } from './types';

interface IAddEmailModal {
  isOpen: boolean;
  reloadData: () => void;
  onOpenChange: () => void;
}

function AddEmailModal({ isOpen, onOpenChange, reloadData }: IAddEmailModal) {
  const { t } = useTranslation();

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm<IEmailItemCreate>({
    mode: 'onChange'
  });

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: IEmailItemCreate) => {
    setLoading(true);
    const payload: IEmailItemCreate = {
      emailAddress: data?.emailAddress
    };
    try {
      const res = await SettingsService.getInstance().createEmailItem(payload);
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
                {t('addAnyData')}
              </ModalHeader>
              <ModalBody>
                <form
                  id="add-email-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col space-y-5"
                >
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
                <Button form="add-email-form" isLoading={loading} type="submit">
                  {t('addBtn')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AddEmailModal;
