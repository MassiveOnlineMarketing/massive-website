'use client';

import React, { useEffect } from 'react'

// types
import { LatestResultsDTO } from '@/dashboard/google-search/serp-types'
import { GoogleSearchProject } from '@prisma/client';

// Stores
import { useWebsiteDetailsStore } from "@/lib/zustand/website-details-store";
import { useGoogleSearchProjectDetailsStore } from "@/lib/zustand/google-search-details-store";
import { useKeywordResultsStore } from "@/lib/zustand/keyword-results-store";

// Hooks
import { useFilteredKeywordResults } from "@/dashboard/google-search/hooks/useFilteredResults";
import { useKeywords } from "@/dashboard/google-search/hooks/useKeywords";

// Components
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import ProjectStats from './project-stats';
import DataTable from './table/keyword-table';
import { columns } from './table/columns';


interface ClientPageProps {
  results: LatestResultsDTO[]
  googleSearchProject: GoogleSearchProject
}

const ClientPage = ({ results, googleSearchProject }: ClientPageProps) => {
  const currentWebsite = useWebsiteDetailsStore((state) => state.WebsiteDetails);

  const setGoogleSearchProjectDetails = useGoogleSearchProjectDetailsStore((state) => state.setProjectDetails);

  const setResults = useKeywordResultsStore((state) => state.setKeywordResults);
  const resetResults = useKeywordResultsStore((state) => state.resetKeywordResults);
  const resetSelectedTags = useKeywordResultsStore((state) => state.resetSelectedTags);
  const filteredResults = useFilteredKeywordResults();

  useEffect(() => {
    resetResults()
    resetSelectedTags();

    const filteredKeywords = results.filter(
      (result) => result !== undefined,
    ) as LatestResultsDTO[];

    setResults(filteredKeywords);
    setGoogleSearchProjectDetails(googleSearchProject);
  }, [])

  const {
    isDialogOpen,
    setIsDialogOpen,
    confirmDelete,
    cancelDelete,
  } = useKeywords();

  return (
    <div>
      <ProjectStats filteredResults={filteredResults} />
      <DataTable columns={columns(currentWebsite?.domainUrl)} data={filteredResults} />

      {/* Dialog for deleting keyword */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            Are you sure you want to delete this keyword?
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-200 hover:bg-red-300 text-red-500 hover:text-red-600 border border-red-300 px-[24px] py-[12px] rounded-lg"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default ClientPage