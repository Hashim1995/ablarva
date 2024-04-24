import { Card, CardBody } from '@nextui-org/react';
import { FcGoogle } from 'react-icons/fc';

const items = [
  {
    email: 'johndoe@ramiz.com',
    percentage: 50
  },
  {
    email: 'tomhanks@ramiz.com',
    percentage: 56
  },
  {
    email: 'stanleycrue@ramiz.com',
    percentage: 22
  },
  {
    email: 'dwightschrudder@ramiz.com',
    percentage: 98
  },

  {
    email: 'stanleycrue@ramiz.com',
    percentage: 22
  },
  {
    email: 'dwightschrudder@ramiz.com',
    percentage: 98
  },
  {
    email: 'stanleycrue@ramiz.com',
    percentage: 22
  },
  {
    email: 'dwightschrudder@ramiz.com',
    percentage: 98
  },
  {
    email: 'stanleycrue@ramiz.com',
    percentage: 22
  },
  {
    email: 'dwightschrudder@ramiz.com',
    percentage: 98
  },
  {
    email: 'stanleycrue@ramiz.com',
    percentage: 22
  },
  {
    email: 'dwightschrudder@ramiz.com',
    percentage: 98
  },
  {
    email: 'stanleycrue@ramiz.com',
    percentage: 22
  },
  {
    email: 'dwightschrudder@ramiz.com',
    percentage: 98
  }
];

export function TotalCapacityPerDay() {
  return (
    <Card className=" bg-transparent border-1 border-divider rounded-xl shadow-md px-3  lg:max-h-[372px]  2xl:max-h-[305px]	 h-full">
      <CardBody className="py-1 gap-2 ">
        <div className="flex flex-col gap-2 overflow-y-auto remove-scrollbar">
          {items.map(item => (
            <div key={item.email} className="py-1 flex  justify-between">
              <div className="flex gap-2.5 items-center">
                <FcGoogle size={30} />
                <div className="flex flex-col">
                  <span className="text-default-900 text-[13px]">
                    {item.email}
                  </span>
                </div>
              </div>
              <div className="flex gap-2.5 items-center">
                <span className=" text-md ">{item?.percentage}</span>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
