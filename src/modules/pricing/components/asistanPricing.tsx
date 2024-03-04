import { useState, useEffect } from 'react';
import { Skeleton, useDisclosure } from '@nextui-org/react';
import { PaymentService } from '@/services/payment-services/payment-services';
import { IPackageItem, IPackageData } from '@/models/payment';
import { IBuyPacketBody } from '@/modules/pricing/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import VerifyEmail from '@/core/static-components/verify-email';
// import Header from './header/header';
import Empty from '@/components/layout/empty';
import PricingModal from './pricingModal';
import PricingItem from './pricingItem';

function AsistanPricing() {
  const [data, setData] = useState<IPackageData>();
  const [loading, setLoading] = useState<boolean>(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [wantedPackageId, setWantedPackageId] = useState<number>(0);
  const { verified } = useSelector((state: RootState) => state?.user?.user);

  const [buyPackageLoader, setBuyPackageLoader] = useState<boolean>(false);
  // const [currentPackageId, setCurrentPackageId] = useState<number | null>(null);
  const {
    isOpen: modalIsopen,
    onOpen: modalOnopen,
    onOpenChange: modalOpenChange
  } = useDisclosure();

  const packageId = useSelector(
    (state: RootState) => state.user.user.currentSubscription?.packageId
  );

  const fetchPricing = async () => {
    try {
      const res = await PaymentService.getInstance().getPricingList(2);
      if (res.isSuccess) {
        setData(res?.data);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  const buyPackage = async () => {
    setBuyPackageLoader(true);
    const payload: IBuyPacketBody = {
      packageId: wantedPackageId
    };
    try {
      const res = await PaymentService.getInstance().buyPacket(payload);
      if (res.isSuccess) {
        window.location.href = res.data.paymentLink;
      }
    } catch (err) {
      console.log(err);
    }
    setBuyPackageLoader(false);
  };

  return (
    <div>
      {!loading ? (
        <div>
          {data?.packages?.length > 0 ? (
            <div className="flex justify-center space-x-4">
              {data?.packages?.map((item: IPackageItem) => (
                <PricingItem
                  item={item}
                  setWantedPackageId={setWantedPackageId}
                  verified={verified}
                  packageId={packageId}
                  modalOnopen={onOpen}
                  onOpen={modalOnopen}
                />
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      ) : (
        <div className=" my-5 w-full flex items-center gap-3">
          <div>
            <Skeleton className="flex rounded-full w-12 h-12" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
      )}

      {isOpen && (
        <PricingModal
          loading={buyPackageLoader}
          onOkFunction={buyPackage}
          onOpenChange={onOpenChange}
          isOpen={isOpen}
        />
      )}
      {modalIsopen && (
        <VerifyEmail onOpenChange={modalOpenChange} isOpen={modalIsopen} />
      )}
    </div>
  );
}

export default AsistanPricing;
