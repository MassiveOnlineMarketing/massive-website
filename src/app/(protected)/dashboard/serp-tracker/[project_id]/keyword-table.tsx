"use client";

import React, {useState} from "react";
import AddKeywordsFrom from "@/serp/components/add-keywords-form";

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

import { Button, OutlinedButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PlusIcon } from "@heroicons/react/20/solid";
import { AddTagToKeywords } from "@/serp/components/add-tag-to-keyword";
import { DeleteTagFromKeyword } from "@/serp/components/delete-tag-from-keyword";
import { AddNewTagInput } from "@/serp/components/add-new-tag-input";
import { DeleteKeywords } from "@/serp/components/delete-keywords";
import { DataTablePagination } from "./pagination-table";
import { downloadToExcel } from "@/serp/lib/xlsx";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

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
      <div className="flex items-center">
        {/* Searchbar */}
        <Input
          placeholder="Filter by keword name..."
          value={(table.getColumn("keywordName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("keywordName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm "
        />

        <OutlinedButton className="ml-2" buttonClassName="p-2" onClick={() => downloadToExcel(data)} >
          <ArrowDownTrayIcon className="w-5 h-5" />
        </OutlinedButton>

        {/* Selected rows */}
        <div className="mr-auto">
          {table.getSelectedRowModel().rows.length > 0 && (
            <div className="flex gap-2 ml-2">
              <DeleteKeywords selectedRows={table.getSelectedRowModel()} onActionFinished={deselectAllRows} />
              <AddTagToKeywords selectedRows={table.getSelectedRowModel()} onActionFinished={deselectAllRows} />
              <DeleteTagFromKeyword selectedRows={table.getSelectedRowModel()} onActionFinished={deselectAllRows} />
              <AddNewTagInput selectedRows={table.getSelectedRowModel()} onActionFinished={deselectAllRows} />
            </div>
          )}
        </div>
        {/* <div>
          {table.getSelectedRowModel().rows.map((row) => (
            <div key={row.id}>{JSON.stringify(row)}</div>
          ))}
        </div> */}

        <AddKeywordsFrom>
          <p className="flex items-center justify-center w-[54px] h-[54px] rounded-full p-0 border border-neutral-200">
            <PlusIcon className="w-6 h-6" />
          </p>
        </AddKeywordsFrom>

        {/* Toggle visable colums */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <OutlinedButton size='sm' className="ml-2">Columns</OutlinedButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>



      {/* Keywords Table */}
      <div className="rounded-md ">
        <Table>
          <TableHeader className="rouded-lg overflow-hidden bg-primary-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className=" rounded-lg">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className={
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
              table.getRowModel().rows.map((row) => (

                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b"
                // handle click row, open keyword detail
                // onClick={handleClickRow(row.id)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className={
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
