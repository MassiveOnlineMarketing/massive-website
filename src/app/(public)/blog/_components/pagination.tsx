import React from 'react'

interface PaginationProps {
    pagination: {
        numberOfPages: number
        hasPrevPage: boolean
        hasNextPage: boolean
        prevPage: number
        nextPage: number
    }
    currentPageNumber: number

}

const Pagination: React.FC<PaginationProps> = ({ pagination, currentPageNumber }) => {
    return (
        <div className='mx-auto w-fit'>
            {/* Show only when there is a prev page */}
            {pagination.hasPrevPage && (
                <a rel='prev' href={`?page=${pagination.prevPage}`}>Vorige</a>
            )}

            {/* Show only when there are more than 1 pages */}
            {pagination.numberOfPages > 1 && (
                Array.from({ length: pagination.numberOfPages }, (_, i) => i + 1).map(pageNumber => (
                    <a key={pageNumber} href={`?page=${pageNumber}`} className={currentPageNumber === pageNumber ? 'text-primary-500' : ''}>{pageNumber}</a>
                ))
            )}

            {/* Show only when there is a next page */}
            {pagination.hasNextPage && (
                <a rel='next' href={`?page=${pagination.nextPage}`}>Volgende</a>
            )}
        </div>
    )
}

export default Pagination