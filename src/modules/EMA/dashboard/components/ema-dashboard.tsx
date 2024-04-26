import { FcLineChart, FcMindMap, FcRadarPlot } from 'react-icons/fc';
import { useTranslation } from 'react-i18next';
import { RemainBalance } from './remain-balance';
import { MailBoxHealt } from './mailbox-healt';
import { EmaDashboardChart } from './chart';
import LastAddedLeads from './last-added-leads';
import { TotalCapacityPerDay } from './total-capacity-pd';

function EmaDashboard() {
  const { t } = useTranslation();
  return (
    // underline class creates a scroll : w-full h-screen remove-scrollbar p-5
    <div className="p-5 w-full h-screen overflow-auto remove-scrollbar">
      <div className="flex flex-wrap xl:flex-nowrap justify-center gap-4 xl:gap-6 mx-auto lg:px-0 w-full remove-scrollbar">
        {/* Right Section */}
        <div className="flex flex-col gap-6 w-full">
          {/* Card Section Top */}
          <div className="flex flex-col justify-end gap-2">
            <h3 className="font-semibold text-default-800 text-xl dark:text-default-900 dark:text-white">
              {t('aviableBalance')} 💎
            </h3>
            <div className="justify-center gap-5 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 w-full">
              <RemainBalance
                icon={<FcLineChart size={30} />}
                title="Remain requests"
                value="6530"
              />
              <RemainBalance
                icon={<FcMindMap size={30} />}
                title="Montly leads"
                value="1928"
              />
              <RemainBalance
                icon={<FcRadarPlot size={30} />}
                title="Prepearing mails"
                value="4210"
              />
            </div>
          </div>

          {/* Chart */}
          <div className="flex flex-col gap-2 h-full">
            <h3 className="font-semibold text-default-800 text-xl dark:text-white">
              {t('statistics')} 📊
            </h3>
            <div className="border-1 border-divider bg-transparent shadow-lg p-6 rounded-2xl w-full">
              <EmaDashboardChart />
            </div>
          </div>
        </div>

        {/* Left Section */}
        <div className="flex flex-col gap-2 w-full xl:max-w-md">
          <div className="flex flex-col md:flex-col flex-wrap md:flex-nowrap justify-center gap-4 max-h-fit">
            <div className="flex flex-col gap-2 h-1/2">
              <h3 className="font-semibold text-default-800 text-xl dark:text-white">
                {t('mailboxHealth')} 🍎
              </h3>
              <MailBoxHealt />
            </div>
            <div className="flex flex-col gap-2 h-1/2">
              <h3 className="font-semibold text-default-800 text-xl dark:text-white">
                {t('totalEmailCapacityPerDay')} 📨
              </h3>
              <TotalCapacityPerDay />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 my-5">
        <div className="flex flex-col gap-2 w-full h-full">
          <h3 className="font-semibold text-default-800 text-xl dark:text-white">
            {t('lastAddedLeads')}
          </h3>

          <div className="border-1 border-divider bg-transparent shadow-lg p-6 rounded-2xl w-full">
            <LastAddedLeads />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full h-full">
          <h3 className="font-semibold text-default-800 text-xl dark:text-white">
            {t('aviableBalance')}
          </h3>

          <div className="border-1 border-divider bg-transparent shadow-lg p-6 rounded-2xl w-full">
            <LastAddedLeads />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmaDashboard;
