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
} from "@/components/ui/table/table";

import { cn } from "@/lib/utils";
import { Heading } from "@/components/ui/typography/typography";

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
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  // visibility state
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  // Row selection state
  const [rowSelection, setRowSelection] = React.useState({});
  // console.log('rowSelection', rowSelection)

  const [selectedRowIndex, setSelectedRowIndex] = React.useState<string | null>(
    null,
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // sorting
    // onSortingChange: setSorting,
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

  const numberOfVisibleColumns = table.getVisibleFlatColumns().length;

  return (
    <div className="bg-white rounded-2xl shadow-sm px-8 py-6 mt-8">
      <Heading level="h2" size="2xl" className="pb-6 border-b border-gray-200">
        Newsletter Signups
      </Heading>

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
                          : header.column.getIndex() ===
                              numberOfVisibleColumns - 1
                            ? "rounded-r-2xl "
                            : ""
                      }
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
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
                  className={cn("border-", index % 2 !== 0 ? "bg-gray-50" : "")}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className={
                        // add rounded corners to first and last cell
                        cell.column.getIndex() === 0
                          ? "rounded-l-2xl overflow-hidden "
                          : cell.column.getIndex() ===
                              numberOfVisibleColumns - 1
                            ? "rounded-r-2xl "
                            : ""
                      }
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
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
      {/* Keyword Detail */}
      {/* <KeywordDetail data={data} /> */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}
