"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useWebsiteDetailsStore } from "@/lib/zustand/website-details-store";
import { useGoogleSearchProjectDetailsStore } from "@/lib/zustand/google-search-details-store";
import { useKeywordResultsStore } from "@/lib/zustand/keyword-results-store";

import { KeywordResultWithTagProp } from "@/dashboard/google-search/serp-types";
import { getLatestKeywordResultWithTags } from "@/dashboard/google-search/actions/get-latest-keywords-with-tags";
import { getGoogleSearchProjectById } from "@/dashboard/data/google-search-project";
import { useKeywords } from "@/dashboard/google-search/hooks/useKeywords";
import { useFilteredKeywordResults } from "@/dashboard/google-search/hooks/useFilteredResults";

// Components
import ProjectStats from "../_components/project-stats";
import BreadCrumbsSearchKeywords from "../_components/bread-crumbs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import DataTable from "../_components/table/keyword-table";
import { columns } from "../_components/table/columns";
import { getCompetitorsByProjectId } from "@/dashboard/google-search/data/google-search-competitor";
import { Website } from "@prisma/client";

type Props = {
  params: {
    project_id: string;
  };
};

function Page({ params }: Props) {
  const router = useRouter();

  const currentWebsite = useWebsiteDetailsStore(
    (state) => state.WebsiteDetails,
  );

  // const setCompetitors = useGoogleSearchProjectDetailsStore((state) => state.setCompetitors);
  const setGoogleSearchProjectDetails = useGoogleSearchProjectDetailsStore((state) => state.setProjectDetails);
  const googleSearchProjectDetails = useGoogleSearchProjectDetailsStore((state) => state.ProjectDetails);

  const keywordResults = useKeywordResultsStore((state) => state.keywordResults);
  const setKeywordResults = useKeywordResultsStore((state) => state.setKeywordResults);
  const resetKweywordResults = useKeywordResultsStore((state) => state.resetKeywordResults);
  const resetSelectedTags = useKeywordResultsStore((state) => state.resetSelectedTags);
  const filteredResults = useFilteredKeywordResults();

  // Clean up old results
  useEffect(() => {
    resetKweywordResults()
  }, [])

  // Fetch project details + keyword results
  useEffect(() => {
    fetchProjectDetails();
  }, [currentWebsite]);

  
  
  
  const fetchProjectDetails = async () => {
    const res = await getGoogleSearchProjectById(params.project_id);
    if (!res) return;
    
    let websiteDetails: Website | null = null;
    if (typeof window !== 'undefined') {
      websiteDetails = JSON.parse(sessionStorage.getItem('websiteDetails') || '{}');
    }
    
    if (res.websiteId === websiteDetails?.id) {
      setGoogleSearchProjectDetails(res);
      const competitors = await getCompetitorsByProjectId(res.id);
      // setCompetitors(competitors);

      fetchKeywordResults(res.id);
    } else {
      router.push("/app/search");
    }
  };

  const fetchKeywordResults = async (projectId: string) => {
    resetSelectedTags();

    const result = await getLatestKeywordResultWithTags(projectId);

    if (result && result.length > 0) {
      const flattenedKeywords = result.flat();
      const filteredKeywords = flattenedKeywords.filter(
        (result) => result !== undefined,
      ) as KeywordResultWithTagProp[];

      // check if the result is empty, happens after routing to project page when keywords are processed yet
      if (filteredKeywords[0].id === undefined) {
        console.log("no result");
      } else {
        setKeywordResults(filteredKeywords);
      }
    } else {
      resetKweywordResults();
    }
  };

  const {
    isDialogOpen,
    setIsDialogOpen,
    confirmDelete,
    cancelDelete,
  } = useKeywords();

  return (
    <div className="px-6 pb-6 w-full">
      <BreadCrumbsSearchKeywords projectName={googleSearchProjectDetails?.projectName} />
      {keywordResults ? <ProjectStats /> : <div>Loading...</div>}
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
  );
}

export default Page;
