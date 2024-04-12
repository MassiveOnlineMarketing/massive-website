'use client';

import React from 'react'

// Hooks
import { useKeywords } from '@/serp/hooks/useKeywords';
import { useFilteredKeywordResults } from '@/serp/hooks/useFilteredResults';

// Components
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog'
import ProjectStats from './_components/project-stats';
import { DataTable } from './_components/table/keyword-table'
import { columns } from './_components/table/columns'
import ProjectDetails from './_components/project-details';


type Props = {
    refresh_token?: string
}

const Test = ({ refresh_token }: Props) => {
    // console.log('render test')
    const filteredResults = useFilteredKeywordResults()

    const { isDialogOpen, setIsDialogOpen, confirmDelete, cancelDelete, deleteKeywords } = useKeywords()

    const handleKeywordsDelete = (keywordId: string) => {
        console.log('delete', keywordId)
        deleteKeywords([keywordId])
    }

    return (
        <>
            <ProjectDetails /> 
            <ProjectStats />
            <DataTable
                columns={columns(handleKeywordsDelete)}
                data={filteredResults}
                refresh_token={refresh_token}
            />

            {/* Dialog for deleting keyword */}
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent className='bg-white'>
                    <AlertDialogHeader>Are you sure you want to delete this keyword?</AlertDialogHeader>
                    <AlertDialogFooter>

                        <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className='bg-red-200 hover:bg-red-300 text-red-500 hover:text-red-600 border border-red-300 px-[24px] py-[12px] rounded-lg'>Confirm</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default Test