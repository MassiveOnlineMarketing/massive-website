'use client';

import { getKeywordsByProjectId } from '@/serp/data/keyword';
import { getLatestKeywordResultWithTags, getLatestSerpResults } from '@/serp/utils';
import { Result, SerpResult, Tag } from '@prisma/client';
import React, { useEffect, useMemo, useState } from 'react'

type DataProps = {
  createdAt: Date;
  id: string;
  keyword: string;
  result: SerpResult[];
  tags: Tag[];
}

type KeywordDetailsProps = {
  id: string;
  projectId: string;
  keyword: string;
  createdAt: Date;
  tags: Tag[];
}

interface KeywordObject {
  keyword: string;
  id: string;
  tags: { id: string; name: string; }[];
  url?: string;
  position?: number;
  createdAt: Date;
}

interface DomainCountProps {
  count: number;
  keywords: KeywordObject[];
}

type CountsProps = { [domain: string]: DomainCountProps };

const Page = () => {
  const [data, setData] = useState<DataProps[]>([]);
  const [keywordDetails, setKeywordDetails] = useState<KeywordDetailsProps[]>([]);
  const [domainCounts, setDomainCounts] = useState<CountsProps>({});

  useEffect(() => {
    async function fetchData() {
      const result1 = await getLatestKeywordResultWithTags('clsnsgql50005tdch125hvhbn')
      const keywordResults = await getLatestSerpResults('clsnsgql50005tdch125hvhbn')
      const keywordDetails = await getKeywordsByProjectId('clsnsgql50005tdch125hvhbn')

      setKeywordDetails(keywordDetails);

      if (Array.isArray(keywordDetails) && keywordResults) {
        const keywordsWithDetails = keywordDetails.map((keyword) => {
          const keywordResultsForThisKeyword = keywordResults[keyword.id];
          return {
            ...keyword,
            result: keywordResultsForThisKeyword, // changed from 'results'
          };
        });
        setData(keywordsWithDetails);
        // console.log('keywordsWithDetails', keywordsWithDetails);
      } else {
        console.log('keywordDetails is not an array or keywordResults is undefined:', keywordDetails, keywordResults);
      }

      //   console.log('result3', result3)
      console.log('keywordResults', keywordResults)
      console.log(keywordDetails)
    }
    fetchData()
  }, [])

  const countDomains = (results: SerpResult[], keyword: string, id: string, tags: Tag[], createdAt: Date) => {
    const domainCounts: { [domain: string]: { count: number, keywords: KeywordObject[] } } = {};

    results.forEach(({ url, position }) => {
      const domain = new URL(url).hostname.replace('www.', '');
      if (!domainCounts[domain]) {
        domainCounts[domain] = { count: 0, keywords: [] };
      }
      domainCounts[domain].count += 1;
      domainCounts[domain].keywords.push({ keyword, id, tags, url, position, createdAt });
    });

    // console.log('domainCounts', domainCounts)

    return domainCounts;
  };

  useEffect(() => {
    console.log('data', data)
    const counts = data.map(item => countDomains(item.result, item.keyword, item.id, item.tags, item.createdAt)).reduce((acc, counts) => {
      Object.entries(counts).forEach(([domain, { count, keywords }]) => {
        if (!acc[domain]) {
          acc[domain] = { count: 0, keywords: [] };
        }
        acc[domain].count += count;
        acc[domain].keywords = [...acc[domain].keywords, ...keywords];
      });
      return acc;
    }, {});
    setDomainCounts(counts);
    console.log('counts', counts)
  }, [data]); // Add data as a dependency



  return (
    <div>search page
      {domainCounts && <SomeComponent data={domainCounts} />}

      <ul>
        {/* {Object.entries(domainCounts).map(([domain, count]) => (
          <li key={domain}>{domain}: {count}</li>
        ))} */}
      </ul>
    </div>
  )
}

export default Page

interface SomeComponentProps {
  data: CountsProps;
}

const SomeComponent: React.FC<SomeComponentProps> = ({ data }) => {
  const [activeDomain, setActiveDomain] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('');

  console.log('data', data);

  // Flatten tags for filtering options
  const allTags = useMemo(() => Array.from(new Set(Object.values(data).flatMap(dc => dc.keywords.flatMap(kw => kw.tags.map(tag => tag.name))))), [data]);

  const handleDomainClick = (domain: string) => {
    setActiveDomain(activeDomain === domain ? null : domain); // Toggle active domain
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(e.target.value);
  };

  const filteredDomains = useMemo(() => Object.entries(data)
    .filter(([domain, domainData]) =>
      domainData.keywords.some(kw =>
        selectedTag === '' ? true : kw.tags.some(tag => tag.name === selectedTag)
      )
    )
    .sort((a, b) => b[1].count - a[1].count), [data, selectedTag]); // Sort by count in descending order

  // Filter unique keywords for the active domain
  const uniqueKeywords = useMemo(() => {
    if (!activeDomain || !data[activeDomain]) return [];
    const keywords = data[activeDomain].keywords;
    const unique = keywords.filter((keyword, index, self) =>
      index === self.findIndex(kw => kw.id === keyword.id)
    );
    return unique;
  }, [activeDomain, data]);

  return (
    <div>
      <div>
        <label>Filter by Tag: </label>
        <select value={selectedTag} onChange={handleTagChange}>
          <option value="">All Tags</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
      <ul>
        {filteredDomains.map(([domain, domainData]) => (
          <li key={domain} onClick={() => handleDomainClick(domain)}>
            {domain} ({domainData.count})
            {activeDomain === domain && (
              <ul>
                {uniqueKeywords.map(keyword => (
                  <li key={keyword.id}>{keyword.keyword}, {keyword.position}, {keyword.url}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};