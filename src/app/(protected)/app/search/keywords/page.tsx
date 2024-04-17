'use client';

import React, { useEffect } from 'react'

import { KeywordResultWithTagProp } from '@/serp/serp-types';

// Hooks and Stores
import { useKeywordResultsStore } from '@/lib/zustand/keyword-results-store';
import { useProjectDetailsStore } from '@/lib/zustand/project-details-store'
import { getLatestKeywordResultWithTags } from '@/serp/utils/utils';
import { useFilteredKeywordResults } from '@/serp/hooks/useFilteredResults';
import { useKeywords } from '@/serp/hooks/useKeywords';
import { useCurrentUserRefreshToken } from '@/auth/hooks/use-current-user';

// Components
import ProjectStats from './_components/project-stats';
import BreadCrumbsSearchKeywords from './_components/bread-crumbs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog'
import DataTable from './_components/table/keyword-table';
import { columns } from './_components/table/columns';


const Page = () => {
  const currentProject = useProjectDetailsStore(state => state)
  const setKeywordResults = useKeywordResultsStore(state => state.setKeywordResults)
  const keywordResults = useKeywordResultsStore(state => state.keywordResults)
  const filteredResults = useFilteredKeywordResults()
  const refresh_token = useCurrentUserRefreshToken()

  // console.log('currentProject', currentProject)

  useEffect(() => {
    if (!currentProject.id) return

    fetchKeywordResults(currentProject.id)
  }, [currentProject])


  console.log('render')
  // console.log('keywordResults', keywordResults)


  const fetchKeywordResults = async (projectId: string) => {
    console.log('fetchKeywordResults')
    const result = await getLatestKeywordResultWithTags(projectId);

    if (result && result.length > 0) {

      const flattenedKeywords = result.flat();
      const filteredKeywords = flattenedKeywords.filter(result => result !== undefined) as KeywordResultWithTagProp[];

      // check if the result is empty, happens after routing to project page when keywords are processed yet
      if (filteredKeywords[0].id === undefined) {
        console.log('no result')
      } else {
        console.log('filteredKeywords', filteredKeywords)
        setKeywordResults(filteredKeywords)
      }
    }
  }

  
  


  const { isDialogOpen, setIsDialogOpen, confirmDelete, cancelDelete, deleteKeywords } = useKeywords()

  const handleKeywordsDelete = (keywordId: string) => {
    console.log('delete', keywordId)
    deleteKeywords([keywordId])
  }

  if (!currentProject.id) {
    return (
      <div className='px-6 w-full'>
        <BreadCrumbsSearchKeywords />
        <div>No project selected</div>
      </div>
    )
  }


  return (
    <div className='px-6 w-full'>
      <BreadCrumbsSearchKeywords />
      {keywordResults ? (
        <ProjectStats />
      ) : (
        <div>Loading...</div>
      )}
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
    </div>
  )
}

export default Page