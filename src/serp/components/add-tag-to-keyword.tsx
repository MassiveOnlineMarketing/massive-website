'use client'

import React from 'react'

import { Button } from '@/components/ui/button'

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Tag } from '@prisma/client'
import { useTags } from '../hooks/useTags'


export const AddTagToKeywords = ({ selectedRows, onActionFinished }: { selectedRows: any, onActionFinished: () => void  }) => {
  const [open, setOpen] = React.useState(false)

  const { addTagAndToast, uniqueTags } = useTags()
  
  const keywordIds = selectedRows.rows.map((row: any) => row.original.keywordId);


  const handleAddClick = async (tag: Tag) => {
    console.log('label', tag)
    await addTagAndToast(tag, keywordIds)
    onActionFinished()
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          add existing tag
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuGroup>
          {uniqueTags.map((label) => (
            <DropdownMenuItem
              key={label.id}
              className='hover:bg-gray-100 cursor-pointer'
              onClick={() => handleAddClick(label)}
            >{label.name}</DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
