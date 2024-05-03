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
  TableCell
} from '@nextui-org/react';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { IConnectedMailItem } from '../types';

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
    email: `user${index + 1}@example.com`,
    senderName: `Sender ${index + 1}`,
    capacity: Math.floor(Math.random() * 1000),
    accountHealth: Math.random(), // value between 0 and 1
    status: Math.random() > 0.5 // randomly true or false
  })
);

function ConnectedMails() {
  const {
    control,
    formState: { errors }
  } = useForm();
  return (
    <div className="p-5 w-full h-screen overflow-auto remove-scrollbar">
      <div className="flex flex-col justify-center gap-4 xl:gap-6 mx-auto lg:px-0 w-full remove-scrollbar">
        <div className="flex flex-col gap-2 w-full h-full">
          <div className="flex items-center">
            <h1 className="font-semibold text-[2em] text-default-800 dark:text-white">
              {t('connectedMails')}
            </h1>
            <AppHandledSolidButton className="ml-4" size="sm">
              3/3
            </AppHandledSolidButton>
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
            <AppHandledSolidButton title="Add" aria-label="Add">
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
                <TableColumn>{t('delete').toLocaleUpperCase()}</TableColumn>
                <TableColumn>{}</TableColumn>
              </TableHeader>
              <TableBody items={dummyMailItems} loadingContent={<Spinner />}>
                {item => (
                  <TableRow
                    className="border-divider border-b-1"
                    key={item?.id}
                  >
                    <TableCell className="flex items-center gap-2">
                      {item?.email}
                    </TableCell>
                    <TableCell>{item?.senderName}</TableCell>
                    <TableCell>{item?.senderName}</TableCell>
                    <TableCell className="text-blue-800 dark:text-blue-200 italic">
                      {item?.capacity}
                    </TableCell>
                    <TableCell>{item?.accountHealth}</TableCell>
                    <TableCell>{item?.status}</TableCell>
                    <TableCell>delete</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectedMails;
