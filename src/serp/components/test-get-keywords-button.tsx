'use client';

import { Button } from '@/components/ui/button';
import React from 'react'
import { getLatestKeywordResultWithTags } from '../utils';

export const TestGetKeywordsButton = ({
  projectId
}: {
  projectId: string
}) => {

  const handleClick = async () => {
    const keywords = await getLatestKeywordResultWithTags(projectId);
    console.log('🟢 keywords', keywords)
  }

  return (
    <div>
      <Button onClick={handleClick}>
        Get Keywords
      </Button>
    </div>
  )
}