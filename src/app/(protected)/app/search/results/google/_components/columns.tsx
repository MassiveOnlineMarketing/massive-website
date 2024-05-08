"use client";

import { ColumnDef, Row, SortingFn } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";

import { format } from "date-fns";
import { QueryObject } from "../page";


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
      header: ({ column }) => {
        return (
          <p
            className="flex font-medium text-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Query
          </p>
        );
      },
      cell: ({ row }) => {
        return (
          <p className="text-sm leading-5 font-medium text-gray-800">
            {row.getValue("query")}
          </p>
        );
      },
      // sortingFn: positionSortingFn,
    },
    // * Clicks
    {
      accessorKey: "clicks",
      header: ({ column }) => {
        return (
          <p
            className="w-20 flex font-medium text-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Clicks
          </p>
        );
      },
      cell: ({ row }) => {
        return (
          <p className="w-20 text-sm leading-5 font-medium text-gray-800">
            {row.getValue("clicks")}
          </p>
        );
      },
    },
    // * Impressions
    {
      accessorKey: "impressions",
      header: ({ column }) => (
        <p
          className="w-20 flex font-medium text-gray-600"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Impressions
        </p>
      ),
      cell: ({ row }) => {
        return (
          <p className="w-20 text-sm leading-5 font-medium text-gray-800">
            {row.getValue("impressions")}
          </p>
        );
      },
      // sortingFn: urlSortingFn,
    },
    // * Ctr
    {
      accessorKey: "ctr",
      header: ({ column }) => {
        return (
          <p
            className="w-20 flex font-medium text-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ctr
          </p>
        );
      },
      cell: ({ row }) => {
        const ctr: number = row.getValue("ctr");
        const renderValue = ctr*100

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
      header: ({ column }) => {
        return (
          <p
            className="w-20 flex font-medium text-gray-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Position
          </p>
        );
      },
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
