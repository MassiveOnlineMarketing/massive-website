"use server";

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

    // Get the final URL after redirection
    const finalUrl = response.url;

    return { exists: true, finalUrl };
  } catch (error) {
    console.error("Error fetching URL:", url);
    return { exists: false, finalUrl: null };
  }
}

export default valudateWebsiteUrl;
