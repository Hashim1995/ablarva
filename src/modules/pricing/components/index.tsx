/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
// import { Button, Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import { pricingList } from '@/assets/dummy';
import { Button } from '@nextui-org/react';
import { BsArrowRightShort, BsFillXCircleFill } from 'react-icons/bs';
import { IPricingListBody, IPricingListHeader } from '../types';

function Pricing() {
  return (
    <div className=" container-fluid h-full mx-auto ">
      <div className="h-40"> </div>
      <div className="grid grid-cols-12 grid-rows-6 gap-3">
        <div className="col-span-2 row-span-6 flex flex-col items-center justify-center">
          <Button
            className="mb-3 text-[3xl] w-[200px] bg-white hover:bg-black active:bg-black active:text-white hover:text-white border border-black font-bold"
            type="submit"
          >
            AI sadə
          </Button>
          <Button
            className="mb-3 text-[3xl] w-[200px] bg-white hover:bg-black active:bg-black active:text-white hover:text-white border border-black font-bold"
            type="submit"
          >
            AI köməkçi ilə
          </Button>
          <Button
            className="w-[200px] text-[3xl] bg-white hover:bg-black active:bg-black active:text-white hover:text-white border border-black font-bold"
            type="submit"
          >
            Hamısı birində
          </Button>
        </div>
        <div className="col-span-10 row-span-6 col-start-3 bg-white p-3 rounded-2xl">
          <table>
            <thead className="border-b-1">
              {pricingList?.tHeader?.map((hItem: IPricingListHeader) => (
                <>
                  {hItem.price ? (
                    <td
                      key={hItem.id}
                      className="h-[262px] text-center w-max bg-transparent border-r-2 last:border-r-0"
                    >
                      <div className="flex flex-col items-center h-full  px-2.5 py-5">
                        <p className="text-3xl font-bold leading-6">
                          {hItem.title || 'test'}
                        </p>
                        <div className="flex flex-row items-center py-6">
                          <p className="text-[40px] font-bold leading-6">
                            {hItem.price || 'test'} ₼
                          </p>
                          <p className="text-[24px] leading-6 mb-[-3px] font-bold text-[#C3C1C1]">
                            /ay
                          </p>
                        </div>
                        <p className="w-fit text-[#C3C1C1] leading-6 px-5 pb-6">
                          {hItem.desciption || 'test'}
                        </p>
                        <Button
                          className="bg-black text-white text-xl border py-5 px-7"
                          type="submit"
                          endContent={<BsArrowRightShort size={20} />}
                        >
                          İndi qoşul
                        </Button>
                      </div>
                    </td>
                  ) : (
                    <td
                      key={hItem.id}
                      className="h-[262px] w-[189px] bg-black text-white text-3xl text-center rounded-tl-2xl"
                    >
                      Tarifə nələr daxildir?
                    </td>
                  )}
                </>
              ))}
            </thead>
            <tbody>
              {pricingList?.tBody?.map((rItem: IPricingListBody) => (
                <tr
                  className="w-[189px] odd:bg-white even:bg-slate-100"
                  key="1"
                >
                  <td className="text-center text-3xl py-3 px-3 font-bold border-r-2 last:border-r-0">
                    {rItem.title}
                  </td>
                  <td className="text-center text-3xl py-3 px-3 font-medium border-r-2 last:border-r-0">
                    {rItem.chatLimit || (
                      <div className="w-auto bg-transparent flex items-center justify-center">
                        <BsFillXCircleFill
                          style={{ fill: '#EB0000' }}
                          size={34}
                        />
                      </div>
                    )}
                  </td>
                  <td className="text-center text-3xl py-3 px-3 font-medium border-r-2 last:border-r-0">
                    {rItem.imgLimit || (
                      <div className="w-auto bg-transparent flex items-center justify-center">
                        <BsFillXCircleFill
                          style={{ fill: '#EB0000' }}
                          size={34}
                        />
                      </div>
                    )}
                  </td>
                  <td className="text-center text-3xl py-3 px-3 font-medium border-r-2 last:border-r-0">
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
        </div>
      </div>
    </div>
  );
}

export default Pricing;
