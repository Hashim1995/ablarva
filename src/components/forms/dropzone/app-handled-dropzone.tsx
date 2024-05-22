import { convertBytesToReadableSize } from '@/utils/functions/functions';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from '@nextui-org/react';
import { t } from 'i18next';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsTrash3 } from 'react-icons/bs';
import { toast } from 'react-toastify';

interface IProps {
  // eslint-disable-next-line no-unused-vars
  setFiles: (files: any) => void;
  files: any;
  maxLimit?: number;
  multiple?: boolean;
  accept?: {
    [key: string]: string[];
  };
}
function AppHandledDropzone({
  setFiles,
  files,
  maxLimit = 1,
  multiple = false,
  accept
}: IProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (files?.length < maxLimit) {
        setFiles([...files, ...acceptedFiles]);
      } else {
        toast.error(`${t('fileLimit')} : ${maxLimit} file`);
      }
    },
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,

    multiple,
    accept
  });

  const removeFile = (file: File) => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  return (
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
        {files?.length ? (
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
            <TableBody items={files}>
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
  );
}

export default AppHandledDropzone;
