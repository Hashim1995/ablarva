import { useState } from 'react';
import {
  Card,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  //   Chip,
  Button,
  Spinner,
  Tooltip,
  CardHeader,
  CardBody,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Divider
} from '@nextui-org/react';
import utc from 'dayjs/plugin/utc'; // Import the UTC plugin

import { useAsyncList } from '@react-stately/data';
import dayjs from 'dayjs';
import { SettingsService } from '@/services/settings-services/settings-services';
import { useTranslation } from 'react-i18next';
import { BsPen, BsTrash } from 'react-icons/bs';
import { IoEllipsisVertical } from 'react-icons/io5';
import { IEmailItem } from './types';
import AddEmailModal from './add-modal';
import EditEmailModal from './edit-modal';

dayjs.extend(utc); // Use the UTC plugin

export default function Email() {
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
  const { t } = useTranslation();
  const [removeLoading, setRemoveLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IEmailItem>();

  const list = useAsyncList<IEmailItem>({
    async load({ cursor }) {
      setIsLoading(true);
      try {
        const page: number = cursor ? parseInt(cursor, 10) : 1;
        const res = await SettingsService.getInstance().getEmailItems([
          { name: 'page', value: page },
          { name: 'pageSize', value: 10 }
        ]);
        setIsLoading(false);

        return {
          items: res.data.pagedData,

          cursor: (page + 1).toString()
        };
      } catch (err) {
        console.error(err);
        setIsLoading(false);
        return { items: [] };
      }
    }
  });

  const removeThreadFromList = async (id: string) => {
    setRemoveLoading(true);
    try {
      const res = await SettingsService.getInstance().removeEmailItem(id);
      if (res.isSuccess) {
        list.reload();
      }
    } catch (err) {
      console.log(err);
    }
    setRemoveLoading(false);
  };

  return (
    <Card className=" relative bg-transparent !shadow-none !rounded-none containerLg">
      {/* Card Header */}
      <CardHeader className="flex my-3 bg-default-50 rounded-md justify-between min-h-[48px] sm:min-h-[56px]  p-3 ">
        <div className="text-base sm:text-xl text-white flex flex-row gap-1 sm:gap-0 font-semibold">
          <p>{t('emailSettings')}</p>
        </div>
        <Button onClick={addOnOpen}>{t('addBtn')}</Button>
      </CardHeader>
      {/* Table */}
      <CardBody className=" flex my-3 bg-default-50 rounded-md justify-between min-h-[48px] sm:min-h-[56px]  p-2">
        <Table
          isHeaderSticky
          aria-label="Transactions table"
          className="remove-scrollbar !border-none  !rounded-none overflow-x-scroll shadow-none overflow-y-hidden"
          classNames={{
            wrapper: '!border-none  !rounded-none shadow-none',
            base: ' overflow-scroll remove-scrollbar',
            table: 'min-h-[120px]'
          }}
          bottomContent={
            list.items.length > 0 && (
              <div className="flex justify-center my-4">
                <Button onClick={() => list.loadMore()} disabled={isLoading}>
                  {t('loadMore')}
                </Button>
              </div>
            )
          }
        >
          <TableHeader>
            <TableColumn>{t('mailAddress').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('createdAt').toLocaleUpperCase()}</TableColumn>
            <TableColumn className=" flex items-center justify-end">
              <IoEllipsisVertical />{' '}
            </TableColumn>
          </TableHeader>
          <TableBody
            items={list.items}
            isLoading={isLoading}
            loadingContent={<Spinner />}
          >
            {item => (
              <TableRow key={item?.id}>
                <TableCell>{item?.emailAddress}</TableCell>
                <TableCell>
                  {dayjs.utc(item?.createdAt).format('DD.MM.YYYY')}
                </TableCell>
                <TableCell className=" flex items-center justify-end p-0">
                  <div className="relative flex items-center gap-2">
                    <Tooltip content="Edit user">
                      <span
                        aria-hidden
                        onClick={() => {
                          setSelectedItem(item);
                          editOnOpen();
                        }}
                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                      >
                        <BsPen />
                      </span>
                    </Tooltip>
                    <Popover placement="right">
                      <PopoverTrigger>
                        <Button
                          size="sm"
                          isIconOnly
                          className="bg-transparent rounded-full ml-2 !w-6 !h-8 !unit-lg"
                          aria-label="Remove chat"
                        >
                          <BsTrash size={16} className=" text-danger" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="px-1 py-2 ">
                          <p>{t('deleteChatConfirmation')}</p>
                          <Divider className="my-2" />
                          <div className="w-full flex items-center gap-1">
                            <Button
                              size="sm"
                              className=" "
                              variant="bordered"
                              isLoading={removeLoading}
                              onClick={() => {
                                removeThreadFromList(item.id);
                              }}
                              aria-label="Remove thread"
                            >
                              {t('yesTxt')}
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
      {addIsOpen && (
        <AddEmailModal
          reloadData={list.reload}
          onOpenChange={addOnOpenChange}
          isOpen={addIsOpen}
        />
      )}{' '}
      {editIsOpen && (
        <EditEmailModal
          reloadData={list.reload}
          onOpenChange={editOnOpenChange}
          isOpen={editIsOpen}
          selectedItem={selectedItem}
        />
      )}
    </Card>
  );
}
