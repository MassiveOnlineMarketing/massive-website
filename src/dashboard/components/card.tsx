import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  title: string;
  value: number;
  titleCompair?: string;
  compairValue?: number;
};

export const Card = ({ title, value, titleCompair, compairValue }: Props) => {
  let percentageDifference = 0;
  if (compairValue) {
    percentageDifference = parseFloat(
      (((value - compairValue) / compairValue) * 100).toFixed(0),
    );
  } else {
    percentageDifference = 100;
  }

  return (
    <div className="w-full h-full rounded-2xl shadow-sm p-6 bg-white">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{title}</p>
      <p className={cn("mt-2 text-4xl font-semibold text-gray-700")}>{value}</p>
      {compairValue ||
        (compairValue === 0 && (
          <div className="mt-4 inline-flex items-center gap-2 text-xs">
            <p
              className={cn(
                percentageDifference > 0
                  ? "bg-green-100 text-green-500"
                  : percentageDifference < 0
                    ? "bg-red-100 text-red-500"
                    : "bg-white text-white",
                "px-2 py-1 w-fit rounded-[4px]",
              )}
            >
              {percentageDifference}%
            </p>
            <p>vs {titleCompair}</p>
          </div>
        ))}
    </div>
  );
};
