"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { GoogleSearchProjectsWithLatestResult } from "@/dashboard/google-search/data/google-search-project";

import { useWebsiteDetailsStore } from "@/lib/zustand/website-details-store";

// Components
import { ColumnDef, ColumnFiltersState, Row, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { OutlinedTextButton } from "@/components/ui/text-button";

// Icons
import { MagnifyingGlassIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({
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

    getPaginationRowModel: getPaginationRowModel(),
  });

  const router = useRouter();
  const setWebsiteDetails = useWebsiteDetailsStore(
    (state) => state.setWebsiteDetails,
  );
  const numberOfVisibleColumns = table.getVisibleFlatColumns().length;

  const handleClickRow = (row: Row<TData>) => () => {
    const project = row.original as GoogleSearchProjectsWithLatestResult;

    setWebsiteDetails(project.website);
    router.push(`/app/search/google-search/${project.id}`);
  };

  return (
    <>
      <div className="w-full pb-8 flex items-center">
        {/* Searchbar */}
        <div className="mr-auto relative rounded-md shadow-sm h-[34px]">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            placeholder="Search campaign name..."
            value={
              (table.getColumn("projectName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("projectName")?.setFilterValue(event.target.value)
            }
            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
          />
        </div>

        {/* Toggle visable colums */}
        <Tooltip>
          <TooltipTrigger>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <OutlinedTextButton
                  size="smD"
                  className="ml-auto"
                  buttonClassName="px-2"
                >
                  <ViewColumnsIcon className="w-5 h-5 text-gray-500" />
                </OutlinedTextButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
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
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          <TooltipContent>
            <p>Show Columns</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Projects Table */}
      <div className="rounded-md">
        <Table>
          <TableHeader className="rouded-md overflow-hidden bg-primary-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className=" rounded-lg shadow-sm">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className={
                        // add rounded corners to first and last cell
                        header.column.getIndex() === 0
                          ? "rounded-l-md overflow-hidden "
                          : header.column.getIndex() ===
                              numberOfVisibleColumns - 1
                            ? "rounded-r-md "
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
                  className="border-b border-gray-200 hover:bg-neutral-100/50 cursor-pointer"
                  onClick={handleClickRow(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  No Projects.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default DataTable;
