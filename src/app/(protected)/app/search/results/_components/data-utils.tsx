/**
 * ? Returns a date that is a specified number of days ago.
 * @param daysAgo - The number of days ago.
 * @returns The date that is `daysAgo` days ago.
 */
export const getDateDaysAgo = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
};

/**
 * ? Returns the start date of the last month.
 * @returns {Date} The start date of the last month.
 */
export const getStartOfLastMonth = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  date.setDate(1);
  return date;
};

/**
 * ? Returns the start date of a specified number of months ago.
 * @param monthsAgo - The number of months ago.
 * @returns The start date of the specified number of months ago.
 */
export const getStartOfMonthsAgo = (monthsAgo: number) => {
  const date = new Date();
  date.setMonth(date.getMonth() - monthsAgo);
  date.setDate(1);
  return date;
};

/**
 * ? Returns the start date of the year ago.
 * @returns {Date} The start date of the year ago.
 */
export const getStartOfYearAgo = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  date.setMonth(0);
  date.setDate(1);
  return date;
};

/**
 * Returns the start of the current week.
 * @returns {Date} The start of the week as a Date object.
 */
export const getStartOfWeek = () => {
  const date = new Date();
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(date.setDate(diff));
};

/**
 * Returns the start of the current month.
 * @returns {Date} The start of the month as a Date object.
 */
export const getStartOfMonth = () => {
  const date = new Date();
  date.setDate(1);
  return date;
};

/**
 * Returns the start of the current year.
 * @returns {Date} The start of the year as a Date object.
 */
export const getStartOfYear = () => {
  const date = new Date();
  date.setMonth(0);
  date.setDate(1);
  return date;
};

/**
 * Returns the end date of the previous month.
 * @returns {Date} The end date of the previous month.
 */
export const getEndOfLastMonth = () => {
  const date = new Date();
  date.setDate(0); // last day of previous month
  return date;
};

/**
 * Returns the start date of a given quarter.
 * @param year - The year.
 * @param quarter - The quarter number (1, 2, 3, 4).
 * @returns The start date of the quarter.
 */
export const getStartOfQuarter = (year: number, quarter: number) => {
  const date = new Date(year, (quarter - 1) * 3, 1); // quarters start at 0, 3, 6, 9
  return date;
};

/**
 * Returns the end date of a given quarter.
 * @param year - The year.
 * @param quarter - The quarter number (1, 2, 3, or 4).
 * @returns The end date of the quarter.
 */
export const getEndOfQuarter = (year: number, quarter: number) => {
  const date = new Date(year, quarter * 3, 0); // end of the quarter is the last day of the last month of the quarter
  return date;
};

/**
 * Returns the last day of the month for a given date.
 * @param date - The date for which to get the last day of the month.
 * @returns The last day of the month as a number.
 */
export const getLastDayOfMonth = (date: Date) => {
  const month = date.getMonth();
  date.setMonth(month + 1);
  date.setDate(0); // last day of previous month
  return date.getDate();
};

/**
 * Returns the date representing the end of the previous year.
 * @returns {Date} The date representing the end of the previous year.
 */
export const getEndOfYearAgo = () => {
  const date = new Date();
  date.setMonth(0);
  date.setDate(0); // last day of the previous month
  return date;
};
