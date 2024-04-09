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
import { Result } from "@prisma/client";
import axios from "axios";


import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps, Area, AreaChart, Brush } from 'recharts';
// npm install recharts

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

type SearchConsoleData = {
  [date: string]: {
    clicks: number;
    ctr: number;
    impressions: number;
    position: number;
  };
};

export function DataTable<TData, TValue>({
  columns,
  data,
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


  const handleClickRow = (id: string) => (event: React.MouseEvent<HTMLTableRowElement>) => {
    // map over data and return the row that matches the id
    const keyword = data.find((keyword: any) => keyword.keywordId === id)
    let index = parseInt(id, 10);

    setSelectedRowIndex(prevId => prevId === id ? null : id);
    if (!isNaN(index) && index >= 0 && index < data.length) {
      let item = data[index];
      console.log(item); // Check what the object looks like
      setKeywordData(item as Result);

      // @ts-ignore
      getSearchConsoleData(item.keywordName);
    } else {
      console.log("Invalid index");
    }

    console.log('id', index)
  }

  const getSearchConsoleData = async (keyword: string) => {
    const encodedKeyword = encodeURIComponent(keyword);
    const url = `http://127.0.0.1:5000/api/keyword_data?keyword=${encodedKeyword}`;
    const res = await axios(url);

    console.log('search console data', res.data)
    setSearchConsoleData(res.data);
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
                <>
                  <TableRow
                    key={row.id}
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
                          {searchConsoleData && (
                            <SearchConsoleChart searchConsoleData={searchConsoleData} />
                          )}
                          <KeywordDetailsRow keywordData={keywordData} />
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
                </>
                // // keyword details


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




const KeywordDetailsRow = ({ keywordData }: { keywordData: Result }) => {

  return (
    <div>
      <KeywordIdeas keywordData={keywordData} />


    </div>
  )
}

const KeywordIdeas = ({ keywordData }: { keywordData: Result }) => {

  return (
    <div className="flex mt-10">
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
      <div>
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
  )
}


const SearchConsoleChart = ({ searchConsoleData }: { searchConsoleData: SearchConsoleData }) => {
  // Convert your data into an array of objects
  const data = Object.entries(searchConsoleData).map(([date, data]) => ({
    date,
    ...data
  }));


  return (
    <div className="flex w-full">
      <div style={{ width: '100%', height: 100 }}>
        <h2 className="mx-auto w-fit">Clicks</h2>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ left: -30 }}
          >
            <defs>
              <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" hide={true} />
            <YAxis axisLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="clicks" stroke="#8884d8" fill="url(#colorClicks)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: '100%', height: 100 }}>
        <h2 className="mx-auto w-fit">CTR</h2>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ left: -30 }}
          >
            <defs>
              <linearGradient id="colorCtr" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" hide={true} />
            <YAxis axisLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="ctr" stroke="#82ca9d" fill="url(#colorCtr)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: '100%', height: 100 }}>
        <h2 className="mx-auto w-fit">Impressions</h2>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ left: -30 }}
          >
            <defs>
              <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" hide={true} />
            <YAxis axisLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="impressions" stroke="#ffc658" fill="url(#colorImpressions)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: '100%', height: 100 }}>
        <h2 className="mx-auto w-fit">Position</h2>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ left: -30 }}
          >
            <defs>
              <linearGradient id="colorPosition" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff7300" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" hide={true} />
            <YAxis axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="position" stroke="#ff7300" fill="url(#colorPosition)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


const CustomTooltip = ({ active, payload, label }: TooltipProps<string, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #ccc' }}>
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};
