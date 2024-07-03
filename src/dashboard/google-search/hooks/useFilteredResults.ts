'use client';

import { useMemo } from "react";
import { useKeywordResultsStore } from "@/lib/zustand/keyword-results-store";

export const useFilteredKeywordResults = () => {
  const keywordResults = useKeywordResultsStore(
    (state) => state.keywordResults,
  );
  const selectedTags = useKeywordResultsStore((state) => state.selectedTags);

  const filteredResults = useMemo(() => {
    if (selectedTags.length === 0) return keywordResults;
    return keywordResults.filter((result) =>
      result.tags?.some((tag) => selectedTags.includes(tag.name)),
    );
  }, [keywordResults, selectedTags]);

  return filteredResults;
};
