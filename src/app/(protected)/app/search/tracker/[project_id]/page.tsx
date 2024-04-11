'use client'

import React, { useEffect, useState } from 'react'
import { useKeywordResults } from '@/serp/keywords-context'
import { useProjectDetails } from '@/serp/project-details-context'

// Table
import { DataTable } from './_components/table/keyword-table'
import { columns } from './_components/table/columns'

import { ProjectStats } from './_components/project-stats'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog'
import TagSelection from './_components/table/tag-selection'
import { useFetchKeywordResults } from '@/serp/hooks/useFetchKeywordResults'
import { useKeywords } from '@/serp/hooks/useKeywords'
import { useSession } from 'next-auth/react'
import { fetch7LatestResults } from '@/serp/data/project'
import { ProjectResult } from '@prisma/client'
import ProjectStatsBarChart from './_components/project-stats-bar-chart'


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

  const [sevenLatestProjectResults, setSevenLatestProjectResults] = useState<ProjectResult[]>([])


  const fetchKeywordResults = useFetchKeywordResults();

  useEffect(() => {
    if (projectId) {
      fetchKeywordResults(projectId);
    }
  }, []);

  useEffect(() => {
    async function fetchResults() {
      if (projectId) {
        const res = await fetch7LatestResults(projectId);

        if (res) {
          setSevenLatestProjectResults(res);
        } else {
          console.error('Failed to fetch 7 latest results');
        }
      }
    }

    fetchResults();
  }, []);



  const handleKeywordsDelete = (keywordId: string) => {
    deleteKeywords([keywordId])
  }

  useEffect(() => {
    if (!projectId) return

    fetchProjectDetails(projectId)
  }, [])


  if (!authorized) {
    return <div>you are not authorized to view this page</div>
  }

  // console.log('filteredResults', filteredResults)

  return (
    <div className='p-6 mb-16'>
      {
        sevenLatestProjectResults.length > 0 && (
          <ProjectStatsBarChart props={sevenLatestProjectResults} />
        )
      }

      {projectDetails &&
        <>
          {/* <ProjectStatsBarChart props={sevenLatestProjectResults} /> */}
          <ProjectStats data={filteredResults} />
          <DataTable
            columns={columns(handleKeywordsDelete)}
            data={filteredResults}
            projectDetails={projectDetails}
            refresh_token={refresh_token}
          />
        </>
      }

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