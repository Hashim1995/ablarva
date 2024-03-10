import { IGlobalResponse } from "@/models/common"

interface IEmailReportItem {
    id: string,
    emailAddress: string,
    emailTitle: string,
    emailBody: string,
    createdAt: any
}
interface IEmailReportItemResponse extends IGlobalResponse {
    data: {
        pagedData: IEmailReportItem[];
        totalPages: number;
    };
}
export type { IEmailReportItem, IEmailReportItemResponse }