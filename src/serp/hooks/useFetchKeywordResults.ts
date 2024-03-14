import { KeywordResultWithTagProp, useKeywordResults } from "../keywords-context";
import { getLatestKeywordResultWithTags } from "../utils";

/**
 * ? Custom hook for fetching keyword results.
 * 
 * @returns A function that fetches keyword results for a given project ID.
 */
export const useFetchKeywordResults = () => {
    const { setResults } = useKeywordResults();

    /**
     * ? Fetches keyword results for a given project ID.
     * 
     * @param projectId The ID of the project.
     */
    const fetchKeywordResults = async (projectId: string) => {
        let attempts = 0;
        const maxAttempts = 6;

        const tryFetchingKeywords = async () => {
            console.log("Fetching keywords...");
            attempts++;
            try {
                const result = await getLatestKeywordResultWithTags(projectId);
                if (result && result.length > 0) {

                    const flattenedKeywords = result.flat();
                    const filteredKeywords = flattenedKeywords.filter(result => result !== undefined) as KeywordResultWithTagProp[];
                    
                    // check if the result is empty, happens after routing to project page when keywords are processed yet
                    if (filteredKeywords[0].id === undefined){
                        console.log('no result')
                    } else {
                        setResults(filteredKeywords);
                    }   

                } else if (attempts < maxAttempts) {
                    setTimeout(tryFetchingKeywords, 5000);
                } else {
                    throw new Error("Failed to fetch keywords after several attempts.");
                }
            } catch (error) {
                console.error("Failed to fetch keywords:", error);
            }
        };

        tryFetchingKeywords();
    };

    return fetchKeywordResults;
};


 // // * FETCH KEYWORD RESULTS
  // const fetchKeywordResults = async (projectId: string) => {
  //   let intervalId: NodeJS.Timeout;
  //   let attempts = 0;

  //   const fetchAndSetKeywords = async () => {
  //     console.log('Fetching keywords...');

  //     const keywords = await getLatestKeywordResultWithTags(projectId);

  //     // If keywords is undefined or all its elements are undefined, fetch again after a delay with max 6 attempts
  //     if ((!keywords || keywords.every(keyword => keyword === undefined)) && attempts < 6 ) {
  //       attempts++;
  //       setTimeout(fetchAndSetKeywords, 5000); // Fetch again after 5 seconds
  //       return;
  //     }

  //     if (!keywords || attempts === 6) {
  //       console.error('🔴 Failed to fetch keywords for project:', projectId, 'user:', user?.email );
  //       return;
  //     }

  //     // keywords is a array of arrays, this needs to be converted to a single array
  //     const flattenedKeywords = keywords.flat();
  //     const filteredKeywords = flattenedKeywords.filter(keyword => keyword !== undefined) as KeywordResultWithTagProp[];
  //     setResults(filteredKeywords);
  //   };

  //   // Fetch keywords immediately
  //   fetchAndSetKeywords();
  // };
