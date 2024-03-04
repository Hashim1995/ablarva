import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { PaymentService } from '@/services/payment-services/payment-services';
// import { dictionary } from '@/utils/constants/dictionary';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Spinner,
  Pagination,
  Card
} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { ITransactionsItem } from '../../types';

interface IColumn {
  name: string;
  uid: keyof ITransactionsItem;
}

function Bottom() {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [data, setData] = useState<ITransactionsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const columns: IColumn[] = [
    { name: 'ƏMƏLİYYAT KODU', uid: 'orderId' },
    { name: 'MƏBLƏĞ', uid: 'amount' },
    { name: 'ƏMƏLİYYAT TARİXİ', uid: 'transactionDate' },
    { name: 'STATUS', uid: 'status' }
  ];

  const getTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await PaymentService.getInstance().getTransactions([
        { name: 'page', value: page },
        { name: 'pageSize', value: 7 }
      ]);
      if (res.isSuccess) {
        setData(res.data.pagedData);
        setTotalPage(res.data.totalPages);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  const renderCell = (z: ITransactionsItem, columnKey: any) => {
    // Assert columnKey to be keyof ITransactionsItem
    const key = columnKey as keyof ITransactionsItem;
    const cellValue = z[key];

    switch (key) {
      case 'orderId':
        return z.orderId.toString();
      case 'amount':
        return `${z.amount} AZN`;

      case 'transactionDate':
        // Format the date as needed
        return dayjs(new Date(z.transactionDate).toISOString()).format(
          'DD.MM.YYYY HH:mm'
        );
      case 'status':
        return (
          <Chip
            className="text-white"
            color="success"
            aria-label={`Status: ${z.status}`}
          >
            {t('active')}
          </Chip>
        );
      default:
        return cellValue.toString();
    }
  };

  return (
    <Card className="h-full    rounded-lg relative bg-transparent sm:rounded-2xl">
      <div className="flex justify-between min-h-[48px] sm:min-h-[56px]  items-center mb-4 p-2 sm:p-3">
        <div className="text-base sm:text-xl text-white flex flex-row gap-1 sm:gap-0 font-semibold">
          <p>
            {t('account')} {`${t('history')}si`}
          </p>
        </div>
      </div>
      <div className="settingHistoryTable  px-2">
        <Table
          removeWrapper
          isHeaderSticky
          bottomContent={
            totalPage > 0 ? (
              <div className="flex w-full justify-center mb-2">
                <Pagination
                  size="sm"
                  showControls
                  page={page}
                  total={totalPage}
                  onChange={(currentPage: number) => setPage(currentPage)}
                />
              </div>
            ) : null
          }
          aria-label="Example static collection  table "
          className="remove-scrollbar overflow-x-scroll shadow-none overflow-y-auto min-h-full md:overflow-x-hidden"
          classNames={{}}
        >
          <TableHeader className="bg-transparent shadow-none" columns={columns}>
            {column => (
              <TableColumn
                className="bg-black text-white shadow-none"
                key={column.uid}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            isLoading={loading}
            loadingContent={<Spinner />}
            emptyContent={'No rows to display.'}
            items={data}
          >
            {item => (
              <TableRow key={item.id}>
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

export default Bottom;
