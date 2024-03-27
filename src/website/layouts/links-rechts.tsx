import React from 'react'

import { cn } from '@/lib/utils'

export const LinksRechtsContainer = ({
    containerStyles,
    firstContainerStyles,
    secondContainerStyles,

    secondContainerSide,
    children
}: {
    containerStyles?: string,
    firstContainerStyles?: string,
    secondContainerStyles?: string,

    secondContainerSide: 'left' | 'right',
    children: React.ReactNode
}) => {

    const childrenArray = React.Children.toArray(children);

    return (
        <div className={cn(`
            flex flex-col lg:flex-row gap-5 justify-between `,
            containerStyles
        )}>
            <div className={cn(
                `flex-1`,
                firstContainerStyles,
            )
            }>
                {childrenArray[0]}
            </div>
            <div className={cn(
                `flex-1`,
                secondContainerSide === 'left' && 'lg:order-first',
                secondContainerStyles
            )}>
                {childrenArray[1]}
            </div>
        </div>
    )
}

