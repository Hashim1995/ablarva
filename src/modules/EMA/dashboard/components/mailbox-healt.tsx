import { Card, CardBody, CircularProgress } from '@nextui-org/react';
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

export function MailBoxHealt() {
  return (
    <Card className="border-1 border-divider bg-transparent shadow-md px-3 py-5 rounded-xl h-full lg:max-h-[372px] 2xl:max-h-[305px]">
      <CardBody className="gap-2 py-1 overflow-y-auto remove-scrollbar">
        <div className="flex flex-col gap-2">
          {items.map(item => (
            <div key={item.email} className="flex justify-between py-1">
              <div className="flex items-center gap-2.5">
                <FcGoogle size={30} />
                <div className="flex flex-col">
                  <span className="text-[13px] text-default-900">
                    {item.email}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="font-semibold text-success text-xl">
                  <div className="w-12 h-12">
                    <CircularProgress
                      size="lg"
                      value={item?.percentage}
                      showValueLabel
                      classNames={{
                        value: ' text-default-800 dark:text-white'
                      }}
                    />
                  </div>
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
