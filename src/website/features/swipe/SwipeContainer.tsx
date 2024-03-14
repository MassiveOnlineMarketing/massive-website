'use client'

import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { useSwipe } from './SwipeContext';
import { cn } from '@/lib/utils';

interface SwipeContentProps {
  children: React.ReactNode;
  className?: string;
}

const SwipeContent: React.FC<SwipeContentProps> = ({ children, className }) => {
  const { activeIndex, itemsCount, setActiveIndex } = useSwipe();

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setActiveIndex(prev => (prev + 1) % itemsCount);
    },
    onSwipedRight: () => {
      setActiveIndex(prev => (prev - 1 + itemsCount) % itemsCount);
    }
  });

  return (
    <div {...handlers} className='w-full'>
      {React.Children.map(children, (child, index) => (
        <div key={index} className={cn(
          `${activeIndex === index ? 'block' : 'hidden'}`,
          className
        )}>

          {child}
        </div>
      ))}
    </div>
  );
};

export { SwipeContent };
