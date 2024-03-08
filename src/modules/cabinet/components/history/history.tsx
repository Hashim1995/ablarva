import React, { useState } from 'react';
import {
  Card,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  Spinner
} from '@nextui-org/react';
import { useAsyncList } from '@react-stately/data';
import { PaymentService } from '@/services/payment-services/payment-services';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { ITransactionsItem } from '../../types';

interface IColumn {
  name: string;
  uid: keyof ITransactionsItem;
}

export default function Bottom() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const list = useAsyncList<ITransactionsItem>({
    async load({ cursor }) {
      setIsLoading(true);
      try {
        // Convert the cursor to a number, defaulting to 1 if it's not available
        const page: number = cursor ? parseInt(cursor, 10) : 1;
        const res = await PaymentService.getInstance().getTransactions([
          { name: 'page', value: page },
          { name: 'pageSize', value: 10 }
        ]);
        setIsLoading(false);

        return {
          items: res.data.pagedData,
          // Convert the new cursor value back to a string
          cursor: (page + 1).toString()
        };
      } catch (err) {
        console.error(err);
        setIsLoading(false);
        return { items: [] };
      }
    }
  });

  const columns: IColumn[] = [
    { name: t('operationCode').toLocaleUpperCase(), uid: 'orderId' },
    { name: t('amount').toLocaleUpperCase(), uid: 'amount' },
    { name: t('operationDate').toLocaleUpperCase(), uid: 'transactionDate' },
    { name: t('status').toLocaleUpperCase(), uid: 'status' }
  ];

  const renderCell = (item: any, columnKey: any) => {
    const value = item[columnKey];
    switch (columnKey) {
      case 'orderId':
        return value.toString();
      case 'amount':
        return `${value} AZN`;
      case 'transactionDate':
        return dayjs(new Date(value).toISOString()).format('DD.MM.YYYY HH:mm');
      case 'status':
        return (
          <Chip
            className="text-white"
            color="success"
            aria-label={`Status: ${value}`}
          >
            {t('active')}
          </Chip>
        );
      default:
        return value.toString();
    }
  };

  return (
    <Card className="h-2/3 relative bg-transparent !shadow-none !rounded-none">
      {/* Card Header */}
      <div className="flex justify-between min-h-[48px] sm:min-h-[56px] items-center p-2 sm:p-3">
        <div className="text-base sm:text-xl text-white flex flex-row gap-1 sm:gap-0 font-semibold">
          <p>
            {t('account')} {`${t('history')}si`}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className=" px-2">
        <Table
          isHeaderSticky
          aria-label="Transactions table"
          className="remove-scrollbar overflow-x-scroll shadow-none overflow-y-hidden"
          classNames={{
            base: 'max-h-[520px] overflow-scroll',
            table: 'min-h-[120px]'
          }}
          bottomContent={
            list.items.length > 0 && (
              <div className="flex justify-center my-4">
                <Button onClick={() => list.loadMore()} disabled={isLoading}>
                  Load More
                </Button>
              </div>
            )
          }
        >
          <TableHeader>
            {columns.map(column => (
              <TableColumn
                key={column.uid}
                className="bg-black/30 backdrop-blur-md text-white shadow-none"
              >
                {column.name}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody
            items={list.items}
            isLoading={isLoading}
            loadingContent={<Spinner />}
          >
            {item => (
              <TableRow key={item?.id}>
                {columnKey => (
                  <TableCell className="text-white">
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
