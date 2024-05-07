"use client";

import React from "react";
import { useSwipe } from "./SwipeContext";
import { cn } from "@/lib/utils";

type props = {
  className?: string;
};

const SwipeDots: React.FC<props> = ({ className }) => {
  const { activeIndex, itemsCount } = useSwipe();

  return (
    <div className={cn("flex justify-center mt-4 items-center", className)}>
      {Array.from({ length: itemsCount }).map((_, index) => (
        <span
          key={index}
          className={`h-3 w-3 mx-[3px] rounded-full ${activeIndex === index ? "bg-gray-400" : "bg-gray-200"}`}
        ></span>
      ))}
    </div>
  );
};

export { SwipeDots };
