import { Card, CardBody } from '@nextui-org/react';
import React from 'react';

interface RemainBalanceProps {
  title: string;
  value: string;
  // add icon component type also
  icon: React.ReactNode;
}
export function RemainBalance({ title, value, icon }: RemainBalanceProps) {
  return (
    <Card className="xl:max-w-sm bg-transparent border-1 border-divider rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5 flex flex-col justify-between">
        <div className="flex gap-2.5 items-center">
          {icon}
          <div className="flex flex-col">
            <span className="text-default-900">{title}</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-default-900 text-xl font-semibold">
            {value}
          </span>
        </div>
      </CardBody>
    </Card>
  );
}
