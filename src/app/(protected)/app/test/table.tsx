"use client";

import React, { useMemo, useState } from "react";

import useGoogleRefreshToken from "@/auth/hooks/use-google-refresh-token";
import { LatestResultsDTO } from "@/dashboard/google-search/serp-types";

// Components
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table/table";

import DataTablePagination from "@/components/table-pagination";
import KeywordTableHead from "../search/google-search/_components/table/keyword-table-head";
import DataTableTopBar from "../search/google-search/_components/table/topbar";
import KeywordDetailsRow from "../search/google-search/_components/table/keywords-details-row";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [rowSelection, setRowSelection] = useState({});

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    competition: false,
    competitionIndex: false,
    highTopOfBidPage: false,
    lowTopOfBidPage: false,
  });


  //* Column order
  const initialColumnOrder = useMemo(() => columns.map((c) => c.id).filter((id): id is string => id !== undefined), [columns]);
  const [columnOrder, setColumnOrder] = useState(initialColumnOrder);
  // Drag start handler
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    e.dataTransfer.setData("text/plain", columnId);
  };

  // Drop handler
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetColumnId: string) => {
    const sourceColumnId = e.dataTransfer.getData("text/plain");
    const sourceIndex = columnOrder.indexOf(sourceColumnId);
    const targetIndex = columnOrder.indexOf(targetColumnId);

    const newColumnOrder = [...columnOrder];
    newColumnOrder.splice(sourceIndex, 1);
    newColumnOrder.splice(targetIndex, 0, sourceColumnId);

    setColumnOrder(newColumnOrder);
  };


  //* Result Details row
  const refresh_token = useGoogleRefreshToken("search-console");
  const [selectedRowIndex, setSelectedRowIndex] = useState<string | null>(null);
  const [keywordData, setKeywordData] = useState<LatestResultsDTO | null>(null);

  const handleClickRow =
    (id: string) => (event: React.MouseEvent<HTMLTableRowElement>) => {
      let index = parseInt(id, 10);

      if (selectedRowIndex === id) {
        setSelectedRowIndex(null);
        return;
      }

      setSelectedRowIndex((prevId) => (prevId === id ? null : id));

      if (!isNaN(index) && index >= 0 && index < data.length) {
        let item = data[index];
        // console.log(item); // Check what the object looks like
        setKeywordData(item as LatestResultsDTO);
      } else {
        console.log("Invalid index");
      }
    };


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnOrderChange: setColumnOrder,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      columnOrder
    },
    initialState: {
      pagination: { pageIndex: 0, pageSize: 50 },
    },
    getPaginationRowModel: getPaginationRowModel(),
  });

  const numberOfVisibleColumns = table.getVisibleFlatColumns().length;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 mt-8">
      <KeywordTableHead />

      {/* Top bar */}
      <DataTableTopBar
        table={table}
        data={data}
        deselectAllRows={() => setRowSelection({})}
        sorting={sorting}
        setSorting={setSorting}
      />

      {/* Keywords Table */}
      <div className="rounded-md mt-3">
        <Table>
          <TableHeader className="rouded-md overflow-hidden bg-primary-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className=" rounded-lg shadow-sm">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="border border-red-900"
                      key={header.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, header.id)}
                      onDrop={(e) => handleDrop(e, header.id)}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
                    className="border-b border-gray-200 hover:bg-neutral-100/50 cursor-pointer"
                    // handle click row, open keyword detail
                    onClick={handleClickRow(row.id)}
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

                  {row.id === selectedRowIndex && (
                    <tr>
                      {keywordData ? (
                        <td className="pt-6" colSpan={numberOfVisibleColumns}>
                          <KeywordDetailsRow
                            keywordData={keywordData}
                            refresh_token={refresh_token}
                          />
                        </td>
                      ) : (
                        <td colSpan={numberOfVisibleColumns}>Loading...</td>
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
      </div>
      <DataTablePagination table={table} />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}

export default DataTable;
