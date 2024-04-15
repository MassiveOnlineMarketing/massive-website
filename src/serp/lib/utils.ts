/**
 * Processes an array in batches and returns the results as a nested array.
 * 
 * @param array - The array to process in batches.
 * @param processBatch - The function that processes each batch of the array.
 * @param batchSize - The size of each batch. Defaults to 100.
 * @returns A promise that resolves to a nested array of results.
 */
export async function processArrayInBatches<T, R>(
  array: T[],
  processBatch: (batch: T[]) => Promise<R[]>,
  batchSize: number = 100
): Promise<R[][]> {
  
  const results: R[][] = [];

  for (let i = 0; i < array.length; i += batchSize) {
    const batch = array.slice(i, i + batchSize);
    const batchResult = await processBatch(batch);
    console.log(`Batch from ${i} to ${i + batchSize} processed`);

    results.push(batchResult);
  }

  return results;
}


/**
 * ? Splits a string of keywords by newline, trims each keyword, and removes any empty strings.
 * 
 * @param keywords - The string of keywords to split and trim.
 * @returns An array of trimmed keywords.
 */
export function splitAndTrimKeywords(keywords: string): string[] {
  return keywords.split('\n')
    .map(s => s.trim())
    .filter(Boolean);
}