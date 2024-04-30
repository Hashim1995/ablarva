import { EmaReportsServices } from '@/services/ema/ema-reports-services';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner
} from '@nextui-org/react';
import { useAsyncList } from '@react-stately/data';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function LastAddedLeads() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * @description Loads the user's email reports.
   * @async The function is asynchronous.
   * @throws The function throws an error if it encounters an error.
   * @returns The user's email reports.
   */
  const list = useAsyncList<{
    emailAddress: string;
    name: string;
    company: string;
    id: string;
  }>({
    async load({ cursor }) {
      setIsLoading(true);
      try {
        const page: number = cursor ? parseInt(cursor, 10) : 1;
        const res = await EmaReportsServices.getInstance().getEmailReports([
          { name: 'page', value: page },
          { name: 'pageSize', value: 10 }
        ]);
        console.log(res);
        setIsLoading(false);

        return {
          items: [
            {
              emailAddress: 'hashim@ablarva.com',
              name: 'Hashim Hashimli',
              company: 'Ablarva llc',
              id: '1'
            },
            {
              emailAddress: 'bilal@ablarva.com',
              name: 'Bilal Sadigov',
              company: 'Ablarva llc',
              id: '2'
            },
            {
              emailAddress: 'sadig@ablarva.com',
              name: 'Sadig Latifli',
              company: 'Ablarva llc',
              id: '3'
            },
            {
              emailAddress: 'tofig@ablarva.com',
              name: 'Tofig Aliyev',
              company: 'Ablarva llc',
              id: '4'
            },
            {
              emailAddress: 'ali@ablarva.com',
              name: 'Ali Aliyev',
              company: 'Ablarva llc',
              id: '5'
            },
            {
              emailAddress: 'johndoe@ablarva.com',
              name: 'John Doe',
              company: 'Google llc',
              id: '6'
            },
            {
              emailAddress: 'tomhanks@ablarva.com',
              name: 'Tom Hanks',
              company: 'Universal studios',
              id: '7'
            }
          ],
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
    <Table
      removeWrapper
      className="text-default-900 dark:text-white"
      classNames={{
        thead: '!bg-transparent',
        tr: '!bg-transparent',
        th: '!bg-transparent'
      }}
      aria-label="Example static collection table"
    >
      <TableHeader>
        <TableColumn>{t('emailAddress').toLocaleUpperCase()}</TableColumn>
        <TableColumn>{t('name').toLocaleUpperCase()}</TableColumn>
        <TableColumn>{t('company').toLocaleUpperCase()}</TableColumn>
      </TableHeader>
      <TableBody
        items={list.items}
        isLoading={isLoading}
        loadingContent={<Spinner />}
      >
        {item => (
          <TableRow key={item?.id}>
            <TableCell>{item?.emailAddress}</TableCell>
            <TableCell>{item?.name}</TableCell>
            <TableCell>{item?.company}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
