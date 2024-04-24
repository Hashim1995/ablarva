import { FcLineChart, FcMindMap, FcRadarPlot } from 'react-icons/fc';
import { RemainBalance } from './remain-balance';
import { CardTransactions } from './card-transactions';
import { EmaDashboardChart } from './chart';
import EmaDashboardTable from './table';

function EmaDashboard() {
  return (
    // underline class creates a scroll : w-full h-screen remove-scrollbar p-5
    <div className="w-full h-screen remove-scrollbar p-5  ">
      <div className="flex justify-center remove-scrollbar  gap-4 xl:gap-6  lg:px-0  flex-wrap xl:flex-nowrap  mx-auto w-full">
        <div className=" gap-6 flex flex-col w-full">
          {/* Card Section Top */}
          <div className="flex flex-col gap-2 justify-end">
            <h3 className="text-xl font-semibold">Available Balance</h3>
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
            <h3 className="text-xl font-semibold">Statistics</h3>
            <div className="w-full bg-transparent border-1 border-divider shadow-lg rounded-2xl p-6 ">
              <EmaDashboardChart />
            </div>
          </div>
        </div>

        {/* Left Section */}
        <div className=" gap-2 flex flex-col xl:max-w-md w-full">
          <h3 className="text-xl font-semibold">Mailbox Healt</h3>
          <div className="flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col">
            <div className="h-1/2">
              <CardTransactions />
            </div>
            <div className="h-1/2">
              <CardTransactions />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex my-5 bg-transparent border-1 border-divider  shadow-lg rounded-2xl p-6  flex-col gap-2 justify-end w-full">
          <h3 className="text-xl font-semibold">Available Balance</h3>
          <EmaDashboardTable />
        </div>
        <div className="flex my-5 bg-transparent border-1 border-divider  shadow-lg rounded-2xl p-6  flex-col gap-2 justify-end w-full">
          <h3 className="text-xl font-semibold">Available Balance</h3>
          <EmaDashboardTable />
        </div>
      </div>
    </div>
  );
}

export default EmaDashboard;
