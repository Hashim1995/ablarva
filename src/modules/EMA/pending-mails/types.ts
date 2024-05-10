interface IPendingListItem {
    to: string;
    id: string | number;
    campaignName: string;
    language: string;
    templateType: string;
    title: string;
    createdAt: any;
    description: string;
}

export type { IPendingListItem }