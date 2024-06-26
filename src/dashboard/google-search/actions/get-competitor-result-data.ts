'use server'

import { db } from "@/lib/db"
import { format as formatDate, subDays } from 'date-fns';

interface GroupedData {
  [date: string]: { [url: string]: number | null };
}
export interface FormattedDataItem {
  date: string;
  [url: string]: any;
}

// Helper functions
const format = (date: Date) => formatDate(date, 'yyyy-MM-dd');
const extractHostname = (url: string) => new URL(url).hostname;

export const getCompetitorResultDataGraphA = async ({ keywordId }: { keywordId: string }) => {
  if (!keywordId) return;

  try {
    const sevenDaysAgo = subDays(new Date(), 7);

    // Get competitor and user results
    const [competitorResultsRes, userResultsRes] = await Promise.all([
      db.googleSearchCompetitorResult.findMany({
        where: { keywordId, createdAt: { gte: sevenDaysAgo } },
        select: { position: true, createdAt: true, googleSearchCompetitor: { select: { domainUrl: true } } },
        orderBy: { createdAt: 'asc' },
      }),
      db.googleSearchResult.findMany({
        where: { keywordId, createdAt: { gte: sevenDaysAgo } },
        select: { position: true, createdAt: true, url: true },
      }),
    ]);

    // Combine competitor and user results
    const combinedData = [
      ...competitorResultsRes.map(result => ({ ...result, url: extractHostname(result.googleSearchCompetitor.domainUrl) })),
      ...userResultsRes.map(result => result.url ? ({ ...result, url: extractHostname(result.url) }) : result),
    ];

    // Group data by date
    const groupedData = combinedData.reduce<GroupedData>((acc, item) => {
      const date = format(item.createdAt);
      if (!acc[date]) acc[date] = {};
      if (item.url) acc[date][item.url] = item.position;
      return acc;
    }, {});

    // Format data for graph
    let result = Object.entries(groupedData)
      .map(([date, data]) => ({ date, ...data }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Fill in missing dates
    while (result.length < 7) {
      const date = format(subDays(new Date(result[0].date), 1));
      result.unshift({ date }); 
    }

    return result;
  } catch (error) {
    console.error('Error getting competitor graph data keywordId: ', keywordId, error);
    throw error;
  }
}