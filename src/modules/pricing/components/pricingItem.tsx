import { ILimitItem, IPackageItem } from '@/models/payment';

import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

interface IPricingItemProps {
  item: IPackageItem;
  verified: boolean;
  packageId: number;
  onOpen: () => void;
  modalOnopen: () => void;
  setWantedPackageId: Dispatch<SetStateAction<number>>;
}
function PricingItem({
  item,
  setWantedPackageId,
  verified,
  packageId,
  onOpen,
  modalOnopen
}: IPricingItemProps) {
  const { t } = useTranslation();

  return (
    <Card
      key={item?.packageId}
      className={`gradient-bg p-4 rounded-lg shadow-lg w-1/4 ${
        packageId === item.packageId ? ' border-3 border-success-500' : ''
      }`}
    >
      <CardHeader className="text-white text-center flex flex-col">
        <h2 className="text-lg ">{item?.packageName}</h2>
        <p className="text-3xl font-bold ">{item?.price} / ay</p>
        <p className=" text-default-500  text-sm ">
          {item?.packageDescription}
        </p>
      </CardHeader>
      <CardBody>
        <ul className="">
          {item?.limitDetails?.map((limit: ILimitItem) => (
            <li className="flex justify-between items-center text-white text-sm mt-2">
              <span>{limit?.label}</span>
              <span>{limit?.price}</span>
            </li>
          ))}
        </ul>
      </CardBody>

      <Button
        variant="bordered"
        onClick={() => {
          if (!verified) {
            modalOnopen();
          } else {
            setWantedPackageId(item.packageId);
            onOpen();
          }
        }}
        className="w-full text-white py-2 rounded-lg text-mda mt-4 "
      >
        {packageId === item.packageId ? t('updatePackage') : t('joinNow')}
      </Button>
    </Card>
  );
}

export default PricingItem;
