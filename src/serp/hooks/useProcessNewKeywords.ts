import { useState } from 'react';
import { processArrayInBatches } from '../lib/utils'; // adjust the path as needed
import { Project } from '@prisma/client';
import { useKeywords } from './useKeywords';
import { RenderResultResponse } from 'next/dist/server/render-result';

export function useProcessNewKeywords() {
  const { addResults } = useKeywords();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * ? Processes an array of keywords in batches and sends them to the server for processing.
   * 
   * @param keywordsArray - The array of keywords to process.
   * @param project - The project object containing project details.
   */
  const processNewKeywords = async (keywordsArray: string[], project: Project) => {
    setIsLoading(true);
    setError(null);

    const BATCH_SIZE = 50;

    try {
      for (let i = 0; i < keywordsArray.length; i += BATCH_SIZE) {
        const batch = keywordsArray.slice(i, i + BATCH_SIZE);
        console.log('batch', batch)

        const payload = {
          projectId: project.id,
          keyword: batch,
          language: project.language,
          country: project.country,
          domainUrl: project.domainUrl,
        }

        const response = await fetch('/api/serp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const resultResponse = await response.json();
        console.log(resultResponse); // Process the response data as needed

        if (resultResponse) {
          const updatedResults = resultResponse.map((res: RenderResultResponse[]) => ({
            ...res,
            createdAt: new Date().toISOString(),
            tags: [],
          }));

          addResults(updatedResults)
        }
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return { processNewKeywords, isLoading, error };
}