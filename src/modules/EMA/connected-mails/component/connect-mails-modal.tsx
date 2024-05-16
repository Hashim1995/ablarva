/* eslint-disable no-unused-vars */
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
import { toast } from 'react-toastify';
import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import gmail from '@assets/icons/gmail.svg';
import amazon from '@assets/icons/amazon.svg';
import microsoft from '@assets/icons/microsoft.svg';
import AppHandledSelect from '@/components/forms/select/handled-select';
import { BsQuestionCircleFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { EmaConnectedMailsService } from '@/services/ema/ema-connected-mails-services';
import { IConnectedMailGenerateUrl } from '../types';

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

  const { senderInformationList } = useSelector(
    (state: RootState) => state.ema
  );

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    const payload: IConnectedMailGenerateUrl = {
      senderInfoId: Number(data?.sender),
      connectionType: 1
    };
    try {
      const res = await EmaConnectedMailsService.getInstance().generateUrl(
        payload
      );
      if (res.isSuccess) {
        console.log(res);
        window.location.href = res?.data?.redirectUrl;
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
          {() => (
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
                      options={senderInformationList?.data}
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
              <ModalFooter className="flex justify-between gap-2">
                <AppHandledBorderedButton
                  title="Add Email"
                  aria-label="Add Email"
                  form="sender-information-add-form"
                  isLoading={loading}
                  type="submit"
                  className="w-72"
                >
                  <img className="h-5" alt="gmail" src={gmail} />
                  {t('google')}
                </AppHandledBorderedButton>
                <AppHandledBorderedButton
                  title="Add Email"
                  aria-label="Add Email"
                  isDisabled
                  form="sender-information-add-form"
                  type="submit"
                  className="w-72"
                >
                  <img className="h-5" alt="gmail" src={microsoft} />
                  {t('microsoft')}
                </AppHandledBorderedButton>
                <AppHandledBorderedButton
                  title="Add Email"
                  aria-label="Add Email"
                  isDisabled
                  form="sender-information-add-form"
                  type="submit"
                  className="w-72"
                >
                  <img className="h-5" alt="gmail" src={amazon} />
                  {t('aws')}
                </AppHandledBorderedButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ConnectMailsModal;
