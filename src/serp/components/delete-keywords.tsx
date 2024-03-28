'use client'

import { Button } from "@/components/ui/button";
import { useKeywords } from "..//hooks/useKeywords";

export const DeleteKeywords = ({ selectedRows, onActionFinished, children }: { selectedRows: any, onActionFinished: () => void, children: React.ReactNode }) => {
  const keywordIds = selectedRows.rows.map((row: any) => row.original.keywordId);
  // convert keywordIds to string

  const { deleteKeywords } = useKeywords();

  const handleDeleteClick = async () => {
    // console.log('delete', keywordIds)
    await deleteKeywords(keywordIds);
    onActionFinished();
  }

  return (
    <p onClick={handleDeleteClick}>
      {children}
    </p>
  )
}