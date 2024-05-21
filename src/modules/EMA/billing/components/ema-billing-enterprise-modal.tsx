import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import AppHandledInput from '@/components/forms/input/handled-input';
import { toastOptions } from '@/configs/global-configs';
import { RootState } from '@/redux/store';
import { EmaBillingServices } from '@/services/ema/ema-billing-services';
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
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { IEmaBillingEnterpriseForm } from '../types';

interface IProps {
  isOpen: boolean;
  onOpenChange: () => void;
  enterpriseOnClose: () => void;
}

function EmaBillingEnterpriseModal({
  isOpen,
  enterpriseOnClose,
  onOpenChange
}: IProps) {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state?.user);
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control
  } = useForm<IEmaBillingEnterpriseForm>({
    mode: 'onChange',
    defaultValues: {
      name:
        user?.firstName && user?.lastName
          ? `${user?.firstName} ${user?.lastName}`
          : '',
      email: user?.email || '',
      telephoneNumber: '',
      companyName: '',
      employeeCount: ''
    }
  });

  async function onSubmit(data: IEmaBillingEnterpriseForm) {
    try {
      const res = await EmaBillingServices.getInstance().sendEnterpriseRequest(
        data
      );
      if (res?.isSuccess) {
        toast.success(t('successTxt'), toastOptions);
        enterpriseOnClose();
      }
    } catch (err) {
      console.log(err);
    }
  }
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
                      name="name"
                      inputProps={{
                        id: 'name'
                      }}
                      type="text"
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText(t('name'))
                        }
                      }}
                      control={control}
                      isInvalid={Boolean(errors.name?.message)}
                      errors={errors}
                      size="sm"
                      label={inputPlaceholderText(t('name'))}
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    <AppHandledInput
                      name="email"
                      inputProps={{
                        id: 'email'
                      }}
                      type="text"
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText(t('email'))
                        }
                      }}
                      control={control}
                      isInvalid={Boolean(errors.email?.message)}
                      errors={errors}
                      size="sm"
                      label={inputPlaceholderText(t('email'))}
                    />
                  </div>{' '}
                  <div className="flex flex-col gap-5">
                    <AppHandledInput
                      name="telephoneNumber"
                      inputProps={{
                        id: 'telephoneNumber'
                      }}
                      type="text"
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText(t('telephoneNumber'))
                        }
                      }}
                      control={control}
                      isInvalid={Boolean(errors.telephoneNumber?.message)}
                      errors={errors}
                      size="sm"
                      label={inputPlaceholderText(t('telephoneNumber'))}
                    />
                  </div>{' '}
                  <div className="flex flex-col gap-5">
                    <AppHandledInput
                      name="companyName"
                      inputProps={{
                        id: 'companyName'
                      }}
                      type="text"
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText(t('companyName'))
                        }
                      }}
                      control={control}
                      isInvalid={Boolean(errors.companyName?.message)}
                      errors={errors}
                      size="sm"
                      label={inputPlaceholderText(t('companyName'))}
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    <AppHandledInput
                      name="employeeCount"
                      inputProps={{
                        id: 'employeeCount'
                      }}
                      type="text"
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText(t('employeeCount'))
                        }
                      }}
                      control={control}
                      isInvalid={Boolean(errors.employeeCount?.message)}
                      errors={errors}
                      size="sm"
                      label={inputPlaceholderText(t('employeeCount'))}
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
                  isLoading={isSubmitting}
                  type="submit"
                >
                  {t('send')}
                </AppHandledSolidButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default EmaBillingEnterpriseModal;
