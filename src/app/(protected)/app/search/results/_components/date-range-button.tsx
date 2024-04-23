import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { getQuarter, getYear } from 'date-fns';
import { useState } from "react";

const DateRangeButton = ({ setStartDate, setEndDate, className }: { setStartDate: (date: string) => void, setEndDate: (date: string) => void, className?: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const currentQuarter = getQuarter(new Date());
    const currentYear = getYear(new Date());

    const dateOptions = [
        { label: 'today', start: () => new Date() },
        { label: 'last 7 days', start: () => getDateDaysAgo(7), end: () => new Date() },
        { label: 'last 30 days', start: () => getDateDaysAgo(30), end: () => new Date() },
        { label: 'last 90 days', start: () => getDateDaysAgo(90), end: () => new Date() },
        { label: 'last 365 days', start: () => getDateDaysAgo(365), end: () => new Date() },
        { label: 'last month', start: () => getStartOfLastMonth(), end: () => getEndOfLastMonth() },
        { label: 'last 12 months', start: () => getStartOfMonthsAgo(12), end: () => new Date() },
        { label: 'last year', start: () => getStartOfYearAgo(), end: () => getEndOfYearAgo() },
        { label: 'week to date', start: () => getStartOfWeek() },
        { label: 'month to date', start: () => getStartOfMonth() },
        // { label: 'quarter to date', start: () => getStartOfQuarter() },
        { label: 'year to date', start: () => getStartOfYear() },
        { label: `Quarter 1 (${currentQuarter <= 1 ? currentYear - 1 : currentYear})`, start: () => getStartOfQuarter(currentQuarter <= 1 ? currentYear - 1 : currentYear, 1), end: () => getEndOfQuarter(currentQuarter <= 1 ? currentYear - 1 : currentYear, 1) },
        { label: `Quarter 2 (${currentQuarter <= 2 ? currentYear - 1 : currentYear})`, start: () => getStartOfQuarter(currentQuarter <= 2 ? currentYear - 1 : currentYear, 2), end: () => getEndOfQuarter(currentQuarter <= 2 ? currentYear - 1 : currentYear, 2) },
        { label: `Quarter 3 (${currentQuarter <= 3 ? currentYear - 1 : currentYear})`, start: () => getStartOfQuarter(currentQuarter <= 3 ? currentYear - 1 : currentYear, 3), end: () => getEndOfQuarter(currentQuarter <= 3 ? currentYear - 1 : currentYear, 3) },
        { label: `Quarter 4 (${currentQuarter <= 4 ? currentYear - 1 : currentYear})`, start: () => getStartOfQuarter(currentQuarter <= 4 ? currentYear - 1 : currentYear, 4), end: () => getEndOfQuarter(currentQuarter <= 4 ? currentYear - 1 : currentYear, 4) },
    ];


    return (
        <>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <button className={cn(
                        'bg-primary-50 p-2 rounded-lg',
                        className
                    )}>Date Range</button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col w-50 h-60 bg-white overflow-y-scroll px-0">
                    {dateOptions.map(option => (
                        <button
                            key={option.label}
                            className="text-left mb-1 hover:bg-gray-100 w-full text-sm px-4"
                            onClick={() => {
                                setStartDate(option.start().toString());
                                setEndDate(option.end ? option.end().toString() : new Date().toString());
                                setIsOpen(false); // close the popover
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </PopoverContent>
            </Popover>
        </>
    );
}

export default DateRangeButton;

/**
 * ? Returns a date that is a specified number of days ago.
 * @param daysAgo - The number of days ago.
 * @returns The date that is `daysAgo` days ago.
 */
const getDateDaysAgo = (daysAgo: number) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date;
};

/**
 * ? Returns the start date of the last month.
 * @returns {Date} The start date of the last month.
 */
const getStartOfLastMonth = () => {
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
const getStartOfMonthsAgo = (monthsAgo: number) => {
    const date = new Date();
    date.setMonth(date.getMonth() - monthsAgo);
    date.setDate(1);
    return date;
};

/**
 * ? Returns the start date of the year ago.
 * @returns {Date} The start date of the year ago.
 */
const getStartOfYearAgo = () => {
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
const getStartOfWeek = () => {
    const date = new Date();
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(date.setDate(diff));
};

/**
 * Returns the start of the current month.
 * @returns {Date} The start of the month as a Date object.
 */
const getStartOfMonth = () => {
    const date = new Date();
    date.setDate(1);
    return date;
};

/**
 * Returns the start of the current year.
 * @returns {Date} The start of the year as a Date object.
 */
const getStartOfYear = () => {
    const date = new Date();
    date.setMonth(0);
    date.setDate(1);
    return date;
};

/**
 * Returns the end date of the previous month.
 * @returns {Date} The end date of the previous month.
 */
const getEndOfLastMonth = () => {
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
const getStartOfQuarter = (year: number, quarter: number) => {
    const date = new Date(year, (quarter - 1) * 3, 1); // quarters start at 0, 3, 6, 9
    return date;
};

/**
 * Returns the end date of a given quarter.
 * @param year - The year.
 * @param quarter - The quarter number (1, 2, 3, or 4).
 * @returns The end date of the quarter.
 */
const getEndOfQuarter = (year: number, quarter: number) => {
    const date = new Date(year, quarter * 3, 0); // end of the quarter is the last day of the last month of the quarter
    return date;
};

/**
 * Returns the last day of the month for a given date.
 * @param date - The date for which to get the last day of the month.
 * @returns The last day of the month as a number.
 */
const getLastDayOfMonth = (date: Date) => {
    const month = date.getMonth();
    date.setMonth(month + 1);
    date.setDate(0); // last day of previous month
    return date.getDate();
};

/**
 * Returns the date representing the end of the previous year.
 * @returns {Date} The date representing the end of the previous year.
 */
const getEndOfYearAgo = () => {
    const date = new Date();
    date.setMonth(0);
    date.setDate(0); // last day of the previous month
    return date;
};
