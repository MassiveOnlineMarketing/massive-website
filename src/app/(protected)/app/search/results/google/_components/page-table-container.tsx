import React from 'react'

import { GoogleResultFilterWithUrls } from '@/dashboard/types'
import { DateRangeObject } from '../../_components/date-range-button'

import useFetchData from '../hooks/use-fetch-search-result-api-data'

import DataTable from './query-table'
import { columns } from './query-columns'
import { LoadingSpinner } from '@/components/loading-spinner'

type Props = {
  site_url: string | null | undefined;
  refresh_token: string | null;
  selectedFilter: GoogleResultFilterWithUrls[];
  selectedRange: DateRangeObject;
}

const PageTableContainer = ({ site_url, refresh_token, selectedFilter, selectedRange }: Props) => {
  const { data: queryResponse, isLoading: queryIsLoading } = useFetchData({
    endpoint: "query_data",
    site_url,
    refresh_token,
    selectedRange,
    selectedFilter,
  });


  if (queryIsLoading || !queryResponse) return <div className='w-full h-full'><LoadingSpinner className='absolute left-1/2 top-1/2 -translate-x-1/2'/></div>

  return (
    <DataTable data={queryResponse} columns={columns()} />
  )
}

export default PageTableContainer