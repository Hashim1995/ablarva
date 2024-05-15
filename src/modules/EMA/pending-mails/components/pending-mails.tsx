import { useState } from 'react';
import PendingMailsFilter from './pending-mails-filter';
import PendingMailsList from './pending-mails-list';

function PendingMails() {
  const [activeTab, setActiveTab] = useState<1 | 2>(1);

  return (
    <div className="p-5 w-full h-screen overflow-auto remove-scrollbar">
      <div className="flex flex-col justify-center gap-4 xl:gap-6 mx-auto lg:px-0 w-full remove-scrollbar">
        <PendingMailsFilter />
        <PendingMailsList activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

export default PendingMails;
