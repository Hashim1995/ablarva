import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react';

import { useTranslation } from 'react-i18next';
import { EmaBillingServices } from '@/services/ema/ema-billing-services';
import { useAsyncList } from '@react-stately/data';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import { useState } from 'react';
import { IEmaBillingHistoryItem } from '../types';

function EmaBillingHistory() {
  const { t } = useTranslation();
  dayjs.extend(utc);

  const [isLoading, setIsLoading] = useState(false);

  /**
   * @description Loads the user's payment history.
   * @async The function is asynchronous.
   * @throws The function throws an error if it encounters an error.
   * @returns The user's payment history.
   */
  const list = useAsyncList<IEmaBillingHistoryItem>({
    async load({ cursor }) {
      setIsLoading(true);
      try {
        const page: number = cursor ? parseInt(cursor, 10) : 1;
        const res = await EmaBillingServices.getInstance().getTransactions([
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
  return (
    <div className="flex flex-col justify-center gap-4 xl:gap-6 mx-auto lg:px-0 w-full remove-scrollbar">
      <div className="flex flex-col gap-2 w-full h-full">
        <h3 className="font-semibold text-default-800 text-xl dark:text-white">
          {t('paymentHistory')} 💰
        </h3>

        <div className="border-1 border-divider bg-transparent shadow-lg p-6 rounded-2xl w-full">
          <Table
            removeWrapper
            className="text-default-900 dark:text-white"
            classNames={{
              thead: '!bg-transparent',
              tr: '!bg-transparent',
              th: '!bg-transparent'
            }}
            aria-label="Example static collection table"
            bottomContent={
              list.items.length > 0 && (
                <div className="flex justify-center my-4">
                  <AppHandledBorderedButton
                    title="Load More"
                    aria-label="Load More"
                    onClick={() => list.loadMore()}
                    isDisabled={isLoading}
                  >
                    {t('loadMore')}
                  </AppHandledBorderedButton>
                </div>
              )
            }
          >
            <TableHeader>
              <TableColumn>
                {t('operationCode').toLocaleUpperCase()}
              </TableColumn>
              <TableColumn>{t('amount').toLocaleUpperCase()}</TableColumn>
              <TableColumn>
                {t('operationDate').toLocaleUpperCase()}
              </TableColumn>
            </TableHeader>
            <TableBody
              items={list.items}
              isLoading={isLoading}
              loadingContent={<Spinner />}
            >
              {item => (
                <TableRow key={item?.id}>
                  <TableCell>{item?.orderId}</TableCell>
                  <TableCell>{item?.amount} AZN</TableCell>
                  <TableCell>
                    {' '}
                    {dayjs
                      .utc(item?.transactionDate)
                      .format('DD.MM.YYYY hh:mm')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default EmaBillingHistory;
