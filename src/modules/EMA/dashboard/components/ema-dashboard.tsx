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
    <div className="w-full overflow-auto h-screen remove-scrollbar p-5  ">
      <div className="flex justify-center remove-scrollbar  gap-4 xl:gap-6  lg:px-0  flex-wrap xl:flex-nowrap  mx-auto w-full">
        {/* Right Section */}
        <div className=" gap-6 flex flex-col w-full">
          {/* Card Section Top */}
          <div className="flex flex-col gap-2 justify-end">
            <h3 className="text-xl font-semibold">Available Balance 💎</h3>
            <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
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
          <div className="h-full flex flex-col gap-2">
            <h3 className="text-xl font-semibold">{t('statistics')} 📊</h3>
            <div className="w-full bg-transparent border-1 border-divider shadow-lg rounded-2xl p-6 ">
              <EmaDashboardChart />
            </div>
          </div>
        </div>

        {/* Left Section */}
        <div className=" gap-2 flex flex-col xl:max-w-md w-full">
          <div className="flex flex-col justify-center gap-4 max-h-fit flex-wrap md:flex-nowrap md:flex-col">
            <div className="h-1/2  gap-2 flex-col flex">
              <h3 className="text-xl font-semibold">{t('mailboxHealth')} 🍎</h3>
              <MailBoxHealt />
            </div>
            <div className="h-1/2  gap-2 flex-col flex">
              <h3 className="text-xl font-semibold">
                {t('totalEmailCapacityPerDay')} 📨
              </h3>
              <TotalCapacityPerDay />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 my-5">
        <div className="h-full w-full flex flex-col gap-2">
          <h3 className="text-xl font-semibold">{t('lastAddedLeads')}</h3>

          <div className="w-full bg-transparent border-1 border-divider shadow-lg rounded-2xl p-6 ">
            <LastAddedLeads />
          </div>
        </div>
        <div className="h-full w-full flex flex-col gap-2">
          <h3 className="text-xl font-semibold">{t('aviableBalance')}</h3>

          <div className="w-full bg-transparent border-1 border-divider shadow-lg rounded-2xl p-6 ">
            <LastAddedLeads />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmaDashboard;
