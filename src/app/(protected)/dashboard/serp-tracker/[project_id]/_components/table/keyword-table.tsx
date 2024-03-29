"use client";

import React from "react";

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




interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}


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




  const handleClickRow = (id: string) => (event: React.MouseEvent<HTMLTableRowElement>) => {
    // map over data and return the row that matches the id
    // const keyword = data.find((keyword: any) => keyword.keywordId === id)
    let index = parseInt(id, 10);

    setSelectedRowIndex(prevId => prevId === id ? null : id);
    if (!isNaN(index) && index >= 0 && index < data.length) {
      // @ts-ignore
      let keywordId = data[index].keyword_id;
      console.log(keywordId);
    } else {
      console.log("Invalid index");
    }
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

                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    "border-",
                    index % 2 !== 0 ? 'bg-gray-50' : ''
                  )}
                // handle click row, open keyword detail
                // onClick={handleClickRow(row.id)}
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

                // {/* keyword details
                // {row.id === selectedRowIndex && (
                //   <tr className="h-40">
                //     test
                //   </tr>
                // )} */}


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




