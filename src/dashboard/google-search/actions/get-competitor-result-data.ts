'use server'

import { db } from "@/lib/db"
import { subDays } from 'date-fns';

type DataItem = {
  position: number | null;
  createdAt: Date;
  url: string | null;
}

interface GroupedData {
  [date: string]: { [url: string]: number | null};
}

export interface FormattedDataItem {
  date: string;
  [url: string]: any;
}

export const getCompetitorResultDataGraphA = async ({ keywordId }: { keywordId: string }) => {

  if (!keywordId) return

  try {
    const sevenDaysAgo = subDays(new Date(), 7);

    // Get the competitor results for the past 7 days
    const competitorResultsRes = await db.googleSearchCompetitorResult.findMany({
      where: {
        keywordId: keywordId,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        position: true,
        createdAt: true,
        googleSearchCompetitor: {
          select: {
            domainUrl: true,
          }
        }
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    const competitorResults = competitorResultsRes.map(result => {
      if (result.googleSearchCompetitor.domainUrl === null) return result
      const url = new URL(result.googleSearchCompetitor.domainUrl);

      return {
        ...result,
        url: url.hostname,
      };
    })


    // Get the user results for the past 7 days
    const userResultsRes = await db.googleSearchResult.findMany({
      where: {
        keywordId: keywordId,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        position: true,
        createdAt: true,
        url: true,
      },
    })

    const userResults = userResultsRes.map(result => {
      if (result.url === null) return result
      const url = new URL(result.url);
      return {
        ...result,
        url: url.hostname,
      };
    });


    // Combine the user and competitor results
    const combinedData = [...competitorResults, ...userResults.map(u => ({ ...u, googleSearchCompetitor: { domainUrl: u.url } }))];
    const formatedDataItems = combinedData.map(item => ({ ...item, googleSearchCompetitor: undefined })) as DataItem[]; 


    // Format the date to YYYY-MM-DD
    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };


    // Group by date and count URL occurrences
    const groupedData = formatedDataItems.reduce<GroupedData>((acc, item) => {
      const date = formatDate(item.createdAt);
      if (!acc[date]) {
        acc[date] = {};
      }
      if (item.url !== null) {
        acc[date][item.url] = item.position;
      }
      return acc;
    }, {});


    // Convert grouped data to the desired format
    const formattedData: FormattedDataItem[] = Object.keys(groupedData).map(date => {
      const dateData: FormattedDataItem = { date };
      Object.keys(groupedData[date]).forEach(url => {
        dateData[url] = groupedData[date][url];
      });
      return dateData;
    });


    // Sort by date
    formattedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());


    return formattedData
  } catch (error) {
    return
  }
}