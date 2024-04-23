import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const PercentageIndicator = ({ value, previousValue }: { value: number, previousValue: number }) => {

    const diff = value - previousValue;
    const percentage = (diff / previousValue) * 100;

    return (
        <div className="flex items-center">
            <div className={cn(
                "flex items-center px-2 py-1 w-fit rounded-md",
                percentage > 0 ? 'bg-green-50' : 'bg-red-50'
            )}>
                {percentage > 0 ? <ChevronUpIcon className="h-4 w-4 text-green-600" /> : <ChevronDownIcon className="h-4 w-4 text-red-600" />}
                <span className={cn(
                    "ml-1 text-sm leading-5 font-normal ",
                    percentage > 0 ? 'text-green-600' : 'text-red-600'
                )}>{Math.abs(percentage).toFixed(2)}%</span>
            </div>
            {/* <span className="ml-2 text-sm font-normal text-gray-500">{diff.toFixed(2)} from last month</span> */}

        </div>
    );
}

export default PercentageIndicator;