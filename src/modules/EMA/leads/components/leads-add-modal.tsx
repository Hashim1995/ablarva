/* eslint-disable react/no-unused-prop-types */
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
import {
  inputPlaceholderText,
  selectPlaceholderText
} from '@/utils/constants/texts';
import { SiMicrosoftexcel } from 'react-icons/si';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import { ReactNode, useState } from 'react';
import { BsQuestionCircleFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { toastOptions } from '@/configs/global-configs';
import { EmaLeadsService } from '@/services/ema/ema-leads-services';
import AppHandledDropzone from '@/components/forms/dropzone/app-handled-dropzone';
import AppHandledSelect from '@/components/forms/select/handled-select';
import { setState } from '@/models/common';

interface IProps {
  isOpen: boolean;
  onOpenChange: () => void;
  addOnClose: () => void;
  setReFetch: setState<boolean>;
}

type DynamicFields = Record<string, string>;

interface FormData {
  groupName: string;
}

type FullFormData = FormData & DynamicFields & { queueIdentifier?: number };

function LeadsAddModal({
  isOpen,
  onOpenChange,
  addOnClose,
  setReFetch
}: IProps) {
  const { t } = useTranslation();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control
  } = useForm<FullFormData>({
    mode: 'onChange'
  });

  const [files, setFiles] = useState([]);
  const [currentQueue, setCurrentQueue] = useState<number>();

  const [supportedColumns, setSupportedColumns] = useState<
    { value: string; label: string; isRequired: boolean }[]
  >([]);
  const [possibleColumns, setPossibleColumns] = useState<
    { value: string; label: string; isRequired: boolean }[]
  >([]);
  const [step, setStep] = useState<number>(1);

  async function onSubmit(data: FullFormData) {
    const { groupName, ...dynamicFields } = data;

    if (files?.length !== 1) {
      toast.error(
        t('uploadAtLeast', {
          dynamicValue: '1'
        }),
        toastOptions
      );
    } else if (step === 1) {
      try {
        const payload = new FormData();
        payload.append('groupName', groupName);
        payload.append('csv', files[0]);
        const res = await EmaLeadsService.getInstance().uploadLeads(payload);
        if (res?.isSuccess) {
          setSupportedColumns(res?.data?.supportedHeaders);
          setPossibleColumns(res?.data?.possibleHeaders);
          setCurrentQueue(res?.data?.queuedLeadUpload);
          setStep(2);
        }
      } catch (err) {
        console.log(err);
      }
    } else if (step === 2) {
      try {
        const payload = {
          ...dynamicFields,
          queueIdentifier: currentQueue
        };
        const res = await EmaLeadsService.getInstance().submitQuee(payload);
        if (res?.isSuccess) {
          toast.success(t('successTxt'), toastOptions);
          setReFetch(z => !z);
          addOnClose();
          setStep(1);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  function renderMatchers(): ReactNode {
    return (
      <div>
        <p className="clear-both mt-4 mb-1 text-default-800 text-left text-sm dark:text-white">
          <SiMicrosoftexcel
            size={26}
            color="orange"
            className="float-left mr-2"
          />
          {t('exampleCSV')}
        </p>
        <div className="gap-4 grid grid-cols-2 grid-rows-5 mt-4 w-full">
          {supportedColumns?.map(
            ({
              label,
              value,
              isRequired
            }: {
              value: string;
              label: string;
              isRequired: boolean;
            }) => (
              <AppHandledSelect
                size="sm"
                className=""
                name={value}
                rules={{
                  required: {
                    value: isRequired,
                    message: inputValidationText(label)
                  }
                }}
                // @ts-ignore
                isInvalid={Boolean(errors[value]?.message)}
                selectProps={{
                  id: 'jobTitle'
                }}
                control={control}
                label={selectPlaceholderText(label)}
                // className="app-select text-base sm:text-xl"
                options={possibleColumns}
                errors={errors}
              />
            )
          )}
        </div>
      </div>
    );
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
                    {step === 1 ? (
                      <>
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
                      </>
                    ) : null}
                    {step === 2 ? renderMatchers() : null}
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
                  {step === 1 ? t('uploadCsv') : t('send')}
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
