"use client"

import { ColumnDef, Row, SortingFn } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from "@heroicons/react/20/solid"
import { GoogleSearchResult } from "@prisma/client"

import { format } from 'date-fns';
import KeywordRowActionDropdown from "./column/keyword-row-action-dropdown"

const urlSortingFn: SortingFn<GoogleSearchResult> = (rowA: Row<GoogleSearchResult>, rowB: Row<GoogleSearchResult>, columnId) => {
  const valueA = rowA.getValue(columnId) as string || "";
  const valueB = rowB.getValue(columnId) as string || "";

  if (valueA && !valueB) return -1;
  if (!valueA && valueB) return 1;
  return valueA.localeCompare(valueB);
}

const positionSortingFn: SortingFn<GoogleSearchResult> = (rowA: Row<GoogleSearchResult>, rowB: Row<GoogleSearchResult>, columnId) => {
  const valueA = rowA.getValue(columnId) as number || null;
  const valueB = rowB.getValue(columnId) as number || null;

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
}


export const columns = (): ColumnDef < GoogleSearchResult > [] => [
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
          e.stopPropagation()
          e.nativeEvent.stopImmediatePropagation()
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
  // * Position
  {
    accessorKey: "position",
    header: ({ column }) => {
      return (
        <p className="flex font-medium text-gray-600 mx-auto" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
          Position
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="flex mx-auto h-full">
          <p className="mx-auto text-sm leading-5 font-medium text-gray-800">{row.getValue('position')}</p>
        </div>
      )
    },
    sortingFn: positionSortingFn,
  },
  // * Name
  {
    accessorKey: "keywordName",
    header: ({ column }) => {
      return (
        <p className="flex font-medium text-gray-600" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
          Keyword
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <p className="text-sm leading-5 font-medium text-gray-800">{row.getValue('keywordName')}</p>
      )
    }
  },
  // * Url
  {
    accessorKey: "url",
    header: ({ column }) => (
      <p className="flex font-medium text-gray-600 mx-auto" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
        Url
      </p>
    ),
    cell: ({ row }) => {
      const url = row.getValue('url')
      if (url === null || url === undefined || url === "") {
        return (
          <p className="max-auto text-sm leading-5 font-medium text-gray-500">Not Found</p>
        )
      } else {
        return (
          <p className="mx-auto text-sm leading-5 font-medium text-gray-500">
            {(row.getValue('url') as string).length > 52
              ? (row.getValue('url') as string).substring(0, 52) + '...'
              : row.getValue('url')}
          </p>
        )
      }
    },
    sortingFn: urlSortingFn,
  },
  // * First Position
  {
    accessorKey: "firstPosition",
    header: ({ column }) => {
      return (
        <p className="flex font-medium text-gray-600 mx-auto" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          First Position
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <p className="text-sm leading-5 font-medium text-gray-800">{row.getValue('firstPosition')}</p>
      )
    },
    sortingFn: positionSortingFn,
  },
  // * Best Position
  {
    accessorKey: "bestPosition",
    header: ({ column }) => {
      return (
        <p className="flex font-medium text-gray-600" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Best Position
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <p className="text-sm leading-5 font-medium text-gray-800">{row.getValue('bestPosition')}</p>
      )
    },
    sortingFn: positionSortingFn,
  },
  // * Latest Change
  {
    accessorKey: "latestChange",
    header: ({ column }) => {
      return (
        <p className="flex font-medium text-gray-600" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Latest Change
        </p>
      )
    },
    cell: ({ row }) => {
      let colorClass = "text-sm leading-5 font-medium text-gray-800";
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
          <span className={colorClass} >{row.getValue('latestChange')}</span>
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
        <p className="flex font-medium text-gray-600" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date Retrieved
        </p>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      if (date.toString() === 'Invalid Date') return <p className=" text-sm leading-5 font-medium text-gray-500">Not yet Checked</p>;
      return <p className=" text-sm leading-5 font-medium text-gray-500">{format(date, 'MM/dd/yyyy')}</p>; // or any other format you prefer
    },
  },
  // * Actions
  {
    id: "actions",
    cell: ({ row }) => {
      const keyword = row.original

      return (
        <KeywordRowActionDropdown keyword={keyword} />
      )
    },
  },
]
