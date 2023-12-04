/* eslint-disable react/jsx-no-useless-fragment */
import { useState, useEffect } from 'react';
import { Button, Spinner } from '@nextui-org/react';
import { BsArrowRightShort, BsFillXCircleFill } from 'react-icons/bs';
import { dictionary } from '@/utils/constants/dictionary';
import { PaymentService } from '@/services/payment-services/payment-services';
import {
  IPricingData,
  IPricingTableBody,
  IPricingTableHeader
} from '@/models/payment';
import Header from './header/header';

function Pricing() {
  const [activetab, setActiveTab] = useState<number>(1);
  const [data, setData] = useState<IPricingData>();
  const [loading, setLoading] = useState<boolean>(false);

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
            } mb-3 text-[16px] xl:text-[20px] w-[180px] xl:w-[200px] h-[42px] xl:h-[50px] mr-[10px] xl:mr-0 bg-white hover:!bg-black hover:!text-white border border-black font-bold`}
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
            } mb-3 text-[16px] xl:text-[20px] w-[180px] xl:w-[200px] h-[42px] xl:h-[50px] mr-[10px] xl:mr-0 bg-white hover:!bg-black hover:!text-white border border-black font-bold`}
            type="submit"
            onClick={() => {
              setActiveTab(2);
            }}
          >
            {dictionary.az.aiAssistant}
          </Button>
        </div>
        <div className="col-span-12 xl:col-span-10 row-span-6 xl:col-start-3 bg-white rounded-2xl">
          {!loading ? (
            <table className="w-full transition ease-in-out delay-150 duration-300">
              <thead className="border-b-1">
                <td
                  key={window.crypto.randomUUID()}
                  className="xl:h-[262px] w-[189px] bg-black text-white text-[16px] xl:text-[20px] px-2 text-center rounded-tl-2xl"
                >
                  {dictionary.az.tariffTitle}
                </td>

                {data?.tableHeaders?.map((hItem: IPricingTableHeader) => (
                  <>
                    <td
                      key={window.crypto.randomUUID()}
                      className="xl:h-[262px] text-center w-max bg-transparent border-r-2 last:border-r-0"
                    >
                      <div className="flex flex-col items-center h-full px-2.5 py-3 xl:py-5">
                        <p className="text-[16px] xl:text-[20px] font-bold leading-6 h-[45px] sm:h-auto">
                          {hItem.name || 'test'}
                        </p>
                        <div className="flex flex-row items-center py-2 xl:py-6">
                          <p className="text-[20px] sm:text-[24px] md:text-[30px] xl:text-[40px] font-bold leading-6">
                            {hItem.price || 'test'} ₼
                          </p>
                          <p className="text-[16px] sm:text-[18] xl:text-[24px] leading-6 mb-[-3px] font-bold text-[#C3C1C1]">
                            /{dictionary.az.month}
                          </p>
                        </div>
                        <p className="w-fit text-[#C3C1C1] text-[14px] xl:text-[16px] leading-5 xl:leading-6 xl:px-5 pb-2 xl:pb-6">
                          {hItem.description || 'test'}
                        </p>
                        <Button
                          className="bg-black text-white text-[14px] xl:text-[16px] border py-5 px-2 sm:px-5 xl:px-7"
                          type="submit"
                          endContent={<BsArrowRightShort size={20} />}
                        >
                          {dictionary.az.joinNow}
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
    </div>
  );
}

export default Pricing;
