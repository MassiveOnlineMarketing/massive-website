'use client';

import { Button } from '@/components/ui/button';
import { getKeywordsByProjectId } from '@/dashboard/google-search/data/google-search-keyword';
import React from 'react'

const GetKeywordsButton = ({
  projectId
}: {
  projectId: string
}) => {

  const handleClick = async () => {
    const keywords = await getKeywordsByProjectId(projectId)

    console.log(keywords)
  }

  return (
    <div>
      <Button onClick={handleClick}>
        Get Keywords
      </Button>
    </div>
  )
}

export default GetKeywordsButton