import { useState } from "react";

import { OutlinedButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    SortingState,
    Table,
} from "@tanstack/react-table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"

// Assets
import { ArrowDownTrayIcon, MagnifyingGlassIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";


import TagSelection from "./tag-selection";
import { AddTagToKeywords } from "@/serp/components/add-tag-to-keyword";
import { DeleteTagFromKeyword } from "@/serp/components/delete-tag-from-keyword";
import { AddNewTagInput } from "@/serp/components/add-new-tag-input";
import { DeleteKeywords } from "@/serp/components/delete-keywords";
import { SortingRows } from "./row-sorting";
import { downloadToExcel } from "@/serp/lib/xlsx";
import AddKeywordsFrom from "@/serp/components/add-keywords-form";
import { PlusIcon } from "@heroicons/react/20/solid";


interface TopBarProps<TData> {
    table: Table<TData>;
    data: TData[];
    deselectAllRows: () => void;

    sorting: SortingState;
    setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
}

export function DataTableTopBar<TData>({ table, data, deselectAllRows, sorting, setSorting }: TopBarProps<TData>) {
    const [tagPopoverOpen, setTagPopoverOpen] = useState(false)

    console.log('table.getSelectedRowModel().rows', table.getSelectedRowModel().rows.length)

    return (
        <div className="flex items-center">
            <TagSelection />






            {/* Selected rows */}
            <div className="mr-auto">
                {table.getSelectedRowModel().rows.length > 0 && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <OutlinedButton size='sm'>Row actions</OutlinedButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem className="bg-red-200 text-red-500">
                                    {/* <User className="mr-2 h-4 w-4" /> */}
                                    <DeleteKeywords selectedRows={table.getSelectedRowModel()} onActionFinished={deselectAllRows} >
                                        {table.getSelectedRowModel().rows.length > 1 ? <span>Delete Keywords</span> : <span>Delete Keyword</span>}
                                    </DeleteKeywords>
                                </DropdownMenuItem>
                                <AddTagToKeywords selectedRows={table.getSelectedRowModel()} onActionFinished={deselectAllRows} />
                                <DeleteTagFromKeyword selectedRows={table.getSelectedRowModel()} onActionFinished={deselectAllRows} />
                                {/* <DropdownMenuItem> */}
                                    <AddNewTagInput selectedRows={table.getSelectedRowModel()} onActionFinished={deselectAllRows} />
                                {/* </DropdownMenuItem> */}
                            </DropdownMenuGroup>
                            {/* <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <span>GitHub</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <span>Support</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled>
                                <span>API</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <span>Log out</span>
                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                            </DropdownMenuItem> */}
                        </DropdownMenuContent>
                    </DropdownMenu>




                )}
            </div>

            <div className="flex gap-2 ml-2">



            </div>

            {/* Searchbar */}
            {/* <div className="max-w-xs h-[36px] inline-flex items-center rounded-md border border-gray-200 px-[10px] focus-within:ring-2 focus-within:ring-blue-500">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" /> */}

            {/* <Input
                    placeholder="Filter by keword name..."
                    value={(table.getColumn("keywordName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("keywordName")?.setFilterValue(event.target.value)
                    }
                    className="h-fit border-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
                /> */}
            {/* </div> */}

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
                    // type="email"
                    // name="email"
                    // id="email"
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                />
            </div>

            {/* Download to Excell */}
            <div className="ml-2">
                <SortingRows sorting={sorting} setSorting={setSorting} />
            </div>

            <TooltipProvider>
                {/* Add keyword */}
                <Tooltip>
                    <TooltipTrigger>
                        <div className=" ml-2 relative w-fit h-fit m-1">
                            <AddKeywordsFrom buttonClassName=" h-[32px] px-2 rounded-lg  inline-flex items-center justify-center whitespace-nowrap shadow-base bg-white z-40 rounded-lg relative">
                                <PlusIcon className="w-5 h-5" />
                            </AddKeywordsFrom>
                            <div className="absolute top-0 left-0 w-full h-full rounded-[8px] outline outline-4 outline-primary-50 bg-primary-50 z-30"></div>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add Keyword</p>
                    </TooltipContent>
                </Tooltip>

                {/* Download to Excell */}
                <Tooltip>
                    <TooltipTrigger>
                        <OutlinedButton className="ml-2" size='sm' buttonClassName="px-2" onClick={() => downloadToExcel(data)} >
                            <ArrowDownTrayIcon className="w-5 h-5" />
                        </OutlinedButton>
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
                                <OutlinedButton size='sm' className="ml-2" buttonClassName="px-2"><ViewColumnsIcon className="w-5 h-5" /></OutlinedButton>
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

