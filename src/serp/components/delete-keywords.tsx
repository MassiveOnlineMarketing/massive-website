'use client'

import { Button } from "@/components/ui/button";
import { useKeywords } from "..//hooks/useKeywords";

export const DeleteKeywords = ({ selectedRows, onActionFinished }: { selectedRows: any, onActionFinished: () => void }) => {
  const keywordIds = selectedRows.rows.map((row: any) => row.original.keywordId);
  // convert keywordIds to string

  const { deleteKeywords } = useKeywords();

  const handleDeleteClick = async () => {
    // console.log('delete', keywordIds)
    await deleteKeywords(keywordIds);
    onActionFinished();
  }

  return (
    <Button variant='outline' size='sm' onClick={handleDeleteClick}>Delete</Button>
  )
}