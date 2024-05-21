/* eslint-disable no-unused-vars */
import { IHTTPSParams } from '@/services/adapter-config/config';
import { EmaLeadsService } from '@/services/ema/ema-leads-services';
import { useEffect, useState } from 'react';
import { ILeadItem } from '../types';
import LeadsFilter from './leads-filter';
import LeadsTable from './leads-table';

function Leads() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(2);
  const [leadsData, setLeadsData] = useState<ILeadItem[]>();
  const [queryParams, setQueryParams] = useState<IHTTPSParams[]>([]);
  const [reFetch, setReFetch] = useState<boolean>(false);
  const [tableLoading, setTableLoading] = useState(false);

  async function getLeadsList() {
    setTableLoading(true);
    try {
      const res = await EmaLeadsService.getInstance().getList([
        ...queryParams,
        { name: 'page', value: currentPage }
      ]);
      if (res?.isSuccess) {
        setLeadsData(res?.data?.leads);
        setTotalCount(res?.data?.total);
        setTableLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getLeadsList();
  }, [currentPage, reFetch]);
  return (
    <div className="p-5 w-full h-screen overflow-auto remove-scrollbar">
      <div className="flex flex-col justify-center gap-4 xl:gap-6 mx-auto lg:px-0 w-full remove-scrollbar">
        <LeadsFilter
          setReFetch={setReFetch}
          setQueryParams={setQueryParams}
          setCurrentPage={setCurrentPage}
        />
        <LeadsTable
          data={leadsData}
          totalCount={totalCount}
          tableLoading={tableLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Leads;
