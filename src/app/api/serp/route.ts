// app/api/serp.ts

import { insertKeywords } from "@/serp/data/keyword";
import { insertUserResults } from "@/serp/data/result";
import { insertSERPResults } from "@/serp/data/serp-result";
import axios from "axios";

const BATCH_SIZE = 100;
export const maxDuration = 9;

interface Data {
  projectId: string;
  keyword: string[];
  language: string;
  country: string;
  domainUrl: string;

}

export async function POST(request: Request) {

  const data: Data = await request.json();

  const { projectId, keyword, language, country, domainUrl } = data;



  console.time('addKeywordToProject'); // Start the timer

  // add keywords to keywords table in the database
  const keywords = await insertKeywords(projectId, keyword);

  // make api call to serperApi to get the serp results
  const response = await fetchSERPResults(keywords.keywordResponse, language, country, domainUrl);

  // add user result to the result table in the database
  await handleSerpResults(response);

  // add top 10 results to the serpresults table in the database'
  const userResultsArrays = await handleUserResults(response);

  console.timeEnd('addKeywordToProject'); // End the timer



  // Return the processed data
  return new Response(JSON.stringify(userResultsArrays), {
    headers: { 'Content-Type': 'application/json' },
  });
}





const serper_headers = {
  'X-API-KEY': process.env.SERPER_API_KEY,
  'Content-Type': 'application/json'
};
interface KeywordProps {
  id: string;
  keyword: string;
}

async function fetchSERPResults(
  keywords: KeywordProps[],
  projectLanguage: string,
  projectCountry: string,
  projectDomain: string
) {
  const data = keywords.map(keyword => ({
    "q": keyword.keyword,
    "gl": projectCountry,
    "hl": projectLanguage,
    "autocorrect": false,
    "num": 100
  }));

  // Error handling
  var successfulFetches = [];
  var failedFetches = [];

  try {
    // console.log('data', data);
    // Make the API call to SERP API
    const response = await axios.post('https://google.serper.dev/search', data, { headers: serper_headers });
    for (let i = 0; i < response.data.length; i++) {
      const result = response.data[i];
      if (result.organic.length > 0) {
        result.organic.forEach((item: any) => {
          item.keyword_id = keywords[i].id;
          item.domain = projectDomain;
          item.keywordName = keywords[i].keyword;
        });
        successfulFetches.push(result.organic);
      } else {
        failedFetches.push(keywords[i]);
      }
    }
  } catch (error) {
    console.error('🔴 Error with the API call:', error);
    return { error: 'Error with the API call' };
  }

  if (failedFetches.length === 0) {
    console.log(`🟢 Successfully fetched all ${successfulFetches.length} keyword results from SERP API`);
  } else {
    console.log(`🔴 Failed to fetch ${failedFetches.length} keyword results`);
  }

  return successfulFetches;
}

async function handleSerpResults(response: any) {
  // Prepare data for batch insert
  const insertData = [];
  for (const results of response) {
    for (const result of results.slice(0, 10)) {
      insertData.push({ keywordId: result.keyword_id, position: result.position, url: result.link, metaTitle: result.title, metaDescription: result.snippet });
    }
  }

  // console.log('insertData', insertData);

  // Perform batch insert
  try {
    await insertSERPResults(insertData);

    console.log(`🟢 Successfully inserted all ${insertData.length} results in SERPResults Table`);
  } catch (error) {
    console.error(`🔴 Error inserting results:`, error);
  }
}

async function handleUserResults(response: any) {
  // console.log('response', response);

  // console.log('resultName', resultName);

  const newResults = [];
  for (const result of response) {
    var keyword_id = null;
    var resultTitle = "";
    var resultURL = "";
    var resultDescription = "";
    var resultPosition = null;
    var resultName = '';

    for (var i = 0; i < result.length; i++) {
      const link = result[i].link;
      keyword_id = result[i].keyword_id;
      const domain_url = result[i].domain;
      resultName = result[i].keywordName;
      if (link.includes(domain_url)) {
        resultTitle = result[i].title;
        resultURL = link.replace("https://" + domain_url, "");
        resultDescription = result[i].snippet;
        resultPosition = result[i].position;
        break;
      }
      // console.log('keywordName', resultName);
    }
    newResults.push({
      keywordId: keyword_id,
      keywordName: resultName,
      position: resultPosition,
      url: resultURL,
      metaTitle: resultTitle,
      metaDescription: resultDescription,
      firstPosition: resultPosition,
      bestPosition: resultPosition,

    });
  }

  // console.log('newResults', newResults);
  await insertUserResults(newResults)

  return newResults;
}