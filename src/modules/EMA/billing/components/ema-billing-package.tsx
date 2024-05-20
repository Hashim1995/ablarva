/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import { RootState } from '@/redux/store';
import { EmaBillingServices } from '@/services/ema/ema-billing-services';

import { Card, CardBody, CardHeader } from '@nextui-org/react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useDarkMode from 'use-dark-mode';
import { IEmaPackageItem, IEmaPackageItemLimitDetails } from '../types';

/**
 * Props for the EmaBillingPackage component.
 */
interface IEmaBillingPackageProps {
  item: IEmaPackageItem;
  verified: boolean;
  packageId: number;
  buyModalOnOpen: () => void;
  modalEmailOnOpen: () => void;
  buyDirectly: (id: IEmaPackageItem['packageId']) => void;

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
  modalEmailOnOpen,
  buyDirectly
}: IEmaBillingPackageProps): React.ReactElement {
  const { t } = useTranslation();

  const { currentSubscription } = useSelector(
    (state: RootState) => state.user.user
  );

  const darkMode = useDarkMode(false);
  const navigate = useNavigate();
  const [cancelLoading, setCancelLoading] = useState(false);

  async function cancelSubscription() {
    setCancelLoading(true);
    try {
      await EmaBillingServices.getInstance().cancelSubscription();
      navigate('/');
    } catch (err) {
      console.log(err);
    } finally {
      setCancelLoading(false);
    }
  }

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
        <p className="font-bold text-3xl">
          {item?.price} AZN / {t('month')}
        </p>
        <p className="text-sm">{item?.packageDescription}</p>
      </CardHeader>
      <CardBody>
        <ul className="">
          {item?.limitDetails?.map((limit: IEmaPackageItemLimitDetails) => (
            <li className="flex justify-between items-center mt-2 text-sm">
              <span>{limit?.label}</span>
              <span>{limit?.price}</span>
            </li>
          ))}
        </ul>
      </CardBody>
      <div className="flex items-center gap-2 mt-4 py-2">
        {packageId === item.packageId && (
          <AppHandledBorderedButton
            title="Cancel package"
            aria-label="Cancel package"
            color="danger"
            onClick={cancelSubscription}
            className="w-1/2"
            isLoading={cancelLoading}
          >
            {t('cancel')}
          </AppHandledBorderedButton>
        )}

        <AppHandledSolidButton
          title="Join Now"
          aria-label="Join Now"
          onClick={() => {
            // If the user is not verified, open the email modal. Otherwise, open the buy modal.
            if (!verified) {
              modalEmailOnOpen();
            } else {
              setWantedPackageId(item.packageId);
              if (currentSubscription) {
                buyModalOnOpen();
              } else {
                buyDirectly(item.packageId);
              }
            }
          }}
          className={` ${packageId === item.packageId ? 'w-1/2' : 'w-full'}`}
        >
          {packageId === item.packageId
            ? t('renew')
            : item?.hasFreeTrial
            ? t('startFreeTrial')
            : t('joinNow')}
        </AppHandledSolidButton>
      </div>
    </Card>
  );
}

export default EmaBillingPackage;
