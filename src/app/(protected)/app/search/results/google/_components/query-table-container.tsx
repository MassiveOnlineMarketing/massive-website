import React from 'react'
import DataTable from './data-table'
import { columns } from './columns'
import { QueryObject } from '../page'

type Props = {
  queryData?: QueryObject[]
}

const QueryTableContainer = ({ queryData }: Props) => {
  return (
    <div>
      {
        queryData && <DataTable data={queryData} columns={columns()} />
      }

    </div>
  )
}

export default QueryTableContainer