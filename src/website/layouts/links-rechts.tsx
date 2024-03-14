import React from 'react'

import { cn } from '@/lib/utils'

export const LinksRechtsContainer = ({
    containerStyles,
    secondContainerSide,
    children
}: {
    containerStyles?: string,
    secondContainerSide: 'left' | 'right',
    children: React.ReactNode
}) => {

    const childrenArray = React.Children.toArray(children);

    return (
        <div className={cn(`
            flex flex-col lg:flex-row gap-5 justify-between `,
            containerStyles
        )}>
            <div className={`flex-1`}>
                {childrenArray[0]}
            </div>
            <div className={`flex-1 ${secondContainerSide === 'left' ? 'lg:order-first' : ''} `}>
                {childrenArray[1]}
            </div>
        </div>
    )
}

