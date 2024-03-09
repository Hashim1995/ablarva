import { IGlobalResponse } from "@/models/common"

interface IEmailItem {
    id: string,
    emailAddress: string,
    createdAt?: any
    actions?: unknown
}

type IEmailItemCreate = Pick<IEmailItem, 'emailAddress'>;
type IEmailItemUpdate = Pick<IEmailItem, 'emailAddress' | 'id'>;

interface IEmailListResponse extends IGlobalResponse {
    data: {
        pagedData: IEmailItem[];
        totalPages: number;
    }

}

export type { IEmailItem, IEmailListResponse, IEmailItemCreate, IEmailItemUpdate }
