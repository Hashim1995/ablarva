/* eslint-disable no-nested-ternary */
import Empty from '@/components/layout/empty';
import VerifyEmail from '@/core/static-components/verify-email';
import { RootState } from '@/redux/store';
import { EmaBillingServices } from '@/services/ema/ema-billing-services';
import {
  useDisclosure,
  Skeleton,
  Card,
  CardBody,
  CardHeader
} from '@nextui-org/react';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import useDarkMode from 'use-dark-mode';
import { IEmaPackageItem, IEmaPackageListResponse } from '../types';
import PackageItem from './ema-billing-package';
import AreYouSureResetPackage from './are-you-sure-reset-package';
import EmaBillingEnterpriseModal from './ema-billing-enterprise-modal';

function EmaBillingPackages() {
  const [packagesList, setPackagesList] =
    useState<IEmaPackageListResponse['data']>();
  const [loading, setLoading] = useState<boolean>(true);
  const darkMode = useDarkMode(false);
  const {
    isOpen: buyModalIsOpen,
    onOpen: buyModalOnOpen,
    onOpenChange: buyModalOnOpenChange
  } = useDisclosure();
  const [wantedPackageId, setWantedPackageId] = useState<number>(0);
  const { verified } = useSelector((state: RootState) => state?.user?.user);
  const [buyPackageLoader, setBuyPackageLoader] = useState<boolean>(false);
  const {
    isOpen: modalEmailIsopen,
    onOpen: modalEmailOnOpen,
    onOpenChange: modalEmailOpenChange
  } = useDisclosure();

  const {
    isOpen: enterpriseIsopen,
    onOpen: enterpriseOnOpen,
    onOpenChange: enterpriseOpenChange,
    onClose: enterpriseOnClose
  } = useDisclosure();

  const packageId = useSelector(
    (state: RootState) => state.user.user.currentSubscription?.packageId
  );

  async function fetchPricing() {
    try {
      const res = await EmaBillingServices.getInstance().getPackages();
      if (res.isSuccess) {
        setPackagesList(res?.data);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchPricing();
  }, []);

  const buyPackage = async (id?: IEmaPackageItem['packageId']) => {
    setBuyPackageLoader(true);
    const payload: Pick<IEmaPackageItem, 'packageId'> = {
      packageId: id || wantedPackageId
    };
    try {
      const res = await EmaBillingServices.getInstance().buyPacket(payload);
      if (res.isSuccess) {
        window.location.href = res.data.paymentLink;
      }
    } catch (err) {
      console.log(err);
    }
    setBuyPackageLoader(false);
  };

  return (
    <div className="flex flex-col justify-center gap-4 xl:gap-6 mx-auto lg:px-0 w-full remove-scrollbar">
      <div className="flex flex-col gap-2 w-full h-full">
        <h3 className="font-semibold text-default-800 text-xl dark:text-white">
          {t('packages')} 💰
        </h3>
        <div className="border-1 border-divider bg-transparent shadow-lg p-6 rounded-2xl w-full">
          {!loading ? (
            <div>
              {packagesList?.length > 0 ? (
                <div className="flex ld:justify-between xl:justify-evenly lg:gap-2 xl:gap-5 space-x-4">
                  {packagesList?.map((item: IEmaPackageItem) => (
                    <PackageItem
                      item={item}
                      buyDirectly={buyPackage}
                      setWantedPackageId={setWantedPackageId}
                      verified={verified}
                      key={item?.packageId}
                      packageId={packageId}
                      modalEmailOnOpen={modalEmailOnOpen}
                      buyModalOnOpen={buyModalOnOpen}
                    />
                  ))}
                  <Card
                    className={` w-full ${
                      darkMode.value ? 'gradient-bg' : ''
                    } p-4 rounded-lg shadow-lg w-72 ${
                      packageId === 0
                        ? ' border-2  border-success-500'
                        : 'border-divider border-1'
                    }`}
                  >
                    <CardHeader className="flex flex-col text-center">
                      <h2 className="text-lg">{t('enterprise')}</h2>
                      <p className="font-bold text-3xl">{t('ondemand')}</p>
                      <p className="text-sm"> {t('enterpriseDescription')}</p>
                    </CardHeader>
                    <CardBody>
                      <ul className="">
                        <li className="flex justify-between items-center mt-2 text-sm">
                          <span>{t('emailLimits')}</span>
                          <span>{t('unlimited')}</span>
                        </li>
                        <li className="flex justify-between items-center mt-2 text-sm">
                          <span>{t('leadLimits')}</span>
                          <span>{t('unlimited')}</span>
                        </li>
                      </ul>
                    </CardBody>
                    <div className="flex items-center gap-2 mt-4 py-2">
                      {packageId === 0 && (
                        <AppHandledBorderedButton
                          title="Cancel package"
                          aria-label="Cancel package"
                          color="danger"
                          // onClick={cancelSubscription}
                          className="w-1/2"
                          // isLoading={cancelLoading}
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
                            enterpriseOnOpen();
                          }
                        }}
                        className={` ${packageId === 0 ? 'w-1/2' : 'w-full'}`}
                      >
                        {packageId === 0 ? t('renew') : t('joinNow')}
                      </AppHandledSolidButton>
                    </div>
                  </Card>
                </div>
              ) : (
                <Empty />
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3 my-5 w-full">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="rounded-lg w-3/5 h-3" />
                <Skeleton className="rounded-lg w-4/5 h-3" />
              </div>
            </div>
          )}
        </div>

        {/**
         * @description Renders the pricing modal. This component displays the pricing modal.
         * @param isOpen The modal's open state.
         * @param onOpenChange The modal's open state change handler.
         * @param onOkFunction The function to execute when the user clicks the "Yes" button.
         * @param loading The loading state.
         * @returns The rendered pricing modal.
         */}
        {buyModalIsOpen && (
          <AreYouSureResetPackage
            loading={buyPackageLoader}
            onOkFunction={buyPackage}
            onOpenChange={buyModalOnOpenChange}
            isOpen={buyModalIsOpen}
          />
        )}

        {enterpriseIsopen && (
          <EmaBillingEnterpriseModal
            onOpenChange={enterpriseOpenChange}
            isOpen={enterpriseIsopen}
            enterpriseOnClose={enterpriseOnClose}
          />
        )}

        {/**
         * @description Renders the email verification modal. This component displays the email verification modal.
         * @param isOpen The modal's open state.
         * @param onOpenChange The modal's open state change handler.
         * @returns The rendered email verification modal.
         */}
        {modalEmailIsopen && (
          <VerifyEmail
            onOpenChange={modalEmailOpenChange}
            isOpen={modalEmailIsopen}
          />
        )}
      </div>
    </div>
  );
}

export default EmaBillingPackages;
