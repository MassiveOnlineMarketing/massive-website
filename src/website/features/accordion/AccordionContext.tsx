'use client'

import { cn } from '@/lib/utils';
import React from 'react';

export interface AccordionProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  padding?: number;
  className?: string;
}

interface AccordionContextProps {
  expand?: boolean;
  toggleExpand: () => void;
  padding: number;
}

// Accordion Context
const AccordionContext = React.createContext<AccordionContextProps>({
  expand: false,
  toggleExpand: () => { },
  padding: 2,
});


export const Accordion: React.FC<AccordionProps> = ({ children, isOpen = false, onToggle = () => {}, padding = 2, className }) => {
  const value = { expand: isOpen, toggleExpand: onToggle, padding };

  return (
      <AccordionContext.Provider value={value}  >
          <div className={cn(
            " ",
            className
            )}>
              {children}
          </div>
      </AccordionContext.Provider>
  );
};

export const useAccordion = () => {
  const context = React.useContext(AccordionContext);

  if (!context) {
    throw new Error('useAccordion must be used within a AccordionProvider');
  }

  return context;
}