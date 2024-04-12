"use client";

import React, { useEffect } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";

import { DataTablePagination } from "./pagination-table";
import { DataTableTopBar } from "./top-bar";
import { Project, Result, SerpResult } from "@prisma/client";
import axios from "axios";


import { getTopTenSerpResults } from "@/serp/data/serp-result";
import { useCurrentRole } from "@/auth/hooks/use-current-role";
import { useCurrentUser } from "@/auth/hooks/use-current-user";
import KeywordDetailsRow from "./keyword-details-row";
import { useIsGscAuthenticated } from "@/auth/hooks/use-is-gsc-authenticated";
import { useProjectDetailsStore } from "@/lib/zustand/project-details-store";
// npm install recharts

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  refresh_token?: string;
}

export type SearchConsoleData = {
  [date: string]: {
    clicks: number;
    ctr: number;
    impressions: number;
    position: number;
  };
};

const isAdmin = false;

export function DataTable<TData, TValue>({
  columns,
  data,
  refresh_token,
}: DataTableProps<TData, TValue>) {
  // sorting state
  const [sorting, setSorting] = React.useState<SortingState>([]);
  // filtering state
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  // visibility state
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  // Row selection state
  const [rowSelection, setRowSelection] = React.useState({})
  // console.log('rowSelection', rowSelection)


  const [selectedRowIndex, setSelectedRowIndex] = React.useState<string | null>(null);
  const projectDetails = useProjectDetailsStore(state => state);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // sorting
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    // filtering
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    // visibility
    onColumnVisibilityChange: setColumnVisibility,
    // row selection
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: { pageIndex: 0, pageSize: 50 },
    },
    getPaginationRowModel: getPaginationRowModel(),
  });


  const [keywordData, setKeywordData] = React.useState<Result | null>(null);
  const [searchConsoleData, setSearchConsoleData] = React.useState<SearchConsoleData | null>(null);
  const [topTenResults, setTopTenResults] = React.useState<SerpResult[]>([]);
  const gscAuthenticated = useIsGscAuthenticated()




  const handleClickRow = (id: string) => (event: React.MouseEvent<HTMLTableRowElement>) => {
    // map over data and return the row that matches the id
    const keyword = data.find((keyword: any) => keyword.keywordId === id)
    let index = parseInt(id, 10);

    setSelectedRowIndex(prevId => prevId === id ? null : id);
    if (!isNaN(index) && index >= 0 && index < data.length) {
      let item = data[index];
      // console.log(item); // Check what the object looks like
      setKeywordData(item as Result);

      if (gscAuthenticated) {
        // @ts-ignore
        fetchSearchConsoleData(item.keywordName);
      }

      // @ts-ignore
      fetchTopTenResults(item.keywordId);

    } else {
      console.log("Invalid index");
    }

    // console.log('id', index)
  }

  const fetchSearchConsoleData = async (keyword: string) => {
    if (!projectDetails || !projectDetails.gscUrl) {
      return;
    }
    if (!refresh_token) {
      return;
    }
    const gscSite = projectDetails.gscUrl;
    const encodedKeyword = encodeURIComponent(keyword);
    const url = `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/api/keyword_data?keyword=${encodedKeyword}&site_url=${gscSite}&refresh_token=${refresh_token}`;
    const res = await axios(url);

    console.log('search console data', res.data)
    setSearchConsoleData(res.data);
  }

  const fetchTopTenResults = async (keywordId: string) => {
    const res = await getTopTenSerpResults(keywordId);
    setTopTenResults(res);
  }

  const deselectAllRows = () => {
    setRowSelection({});
  }



  const numberOfVisibleColumns = table.getVisibleFlatColumns().length;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 mt-8">
      {/* Top bar */}
      <DataTableTopBar
        table={table}
        data={data}
        deselectAllRows={deselectAllRows}
        sorting={sorting}
        setSorting={setSorting}
      />


      {/* Keywords Table */}
      <div className="rounded-md mt-6">
        <Table>
          <TableHeader className="rouded-lg overflow-hidden bg-primary-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className=" rounded-lg">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className={
                        // add rounded corners to first and last cell
                        header.column.getIndex() === 0
                          ? "rounded-l-2xl overflow-hidden "
                          : header.column.getIndex() === numberOfVisibleColumns - 1
                            ? "rounded-r-2xl "
                            : ""
                      }
                      key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      "border-",
                      index % 2 !== 0 ? 'bg-gray-50' : ''
                    )}
                    // handle click row, open keyword detail
                    onClick={handleClickRow(row.id)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className={
                          // add rounded corners to first and last cell
                          cell.column.getIndex() === 0
                            ? "rounded-l-2xl overflow-hidden "
                            : cell.column.getIndex() === numberOfVisibleColumns - 1
                              ? "rounded-r-2xl "
                              : ""
                        }
                        key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>

                  {row.id === selectedRowIndex && (
                    <tr >
                      {keywordData ? (
                        <td className="p-3" colSpan={numberOfVisibleColumns}>
                          <KeywordDetailsRow 
                            gscAuthenticated={gscAuthenticated} 
                            searchConsoleData={searchConsoleData}
                            keywordData={keywordData}
                            topTenResults={topTenResults}
                          />

                          <ResultDetail keywordData={keywordData} topTenSerpResults={topTenResults} />
                          <div>

                          </div>
                        </td>
                      ) : (
                        <td colSpan={numberOfVisibleColumns}>
                          Loading...
                        </td>
                      )}
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* <DataTablePagination table={data} /> */}

      </div>
      <DataTablePagination table={table} />
      {/* Keyword Detail */}
      {/* <KeywordDetail data={data} /> */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}




const ResultDetail = ({ keywordData, topTenSerpResults }: { keywordData: Result, topTenSerpResults: SerpResult[] }) => {
  // console.log('search console data')
  return (
    <div className="mt-10">
      <h2 className="text-xl">Result details</h2>
      <div>
        <p>Meta Title: {keywordData.metaTitle}</p>
        <p>Meta Description: {keywordData.metaDescription}</p>
        <p>Url: <a href={keywordData.url || ''} target="_blank" rel="noopener noreferrer">{keywordData.url}</a></p>
      </div>

      <div className="flex">
        <div className="max-w-[600px]">
          <h2 className="text-2xl mt-8">top ten results</h2>
          <ul>
            {topTenSerpResults.map((result) => (
              <li key={result.id} className="mb-8">
                <a href={result.url || ''} target="_blank" rel="noopener noreferrer">
                  <p>{new URL(result.url).hostname}</p>
                  <p className="text-xl">{result.metaTitle}</p>
                  <p className="text-sm">{result.metaDescription}</p>
                  <p className="mt-2"><span className="font-semibold">Url: </span>{result.url}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="ml-auto">
          <div>
            {Array.isArray(keywordData.relatedSearches) && keywordData.relatedSearches.length > 0 ? (
              <>
                <h2 className="text-xl">RelatedSearches</h2>
                <ul>
                  {keywordData.relatedSearches.map((relatedSearch: any) => (
                    <li key={relatedSearch.query}>{relatedSearch.query}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-xl">No related searches</p>
            )}
          </div>
          <div className="mt-10">
            {Array.isArray(keywordData.peopleAlsoAsk) && keywordData.peopleAlsoAsk.length > 0 ? (
              <>
                <h2 className="text-xl">People also searched for</h2>
                <ul>
                  {keywordData.peopleAlsoAsk.map((peopleAlsoSearchedFor: any) => (
                    <li key={peopleAlsoSearchedFor.question}>{peopleAlsoSearchedFor.question}</li>
                  ))}
                </ul>
              </>
            ) :
              (
                <p className="text-xl">peopleAlsoAsk</p>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}






