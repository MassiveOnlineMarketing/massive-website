'use server';

import { db } from '@/lib/db'

export const getFiltersByWebsiteId = async (websiteId: string) => {
  return await db.googleResultFilter.findMany({
    where: {
      websiteId: websiteId,
    },
    include: {
      urls: { select: { url: true } },
    },
  });
};