import EmaBillingHistory from './ema-billing-history';
import EmaBillingPackets from './ema-billing-packages';
import EmaBillingStats from './ema-billing-stats';

function EmaBilling() {
  return (
    <div className="p-5 w-full h-screen overflow-auto remove-scrollbar">
      <div className="flex flex-col justify-center gap-4 xl:gap-6 mx-auto lg:px-0 w-full remove-scrollbar">
        <EmaBillingStats />
        <EmaBillingPackets />
        <EmaBillingHistory />
      </div>
    </div>
  );
}

export default EmaBilling;
