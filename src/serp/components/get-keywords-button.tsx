'use client';

import { Button } from '@/components/ui/button';
import React from 'react'
import { getKeywordsByProjectId } from '../data/keyword';

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