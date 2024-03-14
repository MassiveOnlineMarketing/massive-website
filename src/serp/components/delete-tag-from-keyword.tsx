'use client'

import React, { useState } from 'react'

import { Button } from '@/components/ui/button'

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useTags } from '../hooks/useTags'


export const DeleteTagFromKeyword = ({ selectedRows, onActionFinished }: { selectedRows: any, onActionFinished: () => void  }) => {
  const [open, setOpen] = useState(false)
  const { deleteTagAndToast } = useTags()


  const keywordIds = selectedRows.rows.map((row: any) => row.original.keywordId);
  const selectedTags = selectedRows.rows.map((row: any) => row.original.tags);

  
  const allSelectedTags = selectedTags.flat()
  // @ts-ignore
  const names = allSelectedTags.map(item => item.name);
  // @ts-ignore
  const uniqueNames = [...new Set(names)];


  const handleDeleteClick = async (label: string) => {
    try {
      deleteTagAndToast(label, keywordIds)
      onActionFinished()
    } catch (error) {
      console.error('Failed to delete tag from keywords:', error);
    }
  }


  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Delete tag
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuGroup>
          {uniqueNames.map((label) => (
            <DropdownMenuItem
              key={label}
              className='hover:bg-gray-100 cursor-pointer'
              onClick={() => handleDeleteClick(label)}
            >{label}</DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
