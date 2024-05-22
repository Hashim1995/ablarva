import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react';
import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import AppHandledInput from '@/components/forms/input/handled-input';
import { inputValidationText } from '@/utils/constants/validations';
import { useForm } from 'react-hook-form';
import { inputPlaceholderText } from '@/utils/constants/texts';
import { SiMicrosoftexcel } from 'react-icons/si';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import { useState } from 'react';
import { BsQuestionCircleFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { toastOptions } from '@/configs/global-configs';
import { EmaLeadsService } from '@/services/ema/ema-leads-services';
import AppHandledDropzone from '@/components/forms/dropzone/app-handled-dropzone';

interface IProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

function LeadsAddModal({ isOpen, onOpenChange }: IProps) {
  const { t } = useTranslation();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control
  } = useForm<{ groupName: string }>({
    mode: 'onChange'
  });

  const [files, setFiles] = useState([]);

  async function onSubmit(data: { groupName: string }) {
    if (files?.length !== 1) {
      toast.error(
        t('uploadAtLeast', {
          dynamicValue: '1'
        }),
        toastOptions
      );
    } else {
      try {
        const payload = new FormData();
        payload.append('groupName', data?.groupName);
        payload.append('csv', files[0]);
        const res = await EmaLeadsService.getInstance().uploadLeads(payload);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <div>
      <Modal
        size="2xl"
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
                {t('addBtn')}
              </ModalHeader>
              <Divider className="mb-6" />

              <ModalBody className="text-default-800 dark:text-white">
                <form
                  id="sender-information-add-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col space-y-5"
                >
                  <div className="flex flex-col gap-5">
                    <AppHandledInput
                      name="groupName"
                      inputProps={{
                        id: 'groupName'
                      }}
                      type="text"
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText(t('groupName'))
                        }
                      }}
                      control={control}
                      isInvalid={Boolean(errors.groupName?.message)}
                      errors={errors}
                      size="sm"
                      label={inputPlaceholderText(t('groupName'))}
                    />
                    <div className="mb-4">
                      <p className="clear-both mb-1 text-default-800 text-left text-sm dark:text-white">
                        <BsQuestionCircleFill
                          size={26}
                          color="orange"
                          className="float-left mr-2"
                        />
                        {t('uploadYourExcelInfoText')}
                      </p>
                      <AppHandledDropzone
                        setFiles={setFiles}
                        files={files}
                        maxLimit={1}
                        multiple={false}
                        accept={{
                          '': [
                            '.csv',
                            '.text/csv',
                            'application/csv',
                            'text/x-csv',
                            'application/x-csv'
                          ]
                        }}
                      />
                    </div>
                    <div>
                      <p className="clear-both mb-1 text-default-800 text-left text-sm dark:text-white">
                        <SiMicrosoftexcel
                          size={26}
                          color="orange"
                          className="float-left mr-2"
                        />
                        {t('exampleCSV')}
                      </p>
                      <Table
                        removeWrapper
                        className="border-collapse text-default-800 dark:text-white overflow-y-auto"
                        aria-label="Example static collection table"
                      >
                        <TableHeader>
                          <TableColumn>{t('email')}</TableColumn>
                          <TableColumn>{t('firstName')}</TableColumn>
                          <TableColumn>{t('lastName')}</TableColumn>
                          <TableColumn>{t('organizationName')}</TableColumn>
                          <TableColumn>{t('jobTitle')}</TableColumn>
                          <TableColumn>{t('website')}</TableColumn>
                          <TableColumn>{t('timeZone')}</TableColumn>
                          <TableColumn>{t('timeZoneOffset')}</TableColumn>
                          <TableColumn>{t('country')}</TableColumn>
                          <TableColumn>{t('linkedin')}</TableColumn>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="border-divider border-b-1">
                            <TableCell>john.doe@example.com</TableCell>
                            <TableCell>John</TableCell>
                            <TableCell>Doe</TableCell>
                            <TableCell>Ablarva</TableCell>
                            <TableCell>Marketing manager</TableCell>
                            <TableCell>ablarva.com</TableCell>
                            <TableCell>UTC</TableCell>
                            <TableCell>+4</TableCell>
                            <TableCell>Germany</TableCell>
                            <TableCell>
                              https://www.linkedin.com/in/johndoe
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
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
                  title="Upload Lead"
                  aria-label="Upload Lead"
                  form="sender-information-add-form"
                  isLoading={isSubmitting}
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

export default LeadsAddModal;
