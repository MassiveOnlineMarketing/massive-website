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
import { Button, OutlinedButton } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowsUpDownIcon, EllipsisHorizontalIcon } from "@heroicons/react/20/solid"
import { deleteKeywordsById } from "@/serp/data/keyword"
import { Project } from "@prisma/client"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }



export const columns = (handleProjectDelete: (projectId: string) => void): ColumnDef<Project>[] => [
  // // * Select column
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  // * Project Name
  {
    accessorKey: "projectName",
    header: ({ column }) => {
      return (
        <button
          className="flex font-medium text-gray-500"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Project Name
          <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
        </button>
      )
    },
  },
  // * Domain Url
  {
    accessorKey: "domainUrl",
    header: ({ column }) => {
      return (
        <button
          className="flex font-medium text-gray-500"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Domain
          <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
        </button>
      )
    },
  },
  // * Language
  {
    accessorKey: "language",
    header: ({ column }) => {
      return (
        <button
          className="flex font-medium text-gray-500"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Language
          <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
        </button>
      )
    },
  },
  // * Country
  {
    accessorKey: "country",
    header: ({ column }) => {
      return (
        <button
          className="flex font-medium text-gray-500"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Country
          <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
        </button>
      )
    }
  },
  // * Improved
  {
    accessorKey: "improved",
    header: ({ column }) => {
      return (
        <button
          className="flex font-medium text-gray-500"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Improved
          <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
        </button>
      )
    }
  },
  // * worsend
  {
    accessorKey: "worsened",
    header: ({ column }) => {
      return (
        <button
          className="flex font-medium text-gray-500"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Worsened
          <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
        </button>
      )
    }
  },
  // * total 
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <button
          className="flex font-medium text-gray-500"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
        </button>
      )
    }
  },
  // * topTen
  {
    accessorKey: "topTen",
    header: ({ column }) => {
      return (
        <button
          className="flex font-medium text-gray-500"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Top 10
          <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
        </button>
      )
    }
  },
  //* noChange  
  {
    accessorKey: "noChange",
    header: ({ column }) => {
      return (
        <button
          className="flex font-medium text-gray-500"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No Change
          <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      return <span className="text-gray-500">{row.getValue('noChange')}</span>
    }
  },
  // * notFound
  {
    accessorKey: "notFound",
    header: ({ column }) => {
      return (
        <button
          className="flex font-medium text-gray-500"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Not Found
          <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
        </button>
      )
    }
  },
  // * Actions
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original

      return (
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <OutlinedButton buttonClassName="p-2" >
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon className="w-4 h-4 " />
            </OutlinedButton>
            {/* <Button variant='outline' className="h-8 w-8 p-0 float-right z-10">
            </Button> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className='z-10'>
            <DropdownMenuItem
              onClick={() => {
                // deleteKeywordsById(keyword.keywordId);
                handleProjectDelete(project.id)
              }}
              className='text-red-500 bg-red-200 rounded-[4px] focus:bg-red-300 focus:text-red-600 cursor-pointer'
            >
              Delete Project
            </DropdownMenuItem>
            {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
