import { ILimitItem, IPackageItem } from '@/models/payment';

import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Props for the PricingItem component.
 */
interface IPricingItemProps {
  item: IPackageItem;
  verified: boolean;
  packageId: number;
  buyModalOnOpen: () => void;
  modalEmailOnOpen: () => void;
  setWantedPackageId: Dispatch<SetStateAction<number>>;
}

/**
 * @description Renders the pricing item. This component displays the pricing item.
 * @param {IPricingItemProps} props - The props for the component.
 * @param {IPackageItem} props.item - The package item.
 * @param {boolean} props.verified - The user's verification status.
 * @param {number} props.packageId - The user's package ID.
 * @param {() => void} props.buyModalOnOpen - The function to open the buy modal.
 * @param {() => void} props.modalEmailOnOpen - The function to open the email modal.
 * @param {Dispatch<SetStateAction<number>>} props.setWantedPackageId - The function to set the wanted package ID.
 * @returns {JSX.Element} The rendered component.
 */

function PricingItem({
  item,
  setWantedPackageId,
  verified,
  packageId,
  buyModalOnOpen,
  modalEmailOnOpen
}: IPricingItemProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <Card
      key={item?.packageId}
      className={`gradient-bg p-4 rounded-lg shadow-lg w-1/4 ${
        packageId === item.packageId ? ' border-3 border-success-500' : ''
      }`}
    >
      <CardHeader className="text-default-900 dark:text-white text-center flex flex-col">
        <h2 className="text-lg ">{item?.packageName}</h2>
        <p className="text-3xl font-bold ">{item?.price} / ay</p>
        <p className=" text-default-500  text-sm ">
          {item?.packageDescription}
        </p>
      </CardHeader>
      <CardBody>
        <ul className="">
          {item?.limitDetails?.map((limit: ILimitItem) => (
            <li className="flex justify-between items-center text-default-900 dark:text-white text-sm mt-2">
              <span>{limit?.label}</span>
              <span>{limit?.price}</span>
            </li>
          ))}
        </ul>
      </CardBody>

      <Button
        variant="bordered"
        title="Join Now"
        aria-label="Join Now"
        onClick={() => {
          // If the user is not verified, open the email modal. Otherwise, open the buy modal.
          if (!verified) {
            modalEmailOnOpen();
          } else {
            setWantedPackageId(item.packageId);
            buyModalOnOpen();
          }
        }}
        className="w-full text-default-900 dark:text-white py-2 rounded-lg text-mda mt-4 "
      >
        {packageId === item.packageId ? t('updatePackage') : t('joinNow')}
      </Button>
    </Card>
  );
}

export default PricingItem;
