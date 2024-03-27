import React from "react";
import { cn } from "@/lib/utils";

export const LinksRechtsImageUitloopContainer = ({
    containerStyles,
    firstContainerStyles,
    secondContainerStyles,

    imageSide,
    children
}: {
    containerStyles?: string,
    firstContainerStyles?: string,
    secondContainerStyles?: string,

    imageSide: 'left' | 'right',
    children: React.ReactNode
}) => {

    const childrenArray = React.Children.toArray(children);

    return (
        <div className={cn(
            `xl:grid grid-cols-2`,
            containerStyles
        )}>
            {/* Content container */}
            <div className={cn(
                // section gutter
                `px-[12px] md:px-[60px] lg:px-16 xl:pr-0`,
                // position
                'xl:max-w-[714px]',
                imageSide === 'left' ? 'xl:mr-auto xl:pr-16' : 'xl:ml-auto xl:pl-16',
                'h-full flex',
                firstContainerStyles
            )}>
                {childrenArray[0]}
            </div>

            {/* Image container */}
            <div className={cn(
                // section gutter
                'px-[12px] md:px-[60px] lg:px-16 xl:px-0',
                imageSide === 'left' ? 'lg:order-first' : '',
                `w-full`,
                
                secondContainerStyles
            )}>
                {childrenArray[1]}
            </div>
        </div>
    )
}