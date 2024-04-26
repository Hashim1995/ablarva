import { useState } from 'react';
import {
  Card,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
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
import { toast } from 'react-toastify';
import { toastOptions } from '@/configs/global-configs';
import { IoEllipsisVertical } from 'react-icons/io5';
import { IEmailItem } from './types';
import AddEmailModal from './add-modal';
import EditEmailModal from './edit-modal';

dayjs.extend(utc); // Use the UTC plugin

/**
 * Renders the email settings page. This page allows the user to configure the email list for use Email assitant. The user can add, edit, and delete email. The user can also view the current email settings.
 * @returns The rendered email settings page.
 * @async The function is asynchronous.
 */

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

  /**
   * Fetches the email list for email marketing assistants from the server.
   * @async The function is asynchronous.
   * @throws The function throws an error if it encounters an error.
   * @returns The result of the email settings.
   */
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

  /**
   * Removes the email from the email list.
   * @param id The id of the email.
   * @async The function is asynchronous.
   * @throws The function throws an error if it encounters an error.
   */
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
    <Card className="relative bg-transparent !shadow-none !rounded-none containerLg">
      {/* Card Header */}
      <CardHeader className="flex justify-between bg-default-50 my-3 p-3 rounded-md min-h-[48px] sm:min-h-[56px]">
        <div className="flex flex-row gap-1 sm:gap-0 font-semibold text-base text-default-800 sm:text-xl dark:text-white">
          <p>{t('emailSettings')}</p>
        </div>
        <div className="flex justify-between items-center gap-2">
          <Button
            title="Add multiple"
            aria-label="Add multiple"
            onClick={() => toast.success(t('itIsBeingPrepared'), toastOptions)}
          >
            {t('addMultipleBtn')}
          </Button>
          <Button title="Add" aria-label="Add" onClick={addOnOpen}>
            {t('addBtn')}
          </Button>
        </div>
      </CardHeader>
      {/* Table */}
      <CardBody className="flex justify-between bg-default-50 my-3 p-2 rounded-md min-h-[48px] sm:min-h-[56px]">
        <Table
          isHeaderSticky
          aria-label="Transactions table"
          className="shadow-none !border-none !rounded-none overflow-x-scroll overflow-y-hidden remove-scrollbar"
          classNames={{
            wrapper: '!border-none  !rounded-none shadow-none',
            base: ' overflow-scroll remove-scrollbar',
            table: 'min-h-[120px]'
          }}
          bottomContent={
            list.items.length > 0 && (
              <div className="flex justify-center my-4">
                <Button
                  title="Load More"
                  aria-label="Load More"
                  onClick={() => list.loadMore()}
                  disabled={isLoading}
                >
                  {t('loadMore')}
                </Button>
              </div>
            )
          }
        >
          <TableHeader>
            <TableColumn>{t('name').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('surname').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('mailAddress').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('createdAt').toLocaleUpperCase()}</TableColumn>
            <TableColumn className="flex justify-end items-center">
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
                <TableCell>{item?.name}</TableCell>
                <TableCell>{item?.surname}</TableCell>

                <TableCell>{item?.emailAddress}</TableCell>
                <TableCell>
                  {dayjs.utc(item?.createdAt).format('DD.MM.YYYY')}
                </TableCell>
                <TableCell className="flex justify-end items-center p-0">
                  <div className="relative flex items-center gap-2">
                    <Tooltip content="Edit user">
                      <span
                        aria-hidden
                        onClick={() => {
                          setSelectedItem(item);
                          editOnOpen();
                        }}
                        className="active:opacity-50 text-default-400 text-lg cursor-pointer"
                      >
                        <BsPen />
                      </span>
                    </Tooltip>
                    <Popover placement="right">
                      <PopoverTrigger>
                        <Button
                          size="sm"
                          title="Remove chat"
                          aria-label="Remove chat popover"
                          isIconOnly
                          className="bg-transparent ml-2 rounded-full !w-6 !h-8 !unit-lg"
                        >
                          <BsTrash size={16} className="text-danger" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="px-1 py-2">
                          <p>{t('deleteChatConfirmation')}</p>
                          <Divider className="my-2" />
                          <div className="flex items-center gap-1 w-full">
                            <Button
                              size="sm"
                              title="Yes"
                              aria-label="Yes"
                              className=""
                              variant="bordered"
                              isLoading={removeLoading}
                              onClick={() => {
                                removeThreadFromList(item.id);
                              }}
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
