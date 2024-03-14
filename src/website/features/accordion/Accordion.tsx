'use client'


import { useEffect, useRef } from "react";
import { useAccordion } from "./AccordionContext";

import { cn } from "@/lib/utils";

import { HeadingProps, headingVariants } from "@/components/ui/typography/typography";
import { ChevronDownIcon } from "@heroicons/react/20/solid";


interface AccordionHeaderProps extends HeadingProps {
    children: React.ReactNode;
    className?: string;
    activeClassName?: string;
}

interface AccordionContentProps {
    children: React.ReactNode;
}



// Header
const AccordionHeader: React.FC<AccordionHeaderProps> = ({ children, className, activeClassName, size = "2xl", colorScheme = "default" }) => {
    const { toggleExpand, expand, padding } = useAccordion()
    // const tailwindPadding = padding / 4;
    const headingClasses = headingVariants({ size, colorScheme });

    return (
        <button
            className={cn(
                'w-full inline-flex justify-between items-center',
                'transition-colors duration-300 ease-linear',
                headingClasses,
                // `p-${tailwindPadding}`,
                className,
                `${expand ? `${activeClassName}` : ''}`,
            )}
            onClick={toggleExpand}
        >
            {children} <AccordionIcon />
        </button>
    );
};



// AccordionContent
const AccordionContent: React.FC<AccordionContentProps> = ({ children }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const { expand, padding } = useAccordion();
    // const tailwindPadding = padding / 4;

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.maxHeight = expand ? `${contentRef.current.scrollHeight + padding}px` : '0';
        }
    }, [expand, padding]);

    return (
        <div ref={contentRef} className={cn('max-h-0 overflow-hidden transition-all duration-300 ease-out text-black px-4',
            // `px-${tailwindPadding}  `,
            `${expand ? `pb-4` : ''}`)}
        >   
            <div className={`absolute -z-20 top-0 -left-5 h-full w-8 rounded-[14px] blur-md bg-gradient-to-t from-[#FFCFA3]/25 from-5.48% via-[#C176FC]/25 via-24.47% via-[#9076FC]/25 via-54.38% to-[#9076FC]/10 to-90.5% transition-opacity duration-500 ease-out op ${expand ? ' opacity-100' : 'opacity-0'}`}>

            </div>
            {/* {expand ? <div className="  opacity-100"></div> : <div className="absolute -z-20 top-0 -left-5 h-full w-8 rounded-[14px] blur-md bg-gradient-to-t from-[#FFCFA3]/25 from-5.48% via-[#C176FC]/25 via-24.47% via-[#9076FC]/25 via-54.38% to-[#9076FC]/10 to-90.5% opacity-0"></div>} */}
            {children}
        </div>
    );
};


// Icon 
const AccordionIcon = () => {
    const { expand } = useAccordion() ?? { expand: false };

    return (
        <span>
            <ChevronDownIcon
                className={`fw-8 ml-auto h-8 transform transition-all duration-300 ${expand ? '-rotate-90' : ''}`}
            />
        </span>
    )
}

export { AccordionHeader, AccordionContent };