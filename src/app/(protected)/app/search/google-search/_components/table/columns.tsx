"use client";

import { GoogleSearchResult } from "@prisma/client";

import { ColumnDef, Row, SortingFn } from "@tanstack/react-table";
import { DateRowCell, StandardHeaderCell, StandardRowCell, TrendingIndicatorRowCell, UrlRowCell } from "@/components/ui/table";

import { Checkbox } from "@/components/ui/checkbox";

import KeywordRowActionDropdown from "./column/keyword-row-action-dropdown";


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
    header: ({ column }) => (
      <StandardHeaderCell sorting={true} column={column} title="Keyword" />
    ),
    cell: ({ row: { original: { keywordName } } }) => (
      <StandardRowCell value={keywordName} highlight={true} />
    ),
  },
  // * Url
  {
    accessorKey: "url",
    header: ({ column }) => (
      <StandardHeaderCell sorting={true} column={column} title="Url" />
    ),
    cell: ({ row: {original: {url}} }) => (
      <UrlRowCell value={url} domainUrl={domainUrl} />
    ),
    sortingFn: urlSortingFn,
  },
  // * Position
  {
    accessorKey: "position",
    header: ({ column }) => (
      <StandardHeaderCell sorting={true} column={column} title="Position" />
    ),
    cell: ({ row: { original: { position } } }) => (
      <StandardRowCell value={position} highlight={true} />
    ),
    sortingFn: positionSortingFn,
  },
  // * First Position
  {
    accessorKey: "firstPosition",
    header: ({ column }) => (
      <StandardHeaderCell sorting={true} column={column} title="First Position" />
    ),
    cell: ({ row: { original: { firstPosition } } }) => (
      <StandardRowCell value={firstPosition} />
    ),
    sortingFn: positionSortingFn,
  },
  // * Best Position
  {
    accessorKey: "bestPosition",
    header: ({ column }) => (
      <StandardHeaderCell sorting={true} column={column} title="Best Position" />
    ),
    cell: ({ row: { original: { bestPosition } } }) => (
      <StandardRowCell value={bestPosition} />
    ),
    sortingFn: positionSortingFn,
  },
  // * Latest Change
  {
    accessorKey: "latestChange",
    header: ({ column }) => (
      <StandardHeaderCell sorting={true} column={column} title="Latest Change" />
    ),
    cell: ({ row: { original: { firstPosition } } }) => (
      <TrendingIndicatorRowCell value={firstPosition} />
    ),
    sortingFn: positionSortingFn,
  },
  // * Date Retrieved
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <StandardHeaderCell sorting={true} column={column} title="Last Updated" />
    ),
    cell: ({ row: { original: {createdAt}} }) => (
      <DateRowCell value={createdAt} />
    )
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
