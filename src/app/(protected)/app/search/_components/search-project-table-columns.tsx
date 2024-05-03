"use client"

import { ColumnDef, Row, SortingFn } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from "@heroicons/react/20/solid"


import { format } from 'date-fns';
import { GoogleSearchProjectsWithLatestResult } from "@/dashboard/google-search/data/google-search-project"

// const urlSortingFn: SortingFn<GoogleSearchProjectsWithLatestResult> = (rowA: Row<GoogleSearchProjectsWithLatestResult>, rowB: Row<GoogleSearchProjectsWithLatestResult>, columnId) => {
//   const valueA = rowA.getValue(columnId) as string || "";
//   const valueB = rowB.getValue(columnId) as string || "";

//   if (valueA && !valueB) return -1;
//   if (!valueA && valueB) return 1;
//   return valueA.localeCompare(valueB);
// }

// const positionSortingFn: SortingFn<GoogleSearchProjectsWithLatestResult> = (rowA: Row<GoogleSearchProjectsWithLatestResult>, rowB: Row<GoogleSearchProjectsWithLatestResult>, columnId) => {
//   const valueA = rowA.getValue(columnId) as number || null;
//   const valueB = rowB.getValue(columnId) as number || null;

//   if (valueA === null && valueB !== null) return 1;
//   if (valueB === null && valueA !== null) return -1;
//   if (valueA === null && valueB === null) return 0;

//   // Add a null check for valueA and valueB before subtraction
//   if (valueA !== null && valueB !== null) {
//     return valueA - valueB;
//   } else {
//     // Decide what to return when either valueA or valueB is null
//     return 0;
//   }
// }


export const columns = (): ColumnDef<GoogleSearchProjectsWithLatestResult>[] => [
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
    // * Project Name
    {
        accessorKey: "projectName",
        header: ({ column }) => {
            return (
                <p className="flex font-medium text-gray-600" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
                    Project Name
                </p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className="text-sm leading-5 font-medium text-gray-800">{row.getValue('projectName')}</p>
            )
        },
        // sortingFn: positionSortingFn,
    },
    // * Domain
    {
        accessorKey: "domainUrl",
        header: ({ column }) => {
            return (
                <p className="flex font-medium text-gray-600" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
                    Domain
                </p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className="text-sm leading-5 font-medium text-gray-800">{row.getValue('domainUrl')}</p>
            )
        }
    },
    // * Language
    {
        accessorKey: "language",
        header: ({ column }) => (
            <p className="flex font-medium text-gray-600" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
                Language
            </p>
        ),
        cell: ({ row }) => {
            return (
                <p className="text-sm leading-5 font-medium text-gray-800">{row.getValue('language')}</p>
            )
        },
        // sortingFn: urlSortingFn,
    },
    // * Country
    {
        accessorKey: "country",
        header: ({ column }) => {
            return (
                <p className="flex font-medium text-gray-600" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Country
                </p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className="text-sm leading-5 font-medium text-gray-800">{row.getValue('country')}</p>
            )
        },
        // sortingFn: positionSortingFn,
    },
    // * Improved
    {
        accessorKey: "improved",
        header: ({ column }) => {
            return (
                <p className="flex font-medium text-gray-600" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Improved
                </p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className="text-sm leading-5 font-medium text-gray-800">{row.getValue('improved')}</p>
            )
        },
        // sortingFn: positionSortingFn,
    },
    // * Worsened
    {
        accessorKey: "worsened",
        header: ({ column }) => {
            return (
                <p className="flex font-medium text-gray-600" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Worsened
                </p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className="text-sm leading-5 font-medium text-gray-800">{row.getValue('worsened')}</p>
            )
        },
        // sortingFn: positionSortingFn,
    },
    // * Total
    {
        accessorKey: "total",
        header: ({ column }) => {
            return (
                <p className="flex font-medium text-gray-600" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Total
                </p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className="text-sm leading-5 font-medium text-gray-800">{row.getValue('total')}</p>
            )
        },
    },
    // * Top 3
    {
        accessorKey: "topThree",
        header: ({ column }) => {
            return (
                <p className="flex font-medium text-gray-600" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Top 3
                </p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className="text-sm leading-5 font-medium text-gray-800">{row.getValue('topThree')}</p>
            )
        },
    },
    // * Top 10
    {
        accessorKey: "topTen",
        header: ({ column }) => {
            return (
                <p className="flex font-medium text-gray-600" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Top 10
                </p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className="text-sm leading-5 font-medium text-gray-800">{row.getValue('topTen')}</p>
            )
        },
    },
    // * Top 100
    {
        accessorKey: "topHundred",
        header: ({ column }) => {
            return (
                <p className="flex font-medium text-gray-600" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Top 100
                </p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className="text-sm leading-5 font-medium text-gray-800">{row.getValue('topHundred')}</p>
            )
        },
    },
    // * Checked
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <p className="flex font-medium text-gray-600" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Checked
                </p>
            )
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue('createdAt'));
            if (date.toString() === 'Invalid Date') return <p className=" text-sm leading-5 font-medium text-gray-500">Not yet Checked</p>;
            return <p className=" text-sm leading-5 font-medium text-gray-500">{format(date, 'MM/dd/yyyy')}</p>; // or any other format you prefer
        },
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
]
