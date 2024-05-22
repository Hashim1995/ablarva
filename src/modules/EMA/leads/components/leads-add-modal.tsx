/* eslint-disable no-unused-vars */
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
  TableRow,
  Accordion,
  AccordionItem
} from '@nextui-org/react';
import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import AppHandledInput from '@/components/forms/input/handled-input';
import { inputValidationText } from '@/utils/constants/validations';
import { useForm } from 'react-hook-form';
import { inputPlaceholderText } from '@/utils/constants/texts';
import { SiMicrosoftexcel } from 'react-icons/si';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsQuestionCircleFill, BsTrash3 } from 'react-icons/bs';
import { convertBytesToReadableSize } from '@/utils/functions/functions';
import { toast } from 'react-toastify';

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

  async function onSubmit() {
    console.log('object');
  }
  const [myFiles, setMyFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!myFiles?.length) {
        setMyFiles([...myFiles, ...acceptedFiles]);
      } else {
        toast.error(`${t('fileLimit')} : ${1} file`);
      }
    },
    [myFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 2,
    multiple: false
    // disabled: myFiles?.length > 0
  });

  const removeFile = (file: File) => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
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
                      <section className="border-divider shadow-md mx-auto rounded-md w-full">
                        <div
                          {...getRootProps({
                            className:
                              'dropzone flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors'
                          })}
                        >
                          <input {...getInputProps()} />
                          <p className="text-center text-gray-700 text-sm dark:text-gray-300">
                            {t('dropzoneTextFirst')}
                            <span className="text-blue-500 underline">
                              {t('dropzoneTextSecond')}
                            </span>
                          </p>
                        </div>
                        <aside>
                          {myFiles?.length ? (
                            <Table
                              removeWrapper
                              className="border-collapse mt-4 text-default-800 dark:text-white"
                              aria-label="Example static collection table"
                            >
                              <TableHeader>
                                <TableColumn>{t('file')}</TableColumn>
                                <TableColumn>{t('size')}</TableColumn>
                                <TableColumn>{}</TableColumn>
                              </TableHeader>
                              <TableBody items={myFiles}>
                                {(item: File) => (
                                  <TableRow
                                    className="border-divider border-b-1"
                                    key={item?.name}
                                  >
                                    <TableCell>{item?.name}</TableCell>
                                    <TableCell>
                                      {convertBytesToReadableSize(item?.size)}
                                    </TableCell>
                                    <TableCell>
                                      <BsTrash3
                                        className="text-danger cursor-pointer"
                                        onClick={() => {
                                          removeFile(item);
                                        }}
                                        size={16}
                                      />
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          ) : null}
                        </aside>
                      </section>
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
                        className="border-collapse text-default-800 dark:text-white overflow-y-auto remove-scrollbar"
                        aria-label="Example static collection table"
                      >
                        <TableHeader>
                          <TableColumn>{t('file')}</TableColumn>
                          <TableColumn>{t('size')}</TableColumn>
                          <TableColumn>{t('size')}</TableColumn>
                          <TableColumn>{t('size')}</TableColumn>
                          <TableColumn>{t('size')}</TableColumn>
                          <TableColumn>{t('size')}</TableColumn>
                          <TableColumn>{t('size')}</TableColumn>
                          <TableColumn>{t('size')}</TableColumn>
                          <TableColumn>{t('size')}</TableColumn>
                          <TableColumn>{t('size')}</TableColumn>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="border-divider border-b-1">
                            <TableCell>{t('file')}</TableCell>
                            <TableCell>{t('size')}</TableCell>
                            <TableCell>{t('size')}</TableCell>
                            <TableCell>{t('size')}</TableCell>
                            <TableCell>{t('size')}</TableCell>
                            <TableCell>{t('size')}</TableCell>
                            <TableCell>{t('size')}</TableCell>
                            <TableCell>{t('size')}</TableCell>
                            <TableCell>{t('size')}</TableCell>
                            <TableCell>{t('size')}</TableCell>
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
