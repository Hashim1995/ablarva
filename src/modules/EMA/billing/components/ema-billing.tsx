import {
  Button,
  Chip,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react';

import { useTranslation } from 'react-i18next';
import { PaymentService } from '@/services/payment-services/payment-services';
import { useAsyncList } from '@react-stately/data';
import dayjs from 'dayjs';
import { useState } from 'react';
import { ITransactionsItem } from '../../cabinet/types';

function EmaBilling() {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  /**
   * @description Loads the user's payment history.
   * @async The function is asynchronous.
   * @throws The function throws an error if it encounters an error.
   * @returns The user's payment history.
   */
  const list = useAsyncList<ITransactionsItem>({
    async load({ cursor }) {
      setIsLoading(true);
      try {
        const page: number = cursor ? parseInt(cursor, 10) : 1;
        const res = await PaymentService.getInstance().getTransactions([
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
    <div className="p-5 w-full h-screen overflow-auto remove-scrollbar">
      <div className="flex flex-col justify-center gap-4 xl:gap-6 mx-auto lg:px-0 w-full remove-scrollbar">
        <div className="flex flex-col gap-2 w-full h-full">
          <h3 className="font-semibold text-default-900 text-xl dark:text-white">
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
                <TableColumn>
                  {t('operationCode').toLocaleUpperCase()}
                </TableColumn>
                <TableColumn>{t('amount').toLocaleUpperCase()}</TableColumn>
                <TableColumn>
                  {t('operationDate').toLocaleUpperCase()}
                </TableColumn>
                <TableColumn>{t('status').toLocaleUpperCase()}</TableColumn>
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
                      {dayjs.utc(item?.transactionDate).format('DD.MM.YYYY')}
                    </TableCell>
                    <TableCell>
                      {' '}
                      <Chip
                        className="text-default-900 dark:text-white"
                        color="success"
                        aria-label={`Status: ${item?.status}`}
                      >
                        {t('active')}
                      </Chip>
                    </TableCell>
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

export default EmaBilling;
