interface IPricingListHeader {
  id: number;
  title: string;
  price: string | null;
  desciption: string | null;
}

interface IPricingListBody {
  title: string;
  chatLimit: number | null;
  imgLimit: number | null;
  voiceLimit: number | null;
}

interface IPricingListData {
  tHeader: IPricingListHeader[];
  tBody: IPricingListBody[];
}

interface IBuyPacketBody {
  packageId: number;
}
interface IBuyPacketResponse {
  amount: number;
  orderId: string;
  paymentLink: string;
  paymentMessage?: string;
  selectedPackageName: string;
}
export type {
  IPricingListBody,
  IBuyPacketBody,
  IBuyPacketResponse,
  IPricingListHeader,
  IPricingListData
};
