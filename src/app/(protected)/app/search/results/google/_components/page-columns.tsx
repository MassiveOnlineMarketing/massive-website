"use client";

import { ColumnDef, Row, SortingFn } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";

import { format } from "date-fns";
import { QueryObject } from "../page";
import { StandardHeaderCell, StandardRowCell } from "@/components/ui/table";


export const columns =
  (): ColumnDef<QueryObject>[] => [
    // * Select column
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="rounded-[4px] border-gray-300 border-[1.5px]"
        />
      ),
      cell: ({ row }) => (
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          }}
        >
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="rounded-[4px] border-gray-300 border-[1.5px]"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    // * Query
    {
      accessorKey: "query",
      header: ({ column }) => (<StandardHeaderCell column={column} title='Query' sorting={true} />),
      cell: ({ row: { original: { querry } } }) => (<StandardRowCell value={querry} highlight={true} />),
      // sortingFn: positionSortingFn,
    },
    // * Clicks
    {
      accessorKey: "clicks",
      header: ({ column }) => (<StandardHeaderCell column={column} title='Clicks' sorting={true} />),
      cell: ({ row: { original: { clicks } } }) => (<StandardRowCell value={clicks} highlight={true} />),
    },
    // * Impressions
    {
      accessorKey: "impressions",
      header: ({ column }) => (<StandardHeaderCell column={column} title='Impressions' sorting={true} />),
      cell: ({ row: { original: { impressions } } }) => (<StandardRowCell value={impressions} highlight={true} />),
      // sortingFn: urlSortingFn,
    },
    // * Ctr
    {
      accessorKey: "ctr",
      header: ({ column }) => (<StandardHeaderCell column={column} title='Ctr' sorting={true} />),
      cell: ({ row }) => {
        const ctr: number = row.getValue("ctr");
        const renderValue = ctr * 100

        return (
          <p className="w-20 text-sm leading-5 font-medium text-gray-800">
            {Number.isInteger(renderValue) ? renderValue : renderValue.toFixed(1)}%
          </p>
        );
      },
      // sortingFn: positionSortingFn,
    },
    // * Position
    {
      accessorKey: "position",
      header: ({ column }) => (<StandardHeaderCell column={column} title='Position' sorting={true} />),
      cell: ({ row }) => {
        const position: number = row.getValue("position");

        return (
          <p className="w-20 text-sm leading-5 font-medium text-gray-800">
            {position.toFixed(0)}
          </p>
        );
      },
      // sortingFn: positionSortingFn,
    },

    // // * Actions
    // {
    //     id: "actions",
    //     cell: ({ row }) => {
    //         const keyword = row.original

    //         return (
    //             // <KeywordRowActionDropdown keyword={keyword} />
    //             <div>Actions</div>
    //         )
    //     },
    // },
  ];
