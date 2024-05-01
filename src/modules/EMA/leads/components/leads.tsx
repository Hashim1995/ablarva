/* eslint-disable no-unused-vars */
import { useState } from 'react';
import LeadsPage from '../pages/leads-page';
import { ILeadItem } from '../types';
import LeadsFilter from './leads-filter';
import LeadsTable from './leads-table';

function Leads() {
  const dummyLeads: ILeadItem[] = Array.from({ length: 10 }, (_, index) => ({
    id: (index + 1).toString(),
    company: `Company ${index + 1}`,
    email: `employee${index + 1}@company${index + 1}.com`,
    engaged: Math.floor(Math.random() * 100),
    position: `Position ${index + 1}`,
    lastContact: `2024-${String((index % 12) + 1).padStart(2, '0')}-${String(
      (index % 28) + 1
    ).padStart(2, '0')}`,
    name: `Employee ${index + 1}`
  }));

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(2);
  const [data, setData] = useState<ILeadItem[]>(dummyLeads);

  return (
    <div className="p-5 w-full h-screen overflow-auto remove-scrollbar">
      <div className="flex flex-col justify-center gap-4 xl:gap-6 mx-auto lg:px-0 w-full remove-scrollbar">
        <LeadsFilter />
        <LeadsTable
          data={data}
          totalCount={totalCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Leads;
