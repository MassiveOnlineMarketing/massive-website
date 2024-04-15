"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid"
import { Result } from "@prisma/client"

import { format } from 'date-fns';



export const columns = (handleKeywordsDelete: (keywordsId: string) => void): ColumnDef<Result>[] => [
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
        <p className="flex font-medium text-gray-500 mx-auto" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
          Position
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="flex mx-auto h-full">
          <p className=" mx-auto">{row.getValue('position')}</p>
        </div>
      )
    },
  },
  // * Name
  {
    accessorKey: "keywordName",
    header: ({ column }) => {
      return (
        <p className="flex font-medium text-gray-500" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
          Keyword
        </p>
      )
    },
  },
  // * Url
  {
    accessorKey: "url",
    header: ({ column }) => (
      <p className="flex font-medium text-gray-500 mx-auto" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
        Url
      </p>
    ),
    cell: ({ row }) => {
      const url = row.getValue('url')
      if (url === null || url === undefined || url === "") {
        return (
          <p>Not Found</p>
        )
      } else {
        return (
          <p className="mx-auto">
            {(row.getValue('url') as string).length > 52
              ? (row.getValue('url') as string).substring(0, 52) + '...'
              : row.getValue('url')}
          </p>
        )
      }
    },
  },
  // * First Position
  {
    accessorKey: "firstPosition",
    header: ({ column }) => {
      return (
        <p className="flex font-medium text-gray-500 mx-auto" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          First Position
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="flex mx-auto">
          <p className=" mx-auto">{row.getValue('firstPosition')}</p>
        </div>
      )
    },
  },
  // * Best Position
  {
    accessorKey: "bestPosition",
    header: ({ column }) => {
      return (
        <p className="flex font-medium text-gray-500 mx-auto" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Best Position
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="flex mx-auto">
          <p className=" mx-auto">{row.getValue('bestPosition')}</p>
        </div>
      )
    },
  },
  // * Latest Change
  {
    accessorKey: "latestChange",
    header: ({ column }) => {
      return (
        <p className="flex font-medium text-gray-500 mx-auto" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Latest Change
        </p>
      )
    },
    cell: ({ row }) => {
      if (row.original && row.original.latestChange) {
        if (row.original.latestChange > 0) {
          return (
            <div className="flex mx-auto">
              <span className="text-green-500 mx-auto">{row.getValue('latestChange')}</span>
            </div>
          )
        } else if (row.original.latestChange < 0) {
          return (
            <div className="flex mx-auto">
              <span className="text-red-500 mx-auto">{row.getValue('latestChange')}</span>
            </div>
          )

        }
      } else {
        return (
          <div className="flex mx-auto">
            <span className="text-gray-500 mx-auto">{row.getValue('latestChange')}</span>
          </div>
        )
      }
    },
  },
  // * Date Retrieved
  {
    accessorKey: "createdAt",
    header: "Date Retrieved",
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      return format(date, 'MM/dd/yyyy'); // or any other format you prefer
    },
  },
  // * Actions
  {
    id: "actions",
    cell: ({ row }) => {
      const keyword = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='dashboard' >
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                if (keyword.url) {
                  navigator.clipboard.writeText(keyword.url)
                }
              }}
            >
              Copy Url
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                // deleteKeywordsById(keyword.keywordId);
                handleKeywordsDelete(keyword.keywordId)
              }}
              className='text-red-500 bg-red-200 rounded-[4px] focus:bg-red-300 focus:text-red-600 cursor-pointer'
            >

              Delete
              {/* Delete Keyword */}
            </DropdownMenuItem>
            {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
