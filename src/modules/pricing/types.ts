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

export type { IPricingListBody, IPricingListHeader, IPricingListData };
