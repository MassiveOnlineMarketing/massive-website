"use client";

import { ColumnDef, Row, SortDirection, SortingFn } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import { GoogleSearchResult } from "@prisma/client";

import { format } from "date-fns";
import KeywordRowActionDropdown from "./column/keyword-row-action-dropdown";
import { urlWithoutDomain } from "@/dashboard/utils";

const urlSortingFn: SortingFn<GoogleSearchResult> = (
  rowA: Row<GoogleSearchResult>,
  rowB: Row<GoogleSearchResult>,
  columnId,
) => {
  const valueA = (rowA.getValue(columnId) as string) || "";
  const valueB = (rowB.getValue(columnId) as string) || "";

  if (valueA && !valueB) return -1;
  if (!valueA && valueB) return 1;
  return valueA.localeCompare(valueB);
};

const positionSortingFn: SortingFn<GoogleSearchResult> = (
  rowA: Row<GoogleSearchResult>,
  rowB: Row<GoogleSearchResult>,
  columnId,
) => {
  const valueA = (rowA.getValue(columnId) as number) || null;
  const valueB = (rowB.getValue(columnId) as number) || null;

  if (valueA === null && valueB !== null) return 1;
  if (valueB === null && valueA !== null) return -1;
  if (valueA === null && valueB === null) return 0;

  // Add a null check for valueA and valueB before subtraction
  if (valueA !== null && valueB !== null) {
    return valueA - valueB;
  } else {
    // Decide what to return when either valueA or valueB is null
    return 0;
  }
};

export const columns = (domainUrl?: string): ColumnDef<GoogleSearchResult>[] => [
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
  // * Name
  {
    accessorKey: "keywordName",
    header: ({ column }) => {
      return (
        <p
          className="flex items-center font-medium text-gray-600"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Keyword
          <SortingIndicator sorting={column.getIsSorted()} />
        </p>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-sm leading-5 font-medium text-gray-800">
          {row.getValue("keywordName")}
        </p>
      );
    },
  },
  // * Url
  {
    accessorKey: "url",
    header: ({ column }) => (
      <p
        className="flex items-center font-medium text-gray-600 mx-auto"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Url
        <SortingIndicator sorting={column.getIsSorted()} />
      </p>
    ),
    cell: ({ row }) => {
      const url = row.getValue("url");
      if (url === null || url === undefined || url === "") {
        return (
          <p className="max-auto text-sm leading-5 font-medium text-gray-500">
            Not Found
          </p>
        );
      } else {
        return (
          <p className="mx-auto text-sm leading-5 font-medium text-gray-500">
            {
              domainUrl ? (
                (row.getValue("url") as string).length > 52
                  ? urlWithoutDomain(row.getValue("url") as string, domainUrl).substring(0, 52) + "..."
                  : urlWithoutDomain(row.getValue("url") as string, domainUrl)
              ) : (
                (row.getValue("url") as string).length > 52
                  ? (row.getValue("url") as string).substring(0, 52) + "..."
                  : row.getValue("url")
              )
            }
          </p>
        );
      }
    },
    sortingFn: urlSortingFn,
  },
  // * Position
  {
    accessorKey: "position",
    header: ({ column }) => {
      return (
        <p
          className="flex items-center font-medium text-gray-600 mx-auto"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Position
          <SortingIndicator sorting={column.getIsSorted()} />
        </p>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex mx-auto h-full">
          <p className="text-sm leading-5 font-medium text-gray-800">
            {row.getValue("position")}
          </p>
        </div>
      );
    },
    sortingFn: positionSortingFn,
  },
  // * First Position
  {
    accessorKey: "firstPosition",
    header: ({ column }) => {
      return (
        <p
          className="flex items-center font-medium text-gray-600 mx-auto"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Position
          <SortingIndicator sorting={column.getIsSorted()} />
        </p>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-sm leading-5 font-medium text-gray-800">
          {row.getValue("firstPosition")}
        </p>
      );
    },
    sortingFn: positionSortingFn,
  },
  // * Best Position
  {
    accessorKey: "bestPosition",
    header: ({ column }) => {
      return (
        <p
          className="flex items-center font-medium text-gray-600"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Best Position
          <SortingIndicator sorting={column.getIsSorted()} />
        </p>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-sm leading-5 font-medium text-gray-500">
          {row.getValue("bestPosition")}
        </p>
      );
    },
    sortingFn: positionSortingFn,
  },
  // * Latest Change
  {
    accessorKey: "latestChange",
    header: ({ column }) => {
      return (
        <p
          className="flex items-center font-medium text-gray-600"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Latest Change
          <SortingIndicator sorting={column.getIsSorted()} />
        </p>
      );
    },
    cell: ({ row }) => {
      let colorClass = "text-sm leading-5 font-medium text-gray-500";
      let icon = null;

      if (row.original && row.original.latestChange) {
        if (row.original.latestChange > 0) {
          colorClass = "";
          icon = <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />;
        } else if (row.original.latestChange < 0) {
          colorClass = "";
          icon = <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />;
        }
      }

      return (
        <div className="flex gap-[2px] items-center">
          <span className={colorClass}>{row.getValue("latestChange")}</span>
          {icon}
        </div>
      );
    },
    sortingFn: positionSortingFn,
  },
  // * Date Retrieved
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <p
          className="flex items-center font-medium text-gray-600"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Updated
          <SortingIndicator sorting={column.getIsSorted()} />
        </p>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      if (date.toString() === "Invalid Date")
        return (
          <p className=" text-sm leading-5 font-medium text-gray-500">
            Not yet Checked
          </p>
        );
      return (
        <p className=" text-sm leading-5 font-medium text-gray-500">
          {format(date, "MM/dd/yyyy")}
        </p>
      ); // or any other format you prefer
    },
  },
  // * Actions
  {
    header: ({ column }) => (
      <p className="font-medium text-gray-600">Actions</p>
    ),
    id: "actions",
    cell: ({ row }) => {
      const keyword = row.original;

      return <KeywordRowActionDropdown keyword={keyword} />;
    },
  },
];


const SortingIndicator = (props: {sorting: false | SortDirection}) => {
  if (props.sorting === "asc") {
    return <ChevronUpIcon className="w-4 h-4 text-gray-600 ml-1" />;
  } else if (props.sorting === "desc") {
    return <ChevronDownIcon className="w-4 h-4 text-gray-600 ml-1" />;
  } else {
    return null;
  }
}