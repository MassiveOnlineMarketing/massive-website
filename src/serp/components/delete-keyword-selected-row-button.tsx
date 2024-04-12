import React from 'react'
import { Dialog, DialogContent, DialogTriggerNoButton } from '@/website/features/dialog/dialog'
import { useKeywords } from '../hooks/useKeywords';


export const DeleteKeywordSelectedRowButton = ({selectedRows, children }: { selectedRows: any, children: React.ReactNode }) => {
    const keywordIds = selectedRows.rows.map((row: any) => row.original.keywordId);

    const { deleteKeywords, confirmDelete, cancelDelete, isDialogOpen, setIsDialogOpen } = useKeywords();

    const handleDeleteClick = () => {
        setIsDialogOpen(true)
        deleteKeywords(keywordIds);
    }

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
                <DialogTriggerNoButton className='px-2' onClick={handleDeleteClick}>
                    {children}
                </DialogTriggerNoButton>
                <DialogContent>
                    <button onClick={cancelDelete} className='bg-white text-neutral-900 border border-neutral-200 px-[24px] py-[12px] rounded-lg'>Cancel</button>
                    <button onClick={confirmDelete} className='bg-red-200 hover:bg-red-300 text-red-500 hover:text-red-600 border border-red-300 px-[24px] py-[12px] rounded-lg'>Confirm</button>
                </DialogContent>
            </Dialog>
        </>

    )

}