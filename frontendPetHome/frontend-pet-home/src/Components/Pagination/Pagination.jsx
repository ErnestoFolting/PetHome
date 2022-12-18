import React from 'react'
import s from './Pagination.module.css'
import { MyButton } from '../../UI/buttons/MyButton'

export const Pagination = ({ pagesArray, params, setParams, ...props }) => {
    return (
        <div className={s.pagination} {...props}>
            {pagesArray.map(pageNumber =>
                <div
                    key={pageNumber}
                    className={pageNumber === params?.currentPage ? s.currentpaginationEl : s.paginationEl}
                    onClick={() => setParams({ ...params, currentPage: pageNumber })}
                >
                    <MyButton>{pageNumber}</MyButton>
                </div>
            )}
        </div>
    )
}
