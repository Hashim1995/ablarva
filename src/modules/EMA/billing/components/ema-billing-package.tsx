import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import { ILimitItem, IPackageItem } from '@/models/payment';

import { Card, CardBody, CardHeader } from '@nextui-org/react';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import useDarkMode from 'use-dark-mode';

/**
 * Props for the EmaBillingPackage component.
 */
interface IEmaBillingPackageProps {
  item: IPackageItem;
  verified: boolean;
  packageId: number;
  buyModalOnOpen: () => void;
  modalEmailOnOpen: () => void;
  setWantedPackageId: Dispatch<SetStateAction<number>>;
}

/**
 * @description Renders the pricing item. This component displays the pricing item.
 * @param {IEmaBillingPackageProps} props - The props for the component.
 * @param {IPackageItem} props.item - The package item.
 * @param {boolean} props.verified - The user's verification status.
 * @param {number} props.packageId - The user's package ID.
 * @param {() => void} props.buyModalOnOpen - The function to open the buy modal.
 * @param {() => void} props.modalEmailOnOpen - The function to open the email modal.
 * @param {Dispatch<SetStateAction<number>>} props.setWantedPackageId - The function to set the wanted package ID.
 * @returns {JSX.Element} The rendered component.
 */

function EmaBillingPackage({
  item,
  setWantedPackageId,
  verified,
  packageId,
  buyModalOnOpen,
  modalEmailOnOpen
}: IEmaBillingPackageProps): React.ReactElement {
  const { t } = useTranslation();

  const darkMode = useDarkMode(false);

  return (
    <Card
      key={item?.packageId}
      className={` w-full ${
        darkMode.value ? 'gradient-bg' : ''
      } p-4 rounded-lg shadow-lg w-72 ${
        packageId === item.packageId
          ? ' border-2  border-success-500'
          : 'border-divider border-1'
      }`}
    >
      <CardHeader className="flex flex-col text-center">
        <h2 className="text-lg">{item?.packageName}</h2>
        <p className="font-bold text-3xl">{item?.price} / ay</p>
        <p className="text-sm">{item?.packageDescription}</p>
      </CardHeader>
      <CardBody>
        <ul className="">
          {item?.limitDetails?.map((limit: ILimitItem) => (
            <li className="flex justify-between items-center mt-2 text-sm">
              <span>{limit?.label}</span>
              <span>{limit?.price}</span>
            </li>
          ))}
        </ul>
      </CardBody>

      <AppHandledSolidButton
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
        className="mt-4 py-2 rounded-lg w-full"
      >
        {packageId === item.packageId ? t('updatePackage') : t('joinNow')}
      </AppHandledSolidButton>
    </Card>
  );
}

export default EmaBillingPackage;
