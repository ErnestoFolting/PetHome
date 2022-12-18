import React from 'react'
import s from './MySelect.module.css'

export const MySelect = ({ options, filters, setFilters, labelText }) => {

    return (
        <div className={s.selectWithLabel}>
            <label className={s.label} htmlFor="mySelect">{labelText}</label>
            <select
                value={filters?.advertsLimit}
                onChange={(e) => setFilters({ ...filters, advertsLimit: e.target.value, currentPage: 1 })}
                className={s.select}
                id="mySelect"
            >
                {options?.map(option =>
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                )}
            </select>
        </div>

    )
}
