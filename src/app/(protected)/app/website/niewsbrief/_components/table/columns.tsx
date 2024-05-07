"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, OutlinedButton } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowsUpDownIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { NieuwsbriefSignup } from "@prisma/client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }

export const newsletterColumns = (): ColumnDef<NieuwsbriefSignup>[] => [
  // * Position
  {
    accessorKey: "id",
    header: () => {
      return <p className="flex font-medium text-gray-500 mx-auto">Id</p>;
    },
  },
  // * Email
  {
    accessorKey: "email",
    header: () => {
      return <p className="flex font-medium text-gray-500">Email Adress</p>;
    },
  },
  // * Date Retrieved
  {
    accessorKey: "createdAt",
    header: "Sign up Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleDateString(); // or any other format you prefer
    },
  },
  // // * Actions
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const keyword = row.original

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant='dashboard' >
  //             <span className="sr-only">Open menu</span>
  //             <EllipsisHorizontalIcon className="w-4 h-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => {
  //               if (keyword.url) {
  //                 navigator.clipboard.writeText(keyword.url)
  //               }
  //             }}
  //           >
  //             Copy Url
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem
  //             onClick={() => {
  //               // deleteKeywordsById(keyword.keywordId);
  //               handleKeywordsDelete(keyword.keywordId)
  //             }}
  //             className='text-red-500 bg-red-200 rounded-[4px] focus:bg-red-300 focus:text-red-600 cursor-pointer'
  //           >

  //             Delete
  //             {/* Delete Keyword */}
  //           </DropdownMenuItem>
  //           {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },
];
