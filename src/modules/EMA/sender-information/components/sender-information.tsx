import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  Spinner,
  TableRow,
  TableCell,
  Divider,
  useDisclosure,
  Tooltip
} from '@nextui-org/react';
import { t } from 'i18next';
import { useState } from 'react';
import { BsPen, BsTrash3 } from 'react-icons/bs';
import { ISenderInformationItem } from '../types';
import SenderInformationAddModal from './sender-information-add-modal';
import SenderInformationEditModal from './sender-information-edit-modal';

const dummyData: ISenderInformationItem[] = [
  {
    id: 1,
    senderFullName: 'John Doe',
    senderJobTitle: 1,
    senderCompany: 'Google',
    senderWebsite: 'https://google.com',
    senderPhone: '+1 123 456 78 90'
  },
  {
    id: 2,
    senderFullName: 'Jack Doe',
    senderJobTitle: 2,
    senderCompany: 'Meta',
    senderWebsite: 'https://meta.com',
    senderPhone: '+1 123 456 78 90'
  },
  {
    id: 3,
    senderFullName: 'Jane Doe',
    senderJobTitle: 3,
    senderCompany: 'Amazon',
    senderWebsite: 'https://amazon.com',
    senderPhone: '+1 123 456 78 90'
  }
];

function SenderInformation() {
  const {
    isOpen: addIsOpen,
    onOpen: addOnOpen,
    onOpenChange: addOnOpenChange
  } = useDisclosure();
  const {
    isOpen: editIsOpen,
    onOpen: editOnOpen,
    onOpenChange: editOnOpenChange
  } = useDisclosure();

  const [selectedItem, setselectedItem] = useState<ISenderInformationItem>();

  return (
    <div className="p-5 w-full h-screen overflow-auto remove-scrollbar">
      <div className="flex flex-col justify-center gap-4 xl:gap-6 mx-auto lg:px-0 w-full remove-scrollbar">
        <div className="flex flex-col gap-2 w-full h-full">
          <div className="flex items-center">
            <h1 className="font-semibold text-[2em] text-default-800 dark:text-white">
              {t('senderInformation')} 👨🏻‍💻
            </h1>
            <AppHandledBorderedButton
              buttonProps={{
                disableAnimation: true
              }}
              className="ml-4 cursor-default"
              size="sm"
            >
              3/3
            </AppHandledBorderedButton>
          </div>
          <h3 className="text-default-800 text-lg dark:text-white italic">
            {t('senderInformationDescription')}
          </h3>
          <Divider className="my-4" />
          <div className="flex justify-end">
            <AppHandledSolidButton
              title="Add"
              onClick={addOnOpen}
              aria-label="Add"
            >
              {t('addBtn')}
            </AppHandledSolidButton>
          </div>
          <div className="bg-transparent py-6 rounded-2xl w-full">
            <Table
              removeWrapper
              classNames={{
                th: ' !py-5 dark:!bg-[#303642]',
                td: ' !py-5'
              }}
              className="border-collapse text-default-800 dark:text-white"
              aria-label="Example static collection table"
            >
              <TableHeader>
                <TableColumn>
                  {t('senderFullName').toLocaleUpperCase()}
                </TableColumn>
                <TableColumn>
                  {t('senderJobTitle').toLocaleUpperCase()}
                </TableColumn>
                <TableColumn>
                  {t('senderCompany').toLocaleUpperCase()}
                </TableColumn>
                <TableColumn>
                  {t('senderWebsite').toLocaleUpperCase()}
                </TableColumn>
                <TableColumn>
                  {t('senderPhone').toLocaleUpperCase()}
                </TableColumn>
                <TableColumn>{}</TableColumn>
              </TableHeader>
              <TableBody items={dummyData} loadingContent={<Spinner />}>
                {item => (
                  <TableRow
                    className="border-divider border-b-1"
                    key={item?.id}
                  >
                    <TableCell className="flex items-center gap-2">
                      {item?.senderFullName}
                    </TableCell>
                    <TableCell>{item?.senderJobTitle?.label}</TableCell>
                    <TableCell>{item?.senderCompany}</TableCell>
                    <TableCell className="text-blue-800 dark:text-blue-200 italic">
                      <a href={item?.senderWebsite}>{item?.senderWebsite}</a>
                    </TableCell>
                    <TableCell>{item?.senderPhone}</TableCell>
                    <TableCell>
                      <div className="relative flex justify-end items-center gap-2">
                        <Tooltip
                          classNames={{
                            content: 'text-default-800 dark:text-white'
                          }}
                          content={t('editSenderInformation')}
                        >
                          <span
                            aria-hidden
                            onClick={() => {
                              setselectedItem(item);
                              editOnOpen();
                            }}
                            className="active:opacity-50 text-default-400 text-lg cursor-pointer"
                          >
                            <BsPen size={16} />
                          </span>
                        </Tooltip>
                        <Tooltip
                          classNames={{
                            content: 'text-default-800 dark:text-white'
                          }}
                          content={t('deleteSenderInformation')}
                        >
                          <span className="active:opacity-50 text-danger text-lg cursor-pointer">
                            <BsTrash3 color="danger" size={16} />
                          </span>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      {addIsOpen && (
        <SenderInformationAddModal
          reloadData={() => {
            console.log('test');
          }}
          onOpenChange={addOnOpenChange}
          isOpen={addIsOpen}
        />
      )}
      {editIsOpen && (
        <SenderInformationEditModal
          reloadData={() => {
            console.log('test');
          }}
          onOpenChange={editOnOpenChange}
          isOpen={editIsOpen}
          selectedItem={selectedItem}
        />
      )}
    </div>
  );
}

export default SenderInformation;
