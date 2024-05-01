import { KeywordResultWithTagProp } from "../serp-types";

// hooks
import { useState } from "react";
import { useToast } from "@/website/features/toast/use-toast";
import { useKeywordResultsStore } from "@/lib/zustand/keyword-results-store";
import { deleteKeywordsById } from "@/dashboard/google-search/data/google-search-keyword";

// actions

/**
 * Custom hook for managing keywords.
 * 
 * @returns An object containing functions for adding, deleting, confirming deletion, canceling deletion, adding results, and resetting results.
 */
export const useKeywords = () => {
  const { toast } = useToast();
  const [keywordsToDelete, setKeywordsToDelete] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // [project_id]

  const results = useKeywordResultsStore((state) => state.keywordResults);
  const setResults = useKeywordResultsStore((state) => state.setKeywordResults);
  const updateKeywordResults = useKeywordResultsStore((state) => state.updateKeywordResults);


  /**
   * ? Deletes the selected keywords and updates the results.
   */
  const deleteKeywords = (keywordId: string[]) => {
    setKeywordsToDelete(keywordId);
    setIsDialogOpen(true);
  }

  const confirmDelete = async () => {
    if (keywordsToDelete !== null) {
      const responses = await deleteKeywordsById(keywordsToDelete);
      // if response is only one array show tost else console.log
      if (responses.length === 1) {
        toast({
          description: `The keyword ${responses[0].keyword} is deleted.`,
          variant: 'success',
          icon: 'success',
          duration: 5000,
        });
      } else if (responses.length > 1) {
        toast({
          description: `The keyword is deleted.`,
          icon: 'success',
          variant: 'success',
        })
      } else {
        console.log('Failed to delete keyword:', responses);
      }

      const newResults = results.filter((result: KeywordResultWithTagProp) => !keywordsToDelete.includes(result.keywordId));
      setResults(newResults);
      setIsDialogOpen(false);
    }
  }

  const cancelDelete = () => {
    setIsDialogOpen(false);
  }


  /**
   * ? Adds new keyword results to the existing results.
   * * If the newResults array is empty, it removes all empty arrays from the results.
   * 
   * @param newResults - An array of KeywordResultWithTagProp objects representing the new keyword results to be added.
   */
  const addResults = (newResults: KeywordResultWithTagProp[]) => {
    updateKeywordResults(newResults);
  };


  /**
   * ? Resets the results array.
   */
  const resetResults = () => {
    setResults([]);
  }

  return {
    deleteKeywords,
    confirmDelete,
    cancelDelete,
    addResults,
    resetResults,
    isDialogOpen,
    setIsDialogOpen
  }
}