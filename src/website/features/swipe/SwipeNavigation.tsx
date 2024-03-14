'use client'

import React, { useEffect, useRef } from 'react';
import { useSwipe } from './SwipeContext';

interface SwipeNavigationProps {
  data: {
    heading: string;
    text: string;
  }[];
}

const SwipeNavigation: React.FC<SwipeNavigationProps> = ({ data }) => {
  const { activeIndex, setActiveIndex } = useSwipe();
  const itemRefs = useRef<(HTMLSpanElement | null)[]>(new Array(data.length).fill(null));

  useEffect(() => {
    itemRefs.current[activeIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeIndex]);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className={`flex gap-0 md:gap-6 py-2 px-2 bg-[#EFF4FB] my-8 md:w-fit md:px-2 rounded-xl overflow-auto`}>
      {data.map((item, index) => (
        <span
          key={index}
          ref={el => itemRefs.current[index] = el}
          className={`whitespace-nowrap rounded-[10px] cursor-pointer hover:bg-gray-50 ${activeIndex === index ? " bg-white " : "border border-secondary-100 "}`}
          onClick={() => handleClick(index)}
        >
          <p className={`whitespace-nowrap rounded-3xl cursor-pointer text-sm leading-5 font-semibold px-6 py-3 ${activeIndex === index ? "text-gradient-primary " : "text-secondary-500"}`}
          >
            {item.heading}
          </p>
        </span>
      ))}
    </div>
  );
};

export { SwipeNavigation };
