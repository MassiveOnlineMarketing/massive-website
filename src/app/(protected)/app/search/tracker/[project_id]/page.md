'use client'

import React, { useEffect, useState } from 'react'
import { ProjectResult } from '@prisma/client'
import { useKeywordResults } from '@/serp/keywords-context'
import { useProjectDetails } from '@/serp/project-details-context'
import { useSession } from 'next-auth/react'

// Table
import { DataTable } from './_components/table/keyword-table'
import { columns } from './_components/table/columns'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog'
import TagSelection from './_components/table/tag-selection'
import { useFetchKeywordResults } from '@/serp/hooks/useFetchKeywordResults'
import { useKeywords } from '@/serp/hooks/useKeywords'
import { fetch7LatestResults } from '@/serp/data/project'
import ProjectStats from './_components/project-stats-bar-chart'


type pageProps = {
  params: {
    project_id: string
  }
}

const Page = ({ params }: pageProps) => {
  const projectId = params.project_id

  const { filteredResults, isDialogOpen, setIsDialogOpen } = useKeywordResults()
  const { projectDetails, authorized, fetchProjectDetails } = useProjectDetails()
  const { deleteKeywords, cancelDelete, confirmDelete } = useKeywords()
  const refresh_token = useSession().data?.refreshToken

  console.log('re render page')


  const fetchKeywordResults = useFetchKeywordResults();

  useEffect(() => {
    console.log('fetching keyword results')
    if (projectId) {
      console.log('fetching keyword results project id', projectId)
      fetchKeywordResults(projectId);
    }
  }, [projectId]);


  const handleKeywordsDelete = (keywordId: string) => {
    deleteKeywords([keywordId])
  }

  useEffect(() => {
    console.log('fetching project results')
    if (!projectId) return
    console.log('fetching project results project id', projectId)
    fetchProjectDetails(projectId)
  }, [projectId])


  if (!authorized) {
    return <div>you are not authorized to view this page</div>
  }

  // console.log('filteredResults', filteredResults)

  return (
    <div className='p-6 mb-16'>

      {/*
      {projectDetails &&
        <>
          <ProjectStats filteredResults={filteredResults} />
          <DataTable
            columns={columns(handleKeywordsDelete)}
            data={filteredResults}
            projectDetails={projectDetails}
            refresh_token={refresh_token}
          />
        </>
      }
    */}

{/*
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className='bg-white'>
          <AlertDialogHeader>Are you sure you want to delete this keyword?</AlertDialogHeader>
          <AlertDialogFooter>

            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className='bg-red-200 hover:bg-red-300 text-red-500 hover:text-red-600 border border-red-300 px-[24px] py-[12px] rounded-lg'>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
    </div>
  )
}

export default Page