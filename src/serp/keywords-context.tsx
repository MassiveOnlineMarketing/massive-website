'use client';

import React, { createContext, useContext, useState, ReactNode, FC, useMemo } from 'react';
import { getKeywordResultById } from './data/result';
import { deleteKeywordsById } from './data/keyword';
import { useToast } from '@/website/features/toast/use-toast';
import { Result, Tag } from '@prisma/client';


interface KeywordsContextType {
  results: KeywordResultWithTagProp[];
  setResults: (keywords: KeywordResultWithTagProp[]) => void;
  filteredResults: KeywordResultWithTagProp[];
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  setKeywordsToDelete: React.Dispatch<React.SetStateAction<string[]>>;
  keywordsToDelete: string[] | null;
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void; 
}

export const KeywordsContext = createContext<KeywordsContextType | undefined>(undefined);

interface KeywordsProviderProps {
  children: ReactNode;
}

export type KeywordResultWithTagProp = Result & { tags?: Tag[] };

export const KeywordsProvider: FC<KeywordsProviderProps> = ({ children }) => {
  const [results, setResults] = useState<KeywordResultWithTagProp[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // dialog is on /[project_id]/page.tsx
  const [keywordsToDelete, setKeywordsToDelete] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);


console.log('keywords', results)

  // * FILTER KEYWORDS
  const filteredResults = useMemo(() => {
    if (selectedTags.length === 0) return results;
    return results.filter(result =>
      result.tags?.some(tag => selectedTags.includes(tag.name))
    );
  }, [results, selectedTags]);




  const value = {
    results,
    setResults,
    filteredResults,
    selectedTags,
    setSelectedTags,
    setKeywordsToDelete,
    keywordsToDelete,
    isDialogOpen,
    setIsDialogOpen,
  };

  return (
    <KeywordsContext.Provider value={value}>
      {children}
    </KeywordsContext.Provider>
  );
};

export const useKeywordResults = (): KeywordsContextType => {
  const context = useContext(KeywordsContext);
  if (context === undefined) {
    throw new Error('useKeywords must be used within a KeywordsProvider');
  }

  return context;
};

