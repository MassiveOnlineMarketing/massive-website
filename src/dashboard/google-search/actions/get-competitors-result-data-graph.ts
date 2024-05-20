'use server'

import { db } from "@/lib/db"
import { subDays, format } from 'date-fns';
import { groupBy, map } from 'lodash';

export const getCompetitorResultDataGraphA = async ({ keywordId }: { keywordId: string }) => {
  console.log('keywordId', keywordId)

  if (!keywordId) return

  

  try {
    const sevenDaysAgo = subDays(new Date(), 7);

    const res = await db.googleSearchCompetitorResult.findMany({
      where: {
        keywordId: keywordId,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    // Group by createdAt date
    const groupedByDate = groupBy(res, result => format(new Date(result.createdAt), 'yyyy-MM-dd'));

    // Create an array of the past 7 days
    const pastSevenDays = Array.from({ length: 7 }, (_, i) => format(subDays(new Date(), i), 'yyyy-MM-dd'));

    // Transform into desired format
    const transformedData = pastSevenDays.map(date => {
      const resultsForDate = groupedByDate[date];
      const competitorsData : { [key: string]: number | null } = {};

      if (resultsForDate) {
        resultsForDate.forEach(result => {
          competitorsData[result.googleSearchCompetitorId] = result.position;
        });
      }

      return {
        date,
        ...competitorsData
      };
    });

    return transformedData;
  } catch (error) {
    return 
  }
}