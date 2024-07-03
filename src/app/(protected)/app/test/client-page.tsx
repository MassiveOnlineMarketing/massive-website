'use client';

import { getGoogleSearchProjectById } from '@/dashboard/data/google-search-project';
import { getLatestKeywordResultWithTags } from '@/dashboard/google-search/actions/get-latest-keywords-with-tags';
import { LatestResultsDTO } from '@/dashboard/google-search/serp-types';
import { Website } from '@prisma/client';
import React from 'react'
import { getData } from './actions';

const ClientPage = () => {


  const fetchProjectDetails = async () => {
    console.time('fetchProjectDetails');
    const res = await getGoogleSearchProjectById('cly4wrekt000f11w3qwu1t92n');
    if (!res) return;

    let websiteDetails: Website | null = null;
    if (typeof window !== 'undefined') {
      websiteDetails = JSON.parse(sessionStorage.getItem('websiteDetails') || '{}');
    }

    if (res.websiteId === websiteDetails?.id) {

      fetchKeywordResults(res.id);
    } else {
      console.log('redirect to search page')
    }
  };

  const fetchKeywordResults = async (projectId: string) => {
    const result = await getLatestKeywordResultWithTags(projectId);

    if (result && result.length > 0) {
      const flattenedKeywords = result.flat();
      const filteredKeywords = flattenedKeywords.filter(
        (result) => result !== undefined,
      ) as LatestResultsDTO[];

      // check if the result is empty, happens after routing to project page when keywords are processed yet
      if (filteredKeywords[0].id === undefined) {
        console.log("no result");
      } else {
        console.log(filteredKeywords)
        console.timeEnd('fetchProjectDetails');
      }
    } else {
      console.log('reset keyword results')
    }
  };

  const fetchData = async () => {
    console.time('fetchProjectDetails');
    const res = await getData();
    console.log(res)
    console.timeEnd('fetchProjectDetails');
  }

  return (
    <div>
      <button onClick={fetchData}>Fetch Project Details</button>
    </div>
  )
}

export default ClientPage