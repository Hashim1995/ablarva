/* eslint-disable no-nested-ternary */
import { useCallback } from 'react';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import AppHandledSelect from '@/components/forms/select/handled-select';
import { selectOption } from '@/models/common';
import { selectPlaceholderText } from '@/utils/constants/texts';
import {
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  Spinner,
  TableRow,
  TableCell,
  CircularProgress,
  Chip,
  Switch,
  Tooltip,
  useDisclosure
} from '@nextui-org/react';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import gmail from '@assets/icons/gmail.svg';
import amazon from '@assets/icons/amazon.svg';
import { BsPen, BsTrash3 } from 'react-icons/bs';
import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import microsoft from '@assets/icons/microsoft.svg';
import { IConnectedMailItem } from '../types';
import ConnectMailsModal from './connect-mails-modal';

const senderOptionListDummy: selectOption[] = [
  {
    value: 1,
    label: 'hashim@gmail.com'
  },
  {
    value: 2,
    label: 'john@gmail.com'
  },
  {
    value: 3,
    label: 'jackson@gmail.com'
  }
];

const dummyMailItems: IConnectedMailItem[] = Array.from(
  { length: 15 },
  (_, index) => ({
    id: `id-${index + 1}`,
    emailProviderType: 2,
    email: `user${index + 1}@example.com`,
    senderName: `Sender ${index + 1}`,
    capacity: 12,
    accountHealth: 30, // value between 0 and 1
    status: Math.random() > 0.5 // randomly true or false
  })
);

const returnIcon = (emailProviderType: number) => {
  switch (emailProviderType) {
    case 1:
      return <img className="h-5" alt="gmail" src={gmail} />;
    case 2:
      return <img className="h-5" alt="microsoft" src={microsoft} />;
    default:
      return <img className="h-5" alt="amazon" src={amazon} />;
  }
};

function ConnectedMails() {
  const {
    control,
    formState: { errors }
  } = useForm();

  const {
    isOpen: connectModalIsOpen,
    onOpen: connectModalOnOpen,
    onOpenChange: connectModalOnOpenChange
  } = useDisclosure();

  const updateSwitchStatus = useCallback(
    async (id: string, newStatus: boolean) => {
      // Your API call to update the backend
      // await yourUpdateApiCall(id, newStatus);
      console.log(`Switch status updated for ${id}: ${newStatus}`);
    },
    []
  );

  const handleSwitchChange = useCallback(
    (id: string, event: any) => {
      const newStatus = event.target.checked;
      updateSwitchStatus(id, newStatus);
    },
    [updateSwitchStatus]
  );

  return (
    <div className="p-5 w-full h-screen overflow-auto remove-scrollbar">
      <div className="flex flex-col justify-center gap-4 xl:gap-6 mx-auto lg:px-0 w-full remove-scrollbar">
        <div className="flex flex-col gap-2 w-full h-full">
          <div className="flex items-center">
            <h1 className="font-semibold text-[2em] text-default-800 dark:text-white">
              {t('connectedMails')}
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
          <Divider className="my-4" />
          <div className="flex justify-between">
            <form>
              <AppHandledSelect
                className="w-80"
                isInvalid={Boolean(errors.sender?.message)}
                selectProps={{
                  id: 'sender'
                }}
                name="sender"
                options={senderOptionListDummy}
                label={selectPlaceholderText(t('sender'))}
                control={control}
                errors={errors}
              />
            </form>
            <AppHandledSolidButton
              onClick={connectModalOnOpen}
              title="Add"
              aria-label="Add"
            >
              {t('connect')}
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
                <TableColumn>{t('email').toLocaleUpperCase()}</TableColumn>
                <TableColumn>{t('senderName').toLocaleUpperCase()}</TableColumn>
                <TableColumn>
                  {t('dailyEmailCapacity').toLocaleUpperCase()}
                </TableColumn>
                <TableColumn>
                  {t('accountHealth').toLocaleUpperCase()}
                </TableColumn>
                <TableColumn>{t('status').toLocaleUpperCase()}</TableColumn>
                <TableColumn> </TableColumn>
              </TableHeader>
              <TableBody items={dummyMailItems} loadingContent={<Spinner />}>
                {(item: IConnectedMailItem) => (
                  <TableRow
                    className="border-divider border-b-1"
                    key={item?.id}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {returnIcon(item?.emailProviderType)} {item?.email}
                      </div>
                    </TableCell>

                    <TableCell>{item?.senderName}</TableCell>

                    <TableCell>
                      <Chip color="secondary">{item?.capacity}</Chip>
                    </TableCell>
                    <TableCell>
                      <CircularProgress
                        size="lg"
                        color={
                          item?.accountHealth < 30
                            ? 'danger'
                            : item?.accountHealth < 70
                            ? 'warning'
                            : 'success'
                        }
                        value={item?.accountHealth}
                        showValueLabel
                        classNames={{
                          value: ' text-default-800 dark:text-white'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        size="sm"
                        defaultSelected={item?.status}
                        onChange={event => handleSwitchChange(item.id, event)}
                        aria-label="Switch mail status"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="relative flex justify-end items-center gap-2">
                        <Tooltip
                          classNames={{
                            content: 'text-default-800 dark:text-white'
                          }}
                          content={t('editBtn')}
                        >
                          <span
                            aria-hidden
                            // onClick={() => {
                            //   setselectedItem(item);
                            //   editOnOpen();
                            // }}
                            className="active:opacity-50 text-default-400 text-lg cursor-pointer"
                          >
                            <BsPen size={16} />
                          </span>
                        </Tooltip>
                        <Tooltip
                          classNames={{
                            content: 'text-default-800 dark:text-white'
                          }}
                          content={t('delete')}
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
      {connectModalIsOpen && (
        <ConnectMailsModal
          reloadData={() => console.log('a')}
          onOpenChange={connectModalOnOpenChange}
          isOpen={connectModalIsOpen}
        />
      )}
    </div>
  );
}

export default ConnectedMails;
