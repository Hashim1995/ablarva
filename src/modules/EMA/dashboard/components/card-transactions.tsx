import { Card, CardBody } from '@nextui-org/react';
import { FcContacts } from 'react-icons/fc';

const items = [
  {
    email: 'johndoe@ramiz.com',
    percentage: '38%'
  },
  {
    email: 'tomhanks@ramiz.com',
    percentage: '53%'
  },
  {
    email: 'stanleycrue@ramiz.com',
    percentage: '2%'
  },
  {
    email: 'dwightschrudder@ramiz.com',
    percentage: '82%'
  }
];

export function CardTransactions() {
  return (
    <Card className=" bg-transparent border-1 border-divider rounded-xl shadow-md px-3 h-full">
      <CardBody className="py-1 gap-2 remove-scrollbar">
        <div className="flex flex-col gap-2">
          {items.map(item => (
            <div key={item.email} className="py-1 flex  justify-between">
              <div className="flex gap-2.5 items-center">
                <FcContacts size={20} />
                <div className="flex flex-col">
                  <span className="text-default-900 text-[13px]">
                    {item.email}
                  </span>
                </div>
              </div>
              <div className="flex gap-2.5 py-2 items-center">
                <span className="text-success text-xl font-semibold">
                  {item.percentage}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
