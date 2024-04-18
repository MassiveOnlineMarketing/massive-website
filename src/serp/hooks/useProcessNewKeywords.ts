import { useState } from 'react';
import { useKeywords } from './useKeywords';
import { RenderResultResponse } from 'next/dist/server/render-result';
import { useCurrentUser } from '@/auth/hooks/use-current-user';
import { decrementDisplayCredits } from '@/auth/actions/credits';
import { useToast } from '@/website/features/toast/use-toast';
import { GoogleSearchConsoleProjectDetails } from '@/lib/zustand/google-search-details-store';

export function useProcessNewKeywords() {
  const { addResults } = useKeywords();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = useCurrentUser();
  const { toast } = useToast();

  /**
   * ? Processes an array of keywords in batches and sends them to the server for processing.
   * * The api will then return the results and add them to the state.
   * * The user credits will also be decremented based on the number of results.
   * 
   * @param keywordsArray - The array of keywords to process.
   * @param project - The project object containing project details.
   */
  const processNewKeywords = async (keywordsArray: string[], project: GoogleSearchConsoleProjectDetails) => {
    // console.log('keywordsArray', keywordsArray)

    if (!project) {
      setError('Project not found');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    if (!user) {
      setError('User not found');
      setIsLoading(false);
      return;
    }

    if (keywordsArray.length >= user?.credits) {
      setError('Not enough credits to process all keywords');
      setIsLoading(false);
      return;
    }

    const BATCH_SIZE = 50;

    try {
      for (let i = 0; i < keywordsArray.length; i += BATCH_SIZE) {
        const batch = keywordsArray.slice(i, i + BATCH_SIZE);
        // console.log('batch', batch)
        console.log('project', project)

        const payload = {
          projectId: project.id,
          keyword: batch,
          language: project.language,
          country: project.country,
          domainUrl: project.domainUrl,
          userId: user?.id,
        }

        const response = await fetch('/api/serp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const resultResponse = await response.json();

        if (resultResponse) {
          const updatedResults = resultResponse.map((res: RenderResultResponse[]) => ({
            ...res,
            createdAt: new Date().toISOString(),
            tags: [],
          }));

          // decrement user credits
          await decrementDisplayCredits(updatedResults.length);

          addResults(updatedResults)
        }
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }

    return error
  };
  return { processNewKeywords, isLoading, error };
}