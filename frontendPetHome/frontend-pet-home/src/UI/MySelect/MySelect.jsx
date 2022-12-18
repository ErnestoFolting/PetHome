import React from 'react'
import s from './MySelect.module.css'

export const MySelect = ({ options, filterValue, setFilter, labelText }) => {

    return (
        <div className={s.selectWithLabel}>
            <label className={s.label} htmlFor="mySelect">{labelText}</label>
            <select
                value={filterValue}
                onChange={(e) => setFilter(e.target.value)}
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
