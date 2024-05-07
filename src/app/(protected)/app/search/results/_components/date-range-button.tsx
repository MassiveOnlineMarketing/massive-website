import { OutlinedButton } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { getQuarter, getYear } from "date-fns";
import { useMemo, useState } from "react";
import {
  getDateDaysAgo,
  getEndOfLastMonth,
  getEndOfQuarter,
  getEndOfYearAgo,
  getStartOfLastMonth,
  getStartOfMonth,
  getStartOfMonthsAgo,
  getStartOfQuarter,
  getStartOfWeek,
  getStartOfYear,
  getStartOfYearAgo,
} from "./data-utils";

interface DateRangeButtonProps {
  isLoading: boolean;
  selectedRange: DateRangeObject;
  setSelectedRange: React.Dispatch<React.SetStateAction<DateRangeObject>>;
  className?: string;
}

const getQuarterLabelAndDates = (quarter: number) => {
  const year =
    getQuarter(new Date()) <= quarter
      ? getYear(new Date()) - 1
      : getYear(new Date());
  return {
    label: `Quarter ${quarter} (${year})`,
    start: () => getStartOfQuarter(year, quarter),
    end: () => getEndOfQuarter(year, quarter),
  };
};

export type DateRangeObject = {
  label: string;
  start: () => Date;
  end: () => Date;
};

const DateRangeButton = ({
  isLoading,
  selectedRange,
  setSelectedRange,
  className,
}: DateRangeButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const DATE_OPTIONS: DateRangeObject[] = useMemo(
    () => [
      { label: "today", start: () => new Date(), end: () => new Date() },
      {
        label: "last 7 days",
        start: () => getDateDaysAgo(7),
        end: () => new Date(),
      },
      {
        label: "last 30 days",
        start: () => getDateDaysAgo(30),
        end: () => new Date(),
      },
      {
        label: "last 90 days",
        start: () => getDateDaysAgo(90),
        end: () => new Date(),
      },
      {
        label: "last 365 days",
        start: () => getDateDaysAgo(365),
        end: () => new Date(),
      },
      {
        label: "last month",
        start: () => getStartOfLastMonth(),
        end: () => getEndOfLastMonth(),
      },
      {
        label: "last 12 months",
        start: () => getStartOfMonthsAgo(12),
        end: () => new Date(),
      },
      {
        label: "last year",
        start: () => getStartOfYearAgo(),
        end: () => getEndOfYearAgo(),
      },
      {
        label: "week to date",
        start: () => getStartOfWeek(),
        end: () => new Date(),
      },
      {
        label: "month to date",
        start: () => getStartOfMonth(),
        end: () => new Date(),
      },
      // { label: 'quarter to date', start: () => getStartOfQuarter() },
      {
        label: "year to date",
        start: () => getStartOfYear(),
        end: () => new Date(),
      },
      getQuarterLabelAndDates(1),
      getQuarterLabelAndDates(2),
      getQuarterLabelAndDates(3),
      getQuarterLabelAndDates(4),
    ],
    [],
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <OutlinedButton
          disabled={isLoading}
          size="smD"
          className={cn(className)}
        >
          <span className="text-gray-400">Date Range:</span>
          <span className="text-gray-800">{selectedRange.label}</span>
          <ChevronDownIcon className="ml-auto h-4 w-4 text-gray-400" />
        </OutlinedButton>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col w-50 h-60 bg-white overflow-y-scroll px-0">
        {DATE_OPTIONS.map((option) => (
          <button
            key={option.label}
            className="text-left mb-1 hover:bg-gray-100 w-full text-sm px-4"
            onClick={() => {
              const optionWithResults = {
                ...option,
                start_date: option.start(),
                end_date: option.end(),
              };
              setSelectedRange(optionWithResults);
              setIsOpen(false); // close the popover
            }}
          >
            {option.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default DateRangeButton;
