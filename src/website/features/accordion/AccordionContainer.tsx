"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useMediaQuery } from "react-responsive";

interface AccordionProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  padding?: number;
}

export const AccordionContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const [openAccordion, setOpenAccordion] = React.useState<number | null>(null);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const clonedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement<AccordionProps>(child)) {
      return React.cloneElement(child, {
        isOpen: index === openAccordion,
        onToggle: () =>
          setOpenAccordion(index !== openAccordion ? index : null),
        padding: isMobile ? 16 : 32,
      });
    }
    return child;
  });

  return (
    <div className={cn("mx-auto flex flex-col gap-2", className)}>
      {clonedChildren}
    </div>
  );
};
