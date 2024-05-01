'use client'

import React, { useState } from 'react'

import { useTags } from '@/dashboard/google-search/hooks/useTags';
import { createNewTag, getTagsByName } from '@/dashboard/google-search/data/google-search-keyword-tag';

export const AddNewTagInput = ({ selectedRows, onActionFinished }: { selectedRows: any, onActionFinished: () => void  }) => {
  const keywordIds = selectedRows.rows.map((row: any) => row.original.keywordId);

  const [inputValue, setInputValue] = useState('');
  const { addTagAndToast } = useTags();

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      console.log('Adding tag:', inputValue);
      const response = await getTagsByName(inputValue);

      if (response === null) {
        const createTagResponse = await createNewTag(inputValue);
        console.log('Tag created:', createTagResponse);

        addTagAndToast(createTagResponse, keywordIds);
        onActionFinished();
      } else {
        console.log('Tag already exists:', response);

        addTagAndToast(response, keywordIds);
        onActionFinished();
      }
    } catch (error) {
      console.error('Failed to add tag to keywords:', error);
    }
    setInputValue('');
  };


  return (
    <div className='overflow-hidden rounded-lg gap-[6px] border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50'>
      <form onSubmit={handleSubmit} className=''>
        <input
          className='px-[16px] py-[8px] text-sm font-medium leading-5 placeholder-gray-500'
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add new tag"
        />
        <button className='px-[16px] py-[8px] text-sm font-medium  leading-5 text-gray-800 w-full' type="submit">Submit</button>
      </form>
    </div>
  )
}
