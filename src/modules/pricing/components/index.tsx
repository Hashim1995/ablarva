/* eslint-disable react/jsx-no-useless-fragment */
// import { Button, Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import { pricingList1, pricingList2, pricingList3 } from '@/assets/dummy';
import { useState, useEffect } from 'react';
import { Button, Spinner } from '@nextui-org/react';
import { BsArrowRightShort, BsFillXCircleFill } from 'react-icons/bs';
import { IPricingListBody, IPricingListHeader } from '../types';

function Pricing() {
  const [activetab, setActiveTab] = useState<number>(1);
  const [data, setData] = useState<{
    tHeader: IPricingListHeader[];
    tBody: IPricingListBody[];
  } | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    if (activetab === 1) {
      setData(pricingList1);
      setLoading(false);
    }
    if (activetab === 2) {
      setData(pricingList2);
      setLoading(false);
    }
    if (activetab === 3) {
      setData(pricingList3);
      setLoading(false);
    }
  }, [activetab]);

  return (
    <div className=" container-fluid h-full mx-auto ">
      <div className="h-40"> </div>
      <div className="grid grid-cols-12 grid-rows-6 gap-3">
        <div className="col-span-12 xl:col-span-2 row-span-6 flex xl:flex-col items-center justify-start xl:justify-center">
          <Button
            className={`${
              activetab === 1
                ? '!bg-black !text-white'
                : '!bg-white !text-black'
            } mb-3 text-[16px] md:text-[18px] xl:text-[20px] w-[180px] xl:w-[200px] h-[50px] mr-[10px] xl:mr-0 bg-white hover:!bg-black hover:!text-white border border-black font-bold`}
            type="submit"
            onClick={() => {
              setActiveTab(1);
            }}
          >
            AI sadə
          </Button>
          <Button
            className={`${
              activetab === 2
                ? '!bg-black !text-white'
                : '!bg-white !text-black'
            } mb-3 text-[16px] md:text-[18px] xl:text-[20px] w-[180px] xl:w-[200px] h-[50px] mr-[10px] xl:mr-0 bg-white hover:!bg-black hover:!text-white border border-black font-bold`}
            type="submit"
            onClick={() => {
              setActiveTab(2);
            }}
          >
            AI köməkçi ilə
          </Button>
          <Button
            className={`${
              activetab === 3
                ? '!bg-black !text-white'
                : '!bg-white !text-black'
            } mb-3 text-[16px] md:text-[18px] xl:text-[20px] w-[180px] xl:w-[200px] h-[50px] bg-white hover:!bg-black hover:!text-white border border-black font-bold`}
            type="submit"
            onClick={() => {
              setActiveTab(3);
            }}
          >
            Hamısı birində
          </Button>
        </div>
        <div className="col-span-12 xl:col-span-10 row-span-6 xl:col-start-3 bg-white p-3 rounded-2xl">
          {!loading ? (
            <table className="transition ease-in-out delay-150 duration-300">
              <thead className="border-b-1">
                {data?.tHeader?.map((hItem: IPricingListHeader) => (
                  <>
                    {hItem.price ? (
                      <td
                        key={window.crypto.randomUUID()}
                        className="lg:h-[262px] text-center w-max bg-transparent border-r-2 last:border-r-0"
                      >
                        <div className="flex flex-col items-center h-full px-2.5 py-5">
                          <p className="text-[16px] lg:text-[18px] xl:text-[20px] font-bold leading-6">
                            {hItem.title || 'test'}
                          </p>
                          <div className="flex flex-row items-center py-3 lg:py-6">
                            <p className="text-[24px] md:text-[30px] xl:text-[40px] font-bold leading-6">
                              {hItem.price || 'test'} ₼
                            </p>
                            <p className="text-[18] lg:text-[24px] leading-6 mb-[-3px] font-bold text-[#C3C1C1]">
                              /ay
                            </p>
                          </div>
                          <p className="w-fit text-[#C3C1C1] text-[14px] lg:text-[16px] leading-5 lg:leading-6 lg:px-5 pb-3 lg:pb-6">
                            {hItem.desciption || 'test'}
                          </p>
                          <Button
                            className="bg-black text-white text-[14px] lg:text-[16px] border py-5 px-7"
                            type="submit"
                            endContent={<BsArrowRightShort size={20} />}
                          >
                            İndi qoşul
                          </Button>
                        </div>
                      </td>
                    ) : (
                      <td
                        key={window.crypto.randomUUID()}
                        className="lg:h-[262px] w-[189px] bg-black text-white text-[16px] lg:text-[18px] xl:text-[20px] text-center rounded-tl-2xl"
                      >
                        Tarifə nələr daxildir?
                      </td>
                    )}
                  </>
                ))}
              </thead>
              <tbody>
                {data?.tBody?.map((rItem: IPricingListBody) => (
                  <tr
                    className="w-[189px] odd:bg-white even:bg-slate-100"
                    key={window.crypto.randomUUID()}
                  >
                    <td className="text-center text-[16px] lg:text-[18px] xl:text-[20px] py-3 px-3 font-bold border-r-2 last:border-r-0">
                      {rItem.title}
                    </td>
                    <td className="text-center text-[16px] lg:text-[18px] xl:text-[20px] py-3 px-3 font-medium border-r-2 last:border-r-0">
                      {rItem.chatLimit || (
                        <div className="w-auto bg-transparent flex items-center justify-center">
                          <BsFillXCircleFill
                            style={{ fill: '#EB0000' }}
                            size={34}
                          />
                        </div>
                      )}
                    </td>
                    <td className="text-center text-[16px] lg:text-[18px] xl:text-[20px] py-3 px-3 font-medium border-r-2 last:border-r-0">
                      {rItem.imgLimit || (
                        <div className="w-auto bg-transparent flex items-center justify-center">
                          <BsFillXCircleFill
                            style={{ fill: '#EB0000' }}
                            size={34}
                          />
                        </div>
                      )}
                    </td>
                    <td className="text-center text-[16px] lg:text-[18px] xl:text-[20px] py-3 px-3 font-medium border-r-2 last:border-r-0">
                      {rItem.voiceLimit || (
                        <div className="w-auto bg-transparent flex items-center justify-center">
                          <BsFillXCircleFill
                            style={{ fill: '#EB0000' }}
                            size={34}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
}

export default Pricing;
