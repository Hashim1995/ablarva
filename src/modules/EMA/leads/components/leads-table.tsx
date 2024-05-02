/* eslint-disable no-unused-vars */
import { setState } from '@/models/common';
import {
  Button,
  ButtonGroup,
  Checkbox,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure
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
import LeadViewModal from './lead-view-modal';

interface IProps {
  data: ILeadItem[];
  setCurrentPage: setState<number>;
  currentPage: number;
  totalCount: number;
}
function LeadsTable({ data, setCurrentPage, currentPage, totalCount }: IProps) {
  const [selectionState, setSelectionState] = useState({
    allSelected: false,
    selectedRows: []
  });

  const {
    isOpen: viewIsOpen,
    onOpen: viewOnOpen,
    onOpenChange: viewOnOpenChange
  } = useDisclosure();

  const toggleRowSelection = (id: string) => {
    setSelectionState(prevSelection => {
      const newSelectedRows = prevSelection.selectedRows.includes(id)
        ? prevSelection.selectedRows.filter(rowId => rowId !== id)
        : [...prevSelection.selectedRows, id];

      const allSelected = newSelectedRows.length === data.length;

      return { ...prevSelection, allSelected, selectedRows: newSelectedRows };
    });
  };

  const toggleAllRowsSelection = () => {
    setSelectionState(prevSelection => {
      const allSelected = !prevSelection.allSelected;
      const selectedRows = allSelected ? data.map(item => item.id) : [];

      return { ...prevSelection, allSelected, selectedRows };
    });
  };
  useEffect(() => {
    console.log(selectionState);
  }, [selectionState]);

  const renderRows = () =>
    data?.map(item => (
      <TableRow
        className="cursor-pointer"
        onClick={() => {
          viewOnOpen();
        }}
        key={item?.id}
      >
        <TableCell>
          <Checkbox
            className={`${selectionState.selectedRows.includes(item.id)}`}
            isSelected={
              selectionState.selectedRows.includes(item.id) ||
              selectionState?.allSelected
            }
            onChange={() => toggleRowSelection(item.id)}
          />
        </TableCell>
        <TableCell>{item?.name}</TableCell>
        <TableCell>{item?.company}</TableCell>
        <TableCell>{item?.email}</TableCell>
        <TableCell>{item?.engaged}</TableCell>
        <TableCell>{item?.position}</TableCell>
        <TableCell>{item?.lastContact}</TableCell>
      </TableRow>
    ));

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div className="relative flex justify-between">
        <h3 className="font-semibold text-default-800 text-xl dark:text-white">
          {t('leadsTable')} 😎
        </h3>
      </div>
      <div className="border-1 border-divider bg-transparent shadow-lg p-6 rounded-2xl w-full">
        <Table
          color="default"
          removeWrapper
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
            <TableColumn>
              <Checkbox
                isSelected={selectionState.allSelected}
                onChange={toggleAllRowsSelection}
              />
            </TableColumn>
            <TableColumn>{t('name').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('company').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('email').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('engaged').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('position').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('lastContact').toLocaleUpperCase()}</TableColumn>
          </TableHeader>
          <TableBody isLoading={false} loadingContent={<Spinner />}>
            {renderRows()}
          </TableBody>
        </Table>
        <div className="flex justify-center my-2">
          {selectionState?.selectedRows?.length > 0 ? (
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
      {viewIsOpen && (
        <LeadViewModal onOpenChange={viewOnOpenChange} isOpen={viewIsOpen} />
      )}
    </div>
  );
}

export default LeadsTable;
