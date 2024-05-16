import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

import { GoogleResultFilterWithUrls } from '@/dashboard/types';


interface UseFetchDataProps {
  endpoint: string;
  site_url: string | undefined | null;
  refresh_token: string | null;
  selectedRange: { start: () => Date, end: () => Date };
  selectedFilter: GoogleResultFilterWithUrls[];
}

/**
 * Custom hook to fetch search result API data.
 *
 * @param {UseFetchDataProps} options - The options for fetching data.
 * @returns {Object} - The fetched data, loading state, and error state.
 */
const useFetchSearchResultApiData = ({ endpoint, site_url, refresh_token, selectedRange, selectedFilter }: UseFetchDataProps) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      if (!site_url || !refresh_token) {
        setIsLoading(false);
        setError("Missing site_url or refresh_token");
        return;
      }

      const start_date = format(selectedRange.start(), "yyyy-MM-dd");
      const end_date = format(selectedRange.end(), "yyyy-MM-dd");

      let urls = '';
      if (selectedFilter.length > 0) {
        const filterUrls = selectedFilter.map((filter) => filter.urls.map((url) => url.url)).flat().join(",");
        // console.log("filterUrls", filterUrls)
        if (filterUrls) {
          urls = `&urls=${filterUrls}`;
        }
      }

      const requestUrl = `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/api/${endpoint}?site_url=${site_url}&refresh_token=${refresh_token}&start_date=${start_date}&end_date=${end_date}${urls}`;

      try {
        // console.log('fetching Data', endpoint)
        const res = await axios(requestUrl);
        setData(res.data);
      } catch (error) {
        setError(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [endpoint, site_url, refresh_token, selectedRange, selectedFilter]);

  return { data, isLoading, error };
};

export default useFetchSearchResultApiData; 