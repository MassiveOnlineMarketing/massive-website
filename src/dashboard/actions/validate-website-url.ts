"use server";
import normalizeUrl from 'normalize-url';


/**
 * Tests the validity of a given URL by making a fetch request and checking the response.
 * @param {Object} options - The options for the test.
 * @param {string} options.url - The URL to test.
 * @returns {Promise<Object>} A promise that resolves to an object containing the test results.
 * @property {boolean} exists - Indicates whether the URL exists or not.
 * @property {string | null} finalUrl - The final URL after any redirection.
 */
async function valudateWebsiteUrl({ url }: { url: string }) {
  try {
    const response = await fetch(url);

    console.log('response', response)

    // Get the final URL after redirection
    const finalUrl = response.url;

    return { exists: true, finalUrl };
  } catch (error) {
    console.error("Error fetching URL:", url);
    return { exists: false, finalUrl: null };
  }
}

export default valudateWebsiteUrl;


const validateAndNormalizeUrl = ({ url }: { url: string }) => {
  try {
    const normalizedUrl = normalizeUrl(url, { forceHttps: true, stripWWW: false });
    return normalizedUrl;
  } catch (error) {
    // Handle invalid URL
    console.error('Invalid URL:', error);
    return null;
  }
};
const checkActualUrl = async ({url, maxRedirects = 5}: {url: string, maxRedirects?: number}) => {
  try {
    let currentUrl = url;
    let redirectsFollowed = 0;

    while (redirectsFollowed < maxRedirects) {
      const response = await fetch(currentUrl, { method: 'HEAD', redirect: 'follow' });

      if (!response.ok) {
        throw new Error('URL is not reachable');
      }

      const finalUrl = response.url;

      if (finalUrl === currentUrl) {
        // No more redirects, return the final URL
        return finalUrl;
      } else {
        // Follow the redirect to the next URL
        currentUrl = finalUrl;
        redirectsFollowed++;
      }
    }

    throw new Error('Max redirects reached');
  } catch (error) {
    console.error('Error checking URL:', error);
    return null;
  }
};
export const validateAndFetchUrl = async ({ url }: { url: string }) => {
  const normalizedUrl = validateAndNormalizeUrl({url});
  if (normalizedUrl) {
    const actualUrl = await checkActualUrl({url: normalizedUrl});
    return actualUrl;
  }
  return null;
};
