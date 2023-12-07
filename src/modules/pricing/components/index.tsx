/* eslint-disable react/jsx-no-useless-fragment */
import { useState, useEffect } from 'react';
import { Button, Spinner, useDisclosure } from '@nextui-org/react';
import { BsArrowRightShort, BsFillXCircleFill } from 'react-icons/bs';
import { dictionary } from '@/utils/constants/dictionary';
import { PaymentService } from '@/services/payment-services/payment-services';
import {
  IPricingData,
  IPricingTableBody,
  IPricingTableHeader
} from '@/models/payment';
import { IBuyPacketBody } from '@/modules/pricing/types';
import Header from './header/header';
import PricingModal from './pricingModal';

function Pricing() {
  const [activetab, setActiveTab] = useState<number>(1);
  const [data, setData] = useState<IPricingData>();
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [wantedPackageId, setWantedPackageId] = useState<number>(0);
  const [buyPackageLoader, setBuyPackageLoader] = useState<boolean>(false);
  const [currentPackageId, setCurrentPackageId] = useState<number | null>(null);

  const fetchPricing = async () => {
    setLoading(true);
    try {
      const res = await PaymentService.getInstance().getPricingList(activetab);
      if (res.isSuccess) {
        setData(res.data);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPricing();
  }, [activetab]);

  const list: {
    [key: string]: string;
  }[] = [
    {
      chatLimit: 'Sorgu 1'
    },
    {
      imageLimit: 'Sorğu (Köməkçi ilə)'
    },
    {
      voiceLimit: 'Şəkil generasiya'
    },
    {
      assistantLimit: 'Səsli sorğu'
    }
  ];

  // eslint-disable-next-line no-unused-vars
  const buyPackage = async () => {
    setBuyPackageLoader(true);
    const payload: IBuyPacketBody = {
      packageId: wantedPackageId
    };
    try {
      const res = await PaymentService.getInstance().buyPacket(payload);
      if (res.isSuccess) {
        window.location.href = res.data.paymentLink;
      }
    } catch (err) {
      console.log(err);
    }
    setBuyPackageLoader(false);
  };

  useEffect(() => {
    setCurrentPackageId(2);
  }, []);

  return (
    <div className=" container-fluid h-full mx-auto ">
      <div className="grid grid-cols-12">
        {' '}
        <Header />
      </div>
      <div className="grid grid-cols-12 grid-rows-6 gap-3">
        <div className="col-span-12 xl:col-span-2 row-span-6 flex xl:flex-col items-center justify-start xl:justify-center">
          <Button
            className={`${
              activetab === 1
                ? '!bg-black !text-white'
                : '!bg-white !text-black'
            } mb-3 text-base sm:text-xl xl:text-[20px] px-2 sm:px-4 w-[180px] xl:w-[200px] h-[38px] sm:h-[42px] xl:h-[50px] mr-[10px] xl:mr-0 bg-white hover:!bg-black hover:!text-white border border-black font-bold`}
            type="submit"
            onClick={() => {
              setActiveTab(1);
            }}
          >
            {dictionary.az.aiSimple}
          </Button>
          <Button
            className={`${
              activetab === 2
                ? '!bg-black !text-white'
                : '!bg-white !text-black'
            } mb-3 text-base sm:text-xl xl:text-[20px] px-2 sm:px-4 w-[180px] xl:w-[200px] h-[38px] sm:h-[42px] xl:h-[50px] mr-[10px] xl:mr-0 bg-white hover:!bg-black hover:!text-white border border-black font-bold`}
            type="submit"
            onClick={() => {
              setActiveTab(2);
            }}
          >
            {dictionary.az.aiAssistant}
          </Button>
        </div>
        <div className="col-span-12 xl:col-span-10 componentsScrollBar overflow-x-scroll row-span-6 xl:col-start-3 bg-white rounded-2xl">
          {!loading ? (
            <table className="w-full transition ease-in-out delay-150 duration-300">
              <thead className="border-b-1">
                <td
                  key={window.crypto.randomUUID()}
                  className="xl:h-[262px] w-[189px] bg-black text-white text-base sm:text-[16px] xl:text-[20px] px-2 text-center rounded-tl-2xl"
                >
                  {dictionary.az.tariffTitle}
                </td>

                {data?.tableHeaders?.map((hItem: IPricingTableHeader) => (
                  <>
                    <td
                      key={window.crypto.randomUUID()}
                      className="h-[210px] xl:h-[262px] min-w-[190px] md:min-w-[200px] text-center w-max bg-transparent border-r-2 last:border-r-0 overflow-hidden"
                    >
                      <div className="flex flex-col items-center h-auto px-2.5 py-3 xl:py-5 relative ">
                        {currentPackageId === hItem.id && (
                          <div className="absolute top-0 right-0">
                            <div className="w-40 h-8 absolute top-[0.2rem] -right-12">
                              <div className="h-full w-full bg-black text-white text-center text-[10px] leading-8 transform rotate-45">
                                Mövcud Paket
                              </div>
                            </div>
                          </div>
                        )}

                        <p className="text-base sm:text-[16px] xl:text-[20px] font-bold leading-6 h-[45px] sm:h-auto">
                          {hItem.name || 'test'}
                        </p>
                        <div className="flex flex-row items-center py-2 sm:py-3 xl:py-6">
                          <p className="text-[20px] sm:text-[24px] md:text-[30px] xl:text-[40px] font-bold leading-6">
                            {hItem.price || 'test'} ₼
                          </p>
                          <p className="text-[16px] sm:text-[18px] xl:text-[24px] leading-6 mb-[-3px] font-bold text-[#C3C1C1]">
                            /{dictionary.az.month}
                          </p>
                        </div>
                        <p className="w-fit text-[#C3C1C1] text-sm sm:text-base xl:text-xl min-h-[45px] leading-5 xl:leading-6 xl:px-5 pb-2 xl:pb-6">
                          {hItem.description || 'test'}
                        </p>
                        <Button
                          onClick={() => {
                            setWantedPackageId(hItem.id);
                            onOpen();
                          }}
                          className="bg-black text-white h-auto text-sm sm:text-base xl:text-xl border rounded-lg sm:rounded-xl py-2 sm:py-3 px-3 sm:px-5 xl:px-7"
                          type="submit"
                          endContent={
                            <BsArrowRightShort className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
                          }
                        >
                          {currentPackageId === hItem.id
                            ? 'Paketi yenile'
                            : dictionary.az.joinNow}
                        </Button>
                      </div>
                    </td>
                  </>
                ))}
              </thead>
              <tbody>
                {list?.map((_, index: number) => (
                  <tr
                    className="w-[189px] odd:bg-white even:bg-slate-100"
                    key={window.crypto.randomUUID()}
                  >
                    <td className="text-center text-[14px] sm:text-[16px] xl:text-[20px] py-3 px-3 font-bold border-r-2 last:border-r-0">
                      {Object.values(list[index])}
                    </td>

                    {data?.tableBodies?.map((bItem: IPricingTableBody) => (
                      <td className="text-center text-[14px] sm:text-[16px] xl:text-[20px] py-3 px-3 font-medium border-r-2 last:border-r-0">
                        {/* 
// @ts-ignore */}
                        {bItem[Object.keys(list[index])] || (
                          <div
                            key={window.crypto.randomUUID()}
                            className="w-auto bg-transparent flex items-center justify-center"
                          >
                            <BsFillXCircleFill
                              style={{ fill: '#EB0000' }}
                              className="text-[20px] sm:text-[24px] xl:text-[34px]"
                            />
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Spinner className="flex items-center justify-center h-full" />
          )}
        </div>
      </div>
      {isOpen && (
        <PricingModal
          loading={buyPackageLoader}
          onOkFunction={buyPackage}
          onOpenChange={onOpenChange}
          isOpen={isOpen}
        />
      )}
    </div>
  );
}

export default Pricing;
