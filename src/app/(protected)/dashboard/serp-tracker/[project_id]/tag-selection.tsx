import React from 'react';
import { useKeywordResults } from '@/serp/keywords-context'; // Adjust the import path
import { useTags } from '@/serp/hooks/useTags';

const TagSelection = () => {
  const { selectedTags } = useKeywordResults();
  const { uniqueTags, updateSelectedTags } = useTags();

  const toggleTag = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    updateSelectedTags(newSelectedTags);
  };

  const clearTags = () => updateSelectedTags([]);

  return (
    <div>
      {uniqueTags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => toggleTag(tag.name)}
          className={`mr-2 mb-2 py-2 px-4 rounded ${selectedTags.includes(tag.name) ? "bg-indigo-500" : "bg-indigo-200"} hover:bg-indigo-500 text-white font-bold`}
        >
          {tag.name}
        </button>
      ))}
      <button onClick={clearTags} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
        Clear Filter
      </button>
    </div>
  );
};

export default TagSelection;