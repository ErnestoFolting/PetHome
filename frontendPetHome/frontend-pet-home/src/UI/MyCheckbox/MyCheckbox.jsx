import { React, useState } from 'react'
import s from './MyCheckbox.module.css'

export const MyCheckbox = ({ filters, setFilters, labelText }) => {

    const [checkboxCheked, setCheckboxCheked] = useState(filters?.isDatesFit);

    function checkboxHandle() {
        setCheckboxCheked(!checkboxCheked)
        setFilters({ ...filters, isDatesFit: !checkboxCheked, currentPage: 1 })
    }

    return (
        <div>
            <input
                type="checkbox"
                className={s.customCheckbox}
                id="myCheckBox"
                name="myCheckBox"
                value="yes"
                checked={filters?.isDatesFit ? true : false}
                onChange={checkboxHandle} />
            <label htmlFor="myCheckBox">{labelText}</label>
        </div>
    )
}
