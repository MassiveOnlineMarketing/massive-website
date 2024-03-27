import { cn } from '@/lib/utils'
import React from 'react'

/**
 * Renders a container with a grid layout that spans halve the width of the page.
 * The number of columns in the grid can be customized.
 *
 * @param children - The content to be rendered inside the grid container.
 * @param containerStyles - Additional CSS classes to be applied to the grid container.
 * @param columns - The number of columns in the grid. If not provided, the number of columns will be determined based on the number of children.
 * @returns The rendered grid container.
 */
export const GridHalvePageContainer = ({
    children,
    containerStyles,
    columns
}: {
    children: React.ReactNode,
    containerStyles?: string,
    columns?: number
}) => {
    const numberOfChildren = React.Children.count(children);

    return (
        <ul className={cn(
            'grid',
            (!columns && numberOfChildren === 2) && 'md:grid-cols-2',
            (!columns && numberOfChildren === 3) && 'lg:grid-cols-3 gap-6 lg:gap-3',
            (!columns && numberOfChildren === 4) && 'grid-cols-4',
            (!columns && numberOfChildren === 5) && 'grid-cols-5',
            (!columns && numberOfChildren === 6) && 'grid-cols-6',
            columns && `grid-cols-${columns}`,
            'w-full',
            containerStyles
        )}>
            {children}
        </ul>
    )
}
