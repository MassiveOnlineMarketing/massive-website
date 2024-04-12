import { useState } from "react";

import {
    SortingState,
    Table,
} from "@tanstack/react-table";

// Components
import { OutlinedButton } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import { OutlinedTextButton } from "@/components/ui/text-button";

// Assets
import { ArrowDownTrayIcon, MagnifyingGlassIcon, TrashIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";

// Topbar components
import { AddTagToKeywords } from "@/serp/components/add-tag-to-keyword";
import TagSelection from "./tag-selection";
import { DeleteTagFromKeyword } from "@/serp/components/delete-tag-from-keyword";
import { AddNewTagInput } from "@/serp/components/add-new-tag-input";
import { SortingRows } from "./row-sorting";
import { downloadToExcel } from "@/serp/lib/xlsx";
import AddKeywordsFrom from "@/serp/components/add-keywords-form";
import { DeleteKeywordSelectedRowButton } from "@/serp/components/delete-keyword-selected-row-button";


interface TopBarProps<TData> {
    table: Table<TData>;
    data: TData[];
    deselectAllRows: () => void;

    sorting: SortingState;
    setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
}

export function DataTableTopBar<TData>({ table, data, deselectAllRows, sorting, setSorting }: TopBarProps<TData>) {
    return (
        <div className="flex items-center">
            <TagSelection />

            {/* Selected rows */}
            <div >
                {table.getSelectedRowModel().rows.length > 0 && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <OutlinedButton size='smD'>Row actions</OutlinedButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <AddTagToKeywords selectedRows={table.getSelectedRowModel()} onActionFinished={deselectAllRows} />
                                <DeleteTagFromKeyword selectedRows={table.getSelectedRowModel()} onActionFinished={deselectAllRows} />
                                <AddNewTagInput selectedRows={table.getSelectedRowModel()} onActionFinished={deselectAllRows} />
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
            <div className="mr-auto">
                {table.getSelectedRowModel().rows.length > 0 && (
                    <Tooltip>
                        <TooltipTrigger>
                            <DeleteKeywordSelectedRowButton selectedRows={table.getSelectedRowModel()} >
                                <OutlinedTextButton outlineClassName="outline-red-50 bg-red-50" size='smD' className="ml-1" buttonClassName="px-2"><TrashIcon className="w-5 h-5 text-red-500" /></OutlinedTextButton>
                            </DeleteKeywordSelectedRowButton>
                        </TooltipTrigger>
                        <TooltipContent>
                            {table.getSelectedRowModel().rows.length > 1 ? <p>Delete Keywords</p> : <p>Delete Keyword</p>}
                        </TooltipContent>
                    </Tooltip>
                )}
            </div>

            {/* Searchbar */}
            <div className="relative rounded-md shadow-sm h-[34px]">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    placeholder="Filter by keword name..."
                    value={(table.getColumn("keywordName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("keywordName")?.setFilterValue(event.target.value)
                    }
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                />
            </div>

            {/* Download to Excell */}
            <div className="ml-2">
                <SortingRows sorting={sorting} setSorting={setSorting} />
            </div>

            <TooltipProvider delayDuration={0}>
                {/* Add keyword */}
                <Tooltip>
                    <TooltipTrigger>
                        <div className=" ml-2 relative w-fit h-fit m-1">
                            <AddKeywordsFrom buttonClassName=" h-[32px] px-2 rounded-lg  inline-flex items-center justify-center whitespace-nowrap shadow-base bg-white z-40 rounded-lg relative">
                                <PlusIcon className="w-5 h-5 text-green-500" />
                            </AddKeywordsFrom>
                            <div className="absolute top-0 left-0 w-full h-full rounded-[8px] outline outline-4 outline-green-50 bg-green-50 z-30"></div>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add Keyword</p>
                    </TooltipContent>
                </Tooltip>

                {/* Download to Excell */}
                <Tooltip>
                    <TooltipTrigger>
                        <OutlinedTextButton className="ml-2" size='smD' buttonClassName="px-2" onClick={() => downloadToExcel(data)} >
                            <ArrowDownTrayIcon className="w-5 h-5" />
                        </OutlinedTextButton>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Download Excell</p>
                    </TooltipContent>
                </Tooltip>

                {/* Toggle visable colums */}
                <Tooltip>
                    <TooltipTrigger>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <OutlinedTextButton size='smD' className="ml-2" buttonClassName="px-2"><ViewColumnsIcon className="w-5 h-5" /></OutlinedTextButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter(
                                        (column) => column.getCanHide()
                                    )
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(!!value)
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Show Columns</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            {/* Get selected row info */}
            {/* <div>
                {table.getSelectedRowModel().rows.map((row) => (
                    <div key={row.id}>{JSON.stringify(row)}</div>
                ))}
            </div> */}
        </div>
    )
}

