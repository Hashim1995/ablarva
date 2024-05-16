/* eslint-disable no-unused-vars */
import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import Empty from '@/components/layout/empty';
import AppHandledRemoveModal from '@/components/layout/remove-modal';
import { EmaSenderInformationService } from '@/services/ema/ema-sender-information-services';
import { formatUrl } from '@/utils/functions/functions';
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
import { useEffect, useState } from 'react';
import { BsPen, BsTrash3 } from 'react-icons/bs';
import {
  ISenderInformationItem,
  ISenderInformationListResponse
} from '../types';
import SenderInformationAddModal from './sender-information-add-modal';
import SenderInformationEditModal from './sender-information-edit-modal';

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

  const {
    isOpen: removeIsOpen,
    onOpen: removeOnOpen,
    onOpenChange: removeOnOpenChange,
    onClose: removeOnClose
  } = useDisclosure();

  const [selectedItem, setselectedItem] = useState<ISenderInformationItem>();
  const [data, setData] = useState<ISenderInformationListResponse['data']>([]);
  const [loading, setLoading] = useState(true);
  const [removeLoading, setRemoveLoading] = useState(false);

  const fetchSenderInformation = async () => {
    try {
      const res = await EmaSenderInformationService.getInstance().getList();
      if (res?.isSuccess) {
        setData(res?.data);
        setLoading(false);
      }
      console.log(res?.data, 'test');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSenderInformation();
  }, []);

  const removeSenderInformation = async () => {
    setRemoveLoading(true);
    try {
      const res =
        await EmaSenderInformationService.getInstance().removeSenderInformation(
          selectedItem?.id
        );
      if (res.isSuccess) {
        fetchSenderInformation();
        removeOnClose();
      }
    } catch (err) {
      console.log(err);
    }
    setRemoveLoading(false);
  };

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
              {data?.length}/3
            </AppHandledBorderedButton>
          </div>
          <h3 className="text-default-800 text-lg dark:text-white italic">
            {t('senderInformationDescription')}
          </h3>
          <Divider className="my-4" />
          <div className="flex justify-end">
            <AppHandledSolidButton
              title="Add"
              isDisabled={data?.length >= 3}
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
              <TableBody
                isLoading={loading}
                items={data}
                emptyContent={<Empty />}
                loadingContent={<Spinner />}
              >
                {item => (
                  <TableRow
                    className="border-divider border-b-1"
                    key={item?.id}
                  >
                    <TableCell className="flex items-center gap-2">
                      {item?.fullName}
                    </TableCell>
                    <TableCell>{item?.jobTitle}</TableCell>
                    <TableCell>{item?.company}</TableCell>
                    <TableCell className="text-blue-800 dark:text-blue-200 italic">
                      <a
                        target="_blank"
                        href={formatUrl(item?.website)}
                        rel="noreferrer"
                      >
                        {item?.website}
                      </a>
                    </TableCell>
                    <TableCell>{item?.phone}</TableCell>
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
                          <span
                            aria-hidden
                            onClick={() => {
                              setselectedItem(item);

                              removeOnOpen();
                            }}
                            className="active:opacity-50 text-danger text-lg cursor-pointer"
                          >
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
            fetchSenderInformation();
          }}
          onOpenChange={addOnOpenChange}
          isOpen={addIsOpen}
        />
      )}
      {editIsOpen && (
        <SenderInformationEditModal
          reloadData={() => {
            fetchSenderInformation();
          }}
          onOpenChange={editOnOpenChange}
          isOpen={editIsOpen}
          selectedItem={selectedItem}
        />
      )}
      {removeIsOpen && (
        <AppHandledRemoveModal
          isLoading={removeLoading}
          onRemove={removeSenderInformation}
          onOpenChange={removeOnOpenChange}
          isOpen={removeIsOpen}
        />
      )}
    </div>
  );
}

export default SenderInformation;
