/* eslint-disable no-unused-vars */
import { setState } from '@/models/common';
import {
  Button,
  ButtonGroup,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip
} from '@nextui-org/react';
// import dayjs from 'dayjs';
import {
  FcAddColumn,
  FcAddDatabase,
  FcAddressBook,
  FcDeleteDatabase,
  FcFlashOn,
  FcFullTrash
} from 'react-icons/fc';

import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { ILeadItem } from '../types';

interface IProps {
  data: ILeadItem[];
  setCurrentPage: setState<number>;
  currentPage: number;
  totalCount: number;
}
function LeadsTable({ data, setCurrentPage, currentPage, totalCount }: IProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div className="relative flex justify-between">
        <h3 className="font-semibold text-default-800 text-xl dark:text-white">
          {t('leads')} 🪪
        </h3>
      </div>
      <div className="border-1 border-divider bg-transparent shadow-lg p-6 rounded-2xl w-full">
        <Table
          color="default"
          removeWrapper
          onSelectionChange={keys => {
            if (keys === 'all') {
              setSelectedRows(Array.from(data?.map(z => z?.id)));
            } else {
              setSelectedRows(Array.from(keys).map(key => String(key)));
            }
          }}
          selectionMode="multiple"
          className="text-default-900 dark:text-white"
          classNames={{
            thead: '!bg-transparent',
            tr: '!bg-transparent',
            th: '!bg-transparent',
            td: '!py-5'
          }}
          aria-label="Example static collection table"
          bottomContent={
            <div className="flex justify-center w-full">
              <Pagination
                isCompact
                color="default"
                showControls
                page={currentPage}
                total={totalCount}
                onChange={page => setCurrentPage(page)}
              />
            </div>
          }
        >
          <TableHeader>
            <TableColumn>{t('name').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('company').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('email').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('engaged').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('position').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('lastContact').toLocaleUpperCase()}</TableColumn>
          </TableHeader>
          <TableBody
            items={data}
            isLoading={false}
            loadingContent={<Spinner />}
          >
            {item => (
              <TableRow key={item?.id}>
                <TableCell>{item?.name}</TableCell>
                <TableCell>{item?.company}</TableCell>
                <TableCell>{item?.email}</TableCell>
                <TableCell>{item?.engaged}</TableCell>
                <TableCell>{item?.position}</TableCell>
                <TableCell>{item?.lastContact}</TableCell>
                {/* <TableCell>
                  {' '}
                  {dayjs.utc(item?.transactionDate).format('DD.MM.YYYY')}
                </TableCell> */}
                {/* <TableCell>
                  {' '}
                  <Chip
                    className="text-default-900 dark:text-white"
                    color="success"
                    aria-label={`Status: ${item?.status}`}
                  >
                    {t('active')}
                  </Chip>
                </TableCell> */}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex justify-center my-2">
          {selectedRows?.length > 0 ? (
            <ButtonGroup className="bottom-3 z-50 fixed">
              <Button className="border-divider border-r-1">
                {t('exportData')}
              </Button>

              <Tooltip
                classNames={{
                  content: 'text-default-900 dark:text-white'
                }}
                content={t('sendQuickEmail')}
              >
                <Button className="border-divider border-r-1">
                  <FcFlashOn size={20} />
                </Button>
              </Tooltip>
              <Tooltip
                classNames={{
                  content: 'text-default-900 dark:text-white'
                }}
                content={t('createGroup')}
              >
                <Button className="border-divider border-r-1">
                  <FcAddColumn size={20} />
                </Button>
              </Tooltip>
              <Tooltip
                classNames={{
                  content: 'text-default-900 dark:text-white'
                }}
                content={t('addItToExistGroups')}
              >
                <Button className="border-divider border-r-1">
                  <FcAddDatabase size={20} />
                </Button>
              </Tooltip>
              <Tooltip
                classNames={{
                  content: 'text-default-900 dark:text-white'
                }}
                content={t('deleteLeads')}
              >
                <Button>
                  <FcDeleteDatabase size={20} />
                </Button>
              </Tooltip>
            </ButtonGroup>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default LeadsTable;
