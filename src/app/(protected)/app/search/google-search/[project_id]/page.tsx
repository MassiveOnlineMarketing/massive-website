'use server';

import React, { Suspense } from 'react'

// Types
import { GoogleSearchProject } from '@prisma/client';
import { LatestResultsDTO } from '@/dashboard/google-search/serp-types';

// Actions
import { auth } from '@/auth/auth';
import { getGoogleSearchProjectById } from '@/dashboard/data/google-search-project';
import { getLatestKeywordResultWithTags } from '@/dashboard/google-search/actions/get-latest-keywords-with-tags';

// Components
import BreadCrumbsSearchKeywords from '../../google-search/_components/bread-crumbs';
import ClientPage from '../_components/client-page';
import { LoadingSpinner } from '@/components/loading-spinner';


async function PageInitializationLoading({ project }: { project: GoogleSearchProject }) {

  // Check if the user is authorized to view the project
  const session = await auth()
  if (project.userId !== session?.user.id) return <div className='flex h-full w-full items-center justify-center'>Not authorized</div>;
  const latestResultsRes = await getLatestKeywordResultWithTags(project.id);


  let latestResults: LatestResultsDTO[] = [];
  //! Check if first result is not undefined, happens when project is just created and we don't have any results yet
  if (latestResultsRes && latestResultsRes[0].id !== undefined) {
    latestResults = latestResultsRes.filter((result) => result !== undefined);
  } else {
    // If there are no results, return an empty array
    latestResults = [];
  }

  return <ClientPage results={latestResults} googleSearchProject={project} />
}


const page = async ({
  params: { project_id }
}: {
  params: { project_id: string }
}) => {

  // Get the project details
  const projectRes = await getGoogleSearchProjectById(project_id);
  if (!projectRes) return <div className='flex h-full w-full items-center justify-center'>Project not Found</div>;

  return (
    <div className="px-6 pb-6 w-full h-full">
      <BreadCrumbsSearchKeywords projectName={projectRes.projectName} />

      <Suspense fallback={<div className='flex h-full w-full items-center justify-center'><LoadingSpinner /></div>}>
        <PageInitializationLoading project={projectRes} />
      </Suspense>
    </div>
  )
}

export default page