import React from "react";
import { Calendar } from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/red.css"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import './MyCalendar.css'

export function MyCalendar({ dates, isMultiple, monthsShown, props }) {
    return (
        <div className="myCalendar">
            <Calendar
                {...props}
                disableMonthPicker
                disableYearPicker
                numberOfMonths={monthsShown}
                readOnly
                className="red"
                multiple={isMultiple}
                value={dates}
                minDate={new Date()}
                maxDate={new Date().setMonth(new Date().getMonth() + 2)}
            />
        </div>
    )
}
