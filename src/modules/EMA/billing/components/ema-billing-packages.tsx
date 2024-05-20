import Empty from '@/components/layout/empty';
import VerifyEmail from '@/core/static-components/verify-email';
import { RootState } from '@/redux/store';
import { EmaBillingServices } from '@/services/ema/ema-billing-services';
import { useDisclosure, Skeleton } from '@nextui-org/react';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EmaPackageBuyModal from './ema-buy-verify-modal';
import { IEmaPackageListResponse } from '../types';
import PackageItem from './ema-billing-package';

function EmaBillingPackages() {
  const [packagesList, setPackagesList] =
    useState<IEmaPackageListResponse['data']>();
  const [loading, setLoading] = useState<boolean>(true);
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

  const buyPackage = async () => {
    setBuyPackageLoader(true);
    const payload: any = {
      packageId: wantedPackageId
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
                  {packagesList?.map((item: any) => (
                    <PackageItem
                      item={item}
                      setWantedPackageId={setWantedPackageId}
                      verified={verified}
                      key={item?.packageId}
                      packageId={packageId}
                      modalEmailOnOpen={modalEmailOnOpen}
                      buyModalOnOpen={buyModalOnOpen}
                    />
                  ))}
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
          <EmaPackageBuyModal
            loading={buyPackageLoader}
            onOkFunction={buyPackage}
            onOpenChange={buyModalOnOpenChange}
            isOpen={buyModalIsOpen}
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
