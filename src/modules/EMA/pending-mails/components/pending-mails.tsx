import { t } from 'i18next';
import PendingMailsFilter from './pending-mails-filter';

function PendingMails() {
  return (
    <div className="p-5 w-full h-screen overflow-auto remove-scrollbar">
      <div className="flex flex-col justify-center gap-4 xl:gap-6 mx-auto lg:px-0 w-full remove-scrollbar">
        <PendingMailsFilter />
        <div className="flex flex-col gap-2 w-full h-full">
          <div className="relative flex justify-between">
            <h3 className="font-semibold text-default-800 text-xl dark:text-white">
              {t('pendingMailsList')} 😎
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendingMails;
