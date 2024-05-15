import { urlWithoutDomain } from "@/dashboard/utils";
import { cn } from "@/lib/utils";

import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";
import { format } from "date-fns";

interface ColumnRowCellProps {
  value: string | number | null;
  highlight?: boolean
}

const StandardRowCell: React.FC<ColumnRowCellProps> = ({ value, highlight }) => {
  return (
    <p className={cn(
      "text-sm leading-5 font-medium",
      highlight ? 'text-gray-800' : 'text-gray-500'
    )}>
      {value}
    </p>
  );
}


interface TrendingIndicatorProps {
  value: number | null;
}

const TrendingIndicatorRowCell: React.FC<TrendingIndicatorProps> = ({ value }) => {
  let colorClass = "";
  let icon = null;

  if (value) {
    if (value > 0) {
      colorClass = "";
      icon = <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />;
    } else if (value < 0) {
      colorClass = "";
      icon = <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />;
    }
  }

  return (
    <div className="flex gap-[2px] items-center">
      <span className={cn(
        'text-sm leading-5 font-medium text-gray-500',
        colorClass
      )}>{value}</span>
      {icon}
    </div>
  );
}


interface DateRowCellProps {
  value: Date;
  // highlight?: boolean
}

const DateRowCell: React.FC<DateRowCellProps> = ({ value }) => {
  if (value.toString() === "Invalid date")
    return (
      <p className=" text-sm leading-5 font-medium text-gray-500">
        Not yet Checked
      </p>
    );

  return (
    <p className=" text-sm leading-5 font-medium text-gray-500">
      {format(value, "MM/dd/yyyy")}
    </p>
  );
}


interface UrlRowCellProps {
  value: string | null;
  domainUrl?: string;
}

const UrlRowCell: React.FC<UrlRowCellProps> = ({ value, domainUrl }) => {
  const url = value;

  if (url === null || url === undefined || url === "") {
    return (
      <p className="max-auto text-sm leading-5 font-medium text-gray-500">
        No Result Found
      </p>
    );
  }

  return (
    <p className="mx-auto text-sm leading-5 font-medium text-gray-500">
      {
        domainUrl ? (
          url.length > 52
            ? urlWithoutDomain(url, domainUrl).substring(0, 52) + "..."
            : urlWithoutDomain(url, domainUrl)
        ) : (
          url.length > 52
            ? url.substring(0, 52) + "..."
            : url
        )
      }
    </p>
  );
}


export { StandardRowCell, TrendingIndicatorRowCell, DateRowCell, UrlRowCell }

