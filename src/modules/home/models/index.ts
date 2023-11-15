import React from 'react';
import { IGlobalResponse } from '@/models/common';

interface IStatisticsListItem {
  Id?: number | null;
  Name?: string | null;
  Count?: number | null;
  loading?: boolean | null;
  Icon?: React.ReactNode | null;
}

interface IGetStatisticsListResponse extends IGlobalResponse {
  Data: {
    Datas: IStatisticsListItem[];
    TotalDataCount: number;
  };
}

export type { IStatisticsListItem, IGetStatisticsListResponse };
