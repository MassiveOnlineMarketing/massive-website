import { useToast } from "@/website/features/toast/use-toast";
import { deleteKeywordsById } from "../data/keyword";
import { getKeywordResultById } from "../data/result";
import { KeywordResultWithTagProp, useKeywordResults } from "../keywords-context";

/**
 * Custom hook for managing keywords.
 * 
 * @returns An object containing functions for adding, deleting, confirming deletion, canceling deletion, adding results, and resetting results.
 */
export const useKeywords = () => {
  const { toast } = useToast();
  const { setResults, results, setIsDialogOpen, setKeywordsToDelete, keywordsToDelete } = useKeywordResults();


  /**
   * ?Adds keywords to the results array, fetched from database.
   * 
   * @param keywordId - An array of keyword IDs to be added.
   */
  const addKeywords = async (keywordId: string[]) => {
    const newKeywords = await getKeywordResultById(keywordId)

    setResults([...results, ...newKeywords])
  };



  /**
   * ? Deletes the selected keywords and updates the results.
   */
  const deleteKeywords = (keywordId: string[]) => {
    console.log('delete', keywordId)

    setKeywordsToDelete(keywordId);
    setIsDialogOpen(true);

    console.log('delete state', keywordId);
  }

  const confirmDelete = async () => {
    console.log('confirmDelete', keywordsToDelete);

    if (keywordsToDelete !== null) {
      const responses = await deleteKeywordsById(keywordsToDelete);
      console.log('responses', responses);
      // if response is only one array show tost else console.log
      if (responses.length === 1) {
        toast({
          title: `Keyword deleted`,
          description: `The keyword ${responses[0].keyword} is deleted.`,
          variant: 'success',
          duration: 5000,
        });
      } else if (responses.length > 1) {
        toast({
          title: 'Keywords deleted',
          description: `The keyword are deleted.`,
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
    console.log('cancelDelete');
  }

  
  /**
   * ? Adds new keyword results to the existing results.
   * * If the newResults array is empty, it removes all empty arrays from the results.
   * 
   * @param newResults - An array of KeywordResultWithTagProp objects representing the new keyword results to be added.
   */
  const addResults = (newResults: KeywordResultWithTagProp[]) => {
    if (newResults.length === 0) {
      // @ts-ignore
      setResults(prevResults => prevResults.filter(result => result.length !== 0));
      return;
    }
    
    // @ts-ignore
    setResults(prevResults => [...prevResults, ...newResults]);
  };


  /**
   * ? Resets the results array.
   */
  const resetResults = () => {
    setResults([]);
  }

  return {
    addKeywords,
    deleteKeywords,
    confirmDelete,
    cancelDelete,
    addResults,
    resetResults
  }
}