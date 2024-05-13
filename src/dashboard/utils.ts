import { useWebsiteDetailsStore } from "@/lib/zustand/website-details-store";

/**
 * ? Splits a string of a text area, trims input/line, and removes any empty strings.
 *
 * @param keywords - The string of keywords to split and trim.
 * @returns An array of trimmed keywords.
 */
export function splitAndTrimTextAreaInput(keywords: string): string[] {
  return keywords
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}


/**
 * Replaces the domain URL in a given URL with a forward slash ("/").
 * 
 * @param url - The URL to modify.
 * @param domainUrl - The domain URL to replace.
 * @returns The modified URL with the domain URL replaced by a forward slash.
 */
export function urlWithoutDomain(url: string, domainUrl: string): string {
  return url.replace(domainUrl, "/");
}