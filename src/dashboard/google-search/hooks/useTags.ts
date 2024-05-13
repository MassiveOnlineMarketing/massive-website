import { GoogleSearchKeywordTag } from "@prisma/client";
import { useKeywordResultsStore } from "@/lib/zustand/keyword-results-store";

import { useToast } from "@/website/features/toast/use-toast";
import { useMemo } from "react";
import { ensureArray } from "@/lib/utils";
import {
  addTagToKeywords,
  deleteTagFromKeywords,
} from "@/dashboard/google-search/data/google-search-keyword";

export const useTags = () => {
  const { toast } = useToast();

  const results = useKeywordResultsStore((state) => state.keywordResults);
  const setResults = useKeywordResultsStore((state) => state.setKeywordResults);

  /**
   * ? Adds a tag to the results based on the provided keyword IDs.
   *
   * If the tag is a string, it will be converted to an object with id and name properties.
   * If the tag is an array, each string in the array will be converted to an object.
   * @param tag - The tag to be added to the results.
   * @param keywordIds - The keyword IDs to match against in the results.
   */
  const addTagToResults = (
    tag: GoogleSearchKeywordTag,
    keywordIds: string[],
  ) => {
    const updatedResults = results.map((result) => {
      if (keywordIds.includes(result.keywordId)) {
        // If tag is a string, convert it to an object with id and name properties
        // If tag is an array, map over it and convert each string to an object
        const tagsToAdd = Array.isArray(tag)
          ? tag.map((t) => ({ id: t, name: t }))
          : [{ id: tag.id, name: tag.name }];

        return {
          ...result,
          tags: [...result.tags!, ...tagsToAdd],
        };
      }
      return result;
    });
    setResults(updatedResults);
  };

  /**
   * ? Adds a tag to keywords and displays a toast notification.
   *
   * @param tag - The tag to be added.
   * @param keywordIds - The ID(s) of the keywords to add the tag to.
   * @returns A promise that resolves with the response from adding the tag to keywords.
   */
  const addTagAndToast = async (
    tag: GoogleSearchKeywordTag,
    keywordIds: string[] | string,
  ) => {
    try {
      const tagResponse = await addTagToKeywords(tag.name, keywordIds);
      if (tagResponse) {
        const keywordIdsArray = ensureArray(keywordIds);
        addTagToResults(tag, keywordIdsArray);

        // Check the length of the tagResponse array
        const toastTitle =
          tagResponse.length === 1
            ? `Tag ${tag.name} added to keyword`
            : `Tag ${tag.name} added to keywords`;

        toast({
          description: toastTitle,
          variant: "success",
          icon: "success",
          duration: 5000,
        });

        // console.log("Tag added to keywords:", tagResponse);
        return tagResponse;
      }
    } catch (error) {
      toast({
        description: `Failed to add tag to keywords`,
        variant: "destructive",
        icon: "destructive",
        duration: 5000,
      });
      console.error("Failed to add tag to keywords:", error);
    }
  };

  /**
   * ? Deletes a tag from the results based on the tag name and keyword IDs.
   *
   * @param tagName - The name of the tag to delete.
   * @param keywordIds - The IDs of the keywords associated with the tag.
   */
  const deleteTagFromResults = (
    tagName: string,
    keywordIds: string[] | string,
  ) => {
    const updatedResults = results.map((result) => {
      if (keywordIds.includes(result.keywordId)) {
        const tagsToDelete = ensureArray(tagName);
        return {
          ...result,
          tags: result.tags?.filter(
            (tag: GoogleSearchKeywordTag) => !tagsToDelete.includes(tag.name),
          ),
        };
      }
      return result;
    });
    setResults(updatedResults);
  };

  /**
   * ? Deletes a tag from keywords and displays a toast notification.
   *
   * @param tagName - The name of the tag to be deleted.
   * @param keywordIds - The IDs of the keywords from which the tag should be deleted.
   * @returns A promise that resolves to the response from deleting the tag.
   */
  const deleteTagAndToast = async (
    tagName: string,
    keywordIds: string[] | string,
  ) => {
    try {
      // batch the keywords in batches of 50 and then request deleteTagFromkeywords

      const batchSize = 50;
      const keywordIdsArray = ensureArray(keywordIds);
      const batches = [];
      for (let i = 0; i < keywordIdsArray.length; i += batchSize) {
        const batch = keywordIdsArray.slice(i, i + batchSize);
        batches.push(batch);
      }

      const tagResponse = [];

      for (const batch of batches) {
        const response = await deleteTagFromKeywords(batch, tagName);

        if (tagResponse) {
          tagResponse.push(response);
          // console.log("Tag deleted from keywords:", response);
        }
      }

      if (tagResponse) {
        deleteTagFromResults(tagName, keywordIds);

        // Check the length of the tagResponse array
        const toastTitle =
          tagResponse.length === 1
            ? `Tag ${tagName} deleted from keyword`
            : `Tag ${tagName} deleted from keywords`;

        toast({
          description: toastTitle,
          variant: "success",
          icon: "success",
          duration: 5000,
        });

        console.log("Tag deleted from keywords:", tagResponse);
        return tagResponse;
      }
    } catch (error) {
      toast({
        description: `Failed to delete tag from keywords`,
        variant: "destructive",
        icon: "destructive",
        duration: 5000,
      });
      console.error("Failed to delete tag from keywords:", error);
    }
  };

  const keywordResults = useKeywordResultsStore(
    (state) => state.keywordResults,
  );
  /**
   * ? Calculates the unique tags from the results array.
   *
   * @returns An array of unique tags.
   */
  const uniqueTags = useMemo(() => {
    const allTags = keywordResults.reduce(
      (acc: GoogleSearchKeywordTag[], result) => {
        result.tags?.forEach((tag: GoogleSearchKeywordTag) => {
          if (
            tag &&
            !acc.some((existingTag) => existingTag.name === tag.name)
          ) {
            acc.push({ id: tag.id, name: tag.name });
          }
        });
        return acc;
      },
      [],
    );
    return allTags;
  }, [keywordResults]);

  return { addTagAndToast, deleteTagAndToast, uniqueTags };
};
