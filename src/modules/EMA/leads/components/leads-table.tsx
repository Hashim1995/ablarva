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
import {
  FcAddColumn,
  FcAddDatabase,
  FcDeleteDatabase,
  FcFlashOn
} from 'react-icons/fc';

import { t } from 'i18next';
import { useEffect, useState } from 'react';
import AppHandledDrawer from '@/components/layout/drawer/app-handled-drawer';
import Empty from '@/components/layout/empty';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import { ILeadItem } from '../types';
import LeadViewModal from './lead-view-modal';
import QuickMail from './quick-mail';
import LeadsAddModal from './leads-add-modal';

interface IProps {
  tableLoading: boolean;
  data: ILeadItem[];
  setCurrentPage: setState<number>;
  currentPage: number;
  totalCount: number;
  setReFetch: setState<boolean>;
}
function LeadsTable({
  data,
  tableLoading,
  setCurrentPage,
  currentPage,
  setReFetch,
  totalCount
}: IProps) {
  const [selectionState, setSelectionState] = useState({
    allSelected: false,
    selectedRows: [] as ILeadItem[]
  });
  const [quickMailDrawer, setQuickMailDrawer] = useState(false);

  const {
    isOpen: viewIsOpen,
    onOpen: viewOnOpen,
    onOpenChange: viewOnOpenChange
  } = useDisclosure();
  const {
    isOpen: addIsOpen,
    onOpen: addOnOpen,
    onOpenChange: addOnOpenChange,
    onClose: addOnClose
  } = useDisclosure();

  const toggleRowSelection = (item: ILeadItem) => {
    setSelectionState(prev => {
      const isSelected = prev.selectedRows.some(row => row.id === item.id);
      const selectedRows = isSelected
        ? prev.selectedRows.filter(row => row.id !== item.id)
        : [...prev.selectedRows, item];

      return {
        ...prev,
        allSelected: selectedRows.length === data.length,
        selectedRows
      };
    });
  };

  const toggleAllRowsSelection = () => {
    setSelectionState(prev => {
      if (prev.allSelected) {
        return { allSelected: false, selectedRows: [] };
      }
      return { allSelected: true, selectedRows: [...data] };
    });
  };

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
            isSelected={
              selectionState.selectedRows.some(row => row.id === item.id) ||
              selectionState.allSelected
            }
            onChange={() => toggleRowSelection(item)}
          />
        </TableCell>
        <TableCell>{item?.name}</TableCell>
        <TableCell>{item?.company}</TableCell>
        <TableCell>{item?.email}</TableCell>
        <TableCell>{item?.country}</TableCell>
        <TableCell>{item?.linkedin}</TableCell>
        <TableCell>{item?.website}</TableCell>
        <TableCell>{item?.jobTitle}</TableCell>
      </TableRow>
    ));

  useEffect(() => {
    setSelectionState({
      allSelected: false,
      selectedRows: [] as ILeadItem[]
    });
  }, [currentPage]);

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div className="relative flex justify-between items-center pe-6">
        <h3 className="font-semibold text-default-800 text-xl dark:text-white">
          {t('leadsTable')} 😎
        </h3>
        <AppHandledSolidButton onClick={addOnOpen} form="leads-filter-form">
          {t('addBtn')}
        </AppHandledSolidButton>
      </div>
      <div className="border-1 border-divider bg-transparent shadow-lg p-6 rounded-2xl w-full">
        <Table
          color="default"
          removeWrapper
          className="text-default-900 dark:text-white overflow-x-auto overflow-y-hidden"
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
                total={Math.ceil(totalCount / 10)}
                page={currentPage}
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
            <TableColumn>{t('country').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{'LinkedIn'.toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('website').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('jobTitle').toLocaleUpperCase()}</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={<Empty />}
            isLoading={tableLoading}
            loadingContent={<Spinner />}
          >
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
                <Button
                  onClick={() => setQuickMailDrawer(true)}
                  className="border-divider border-r-1"
                >
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
      {addIsOpen && (
        <LeadsAddModal
          setReFetch={setReFetch}
          addOnClose={addOnClose}
          onOpenChange={addOnOpenChange}
          isOpen={addIsOpen}
        />
      )}
      <AppHandledDrawer
        open={quickMailDrawer}
        onClose={() => setQuickMailDrawer(z => !z)}
        direction="right"
        size={750}
        className="bg-content1 h-full"
      >
        {quickMailDrawer && (
          <QuickMail
            selectedLeads={selectionState?.selectedRows}
            setQuickMailDrawer={setQuickMailDrawer}
          />
        )}
      </AppHandledDrawer>
    </div>
  );
}

export default LeadsTable;
