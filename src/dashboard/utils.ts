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
