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

export type { IPricingListHeader, IPricingListBody };
