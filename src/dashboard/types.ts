export type PythonApiSite = {
    premissionLevel: string,
    siteUrl: string,
}

export type PythonApiKeywordDetailSearchConsoleData = {
    [date: string]: {
      clicks: number;
      ctr: number;
      impressions: number;
      position: number;
    };
  };