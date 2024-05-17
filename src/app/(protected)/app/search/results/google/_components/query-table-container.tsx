import React from 'react'
import DataTable from './query-table'
import { columns } from './query-columns'
import { GoogleResultFilterWithUrls } from '@/dashboard/types'
import useFetchData from '../hooks/use-fetch-search-result-api-data'
import { DateRangeObject } from '../../_components/date-range-button'

type Props = {
  site_url: string | null | undefined;
  refresh_token: string | null;
  selectedFilter: GoogleResultFilterWithUrls[];
  selectedRange: DateRangeObject;
}

const QueryTableContainer = ({ site_url, refresh_token, selectedFilter, selectedRange }: Props) => {
  const { data: queryResponse, isLoading: queryIsLoading } = useFetchData({
    endpoint: "query_data",
    site_url,
    refresh_token,
    selectedRange,
    selectedFilter,
  });

  // if (queryIsLoading) return (
  //   <div>Query Data Is Loading...</div>
  // );

  // if (!queryResponse) return null;

  let TableData: any[] = [];

  if (queryResponse) {
    TableData = queryResponse;
  }

  return (
    <DataTable data={TableData} columns={columns()} />
  )
}

export default QueryTableContainer