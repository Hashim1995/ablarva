export interface IPricingTableHeader {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface IPricingTableBody {
  chatLimit: number;
  imageLimit: number;
  voiceLimit: number;
  assistantLimit: number;
}

export interface IPricingData {
  categoryId: number;
  categoryName: string;
  tableHeaders: IPricingTableHeader[];
  tableBodies: IPricingTableBody[];
}
