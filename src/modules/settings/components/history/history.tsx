import { useCallback, useEffect, useState } from 'react';
import { PaymentService } from '@/services/payment-services/payment-services';
import { dictionary } from '@/utils/constants/dictionary';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Pagination,
  Card
} from '@nextui-org/react';
import { ITransactionsItem } from '../../types';

interface IColumn {
  name: string;
  uid: keyof ITransactionsItem;
}

function Bottom() {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [data, setData] = useState<ITransactionsItem[]>([]);

  const columns: IColumn[] = [
    { name: 'ORDER ID', uid: 'orderId' },
    { name: 'AMOUNT', uid: 'amount' },
    { name: 'TRANSACTION DATE', uid: 'transactionDate' },
    { name: 'STATUS', uid: 'status' }
  ];

  const getTransactions = useCallback(async () => {
    try {
      const res = await PaymentService.getInstance().getTransactions([
        { name: 'page', value: page }
      ]);
      if (res.isSuccess) {
        setData(res.data.pagedData);
        setTotalPage(res.data.totalPages);
      }
    } catch (err) {
      console.log(err);
      // Handle error in UI here
    }
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
        return z.transactionDate.toString();
      case 'status':
        return (
          <Chip
            className="text-white"
            color="success"
            aria-label={`Status: ${z.status}`}
          >
            Aktiv
          </Chip>
        );
      default:
        return cellValue.toString();
    }
  };

  return (
    <Card className="h-full rounded-lg relative  sm:rounded-2xl">
      <div className="flex justify-between min-h-[48px] sm:min-h-[56px]  items-center mb-4 bg-black p-2 sm:p-3">
        <div className="text-base sm:text-xl text-white flex flex-row gap-1 sm:gap-0 font-semibold">
          <p>
            {dictionary.az.account} {`${dictionary.az.history}si`}
          </p>
        </div>
      </div>
      <Table
        removeWrapper
        isStriped
        isHeaderSticky
        bottomContent={
          totalPage > 0 ? (
            <div className=" w-full backdrop-blur-sm  sticky bottom-0 p-1  gray   ">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                className="overflow-hidden flex items-center justify-center"
                page={page}
                total={totalPage}
                onChange={(currentPage: number) => setPage(currentPage)}
              />
            </div>
          ) : null
        }
        aria-label="Example static collection  table "
        className="overflow-y-scroll min-h-full  md:overflow-x-hidden"
        classNames={{}}
      >
        <TableHeader columns={columns}>
          {column => <TableColumn key={column.uid}>{column.name}</TableColumn>}
        </TableHeader>
        <TableBody emptyContent={'No rows to display.'} items={data}>
          {item => (
            <TableRow key={item.id}>
              {columnKey => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

export default Bottom;
