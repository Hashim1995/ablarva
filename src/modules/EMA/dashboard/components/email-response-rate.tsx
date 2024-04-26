import { Card, CardBody, CircularProgress } from '@nextui-org/react';

export function EmailResponseRate() {
  return (
    <Card className="border-1 border-divider bg-transparent shadow-md px-3 py-5 rounded-xl h-full">
      <CardBody className="flex justify-center items-center gap-2 py-1 overflow-y-auto remove-scrollbar">
        <CircularProgress
          classNames={{
            svg: 'w-48 h-48 drop-shadow-md',
            track: 'dark:stroke-white/10',
            value: 'text-[2.5em]  text-default-800 dark:text-white'
          }}
          value={70}
          showValueLabel
          size="md"
        />
      </CardBody>
    </Card>
  );
}
