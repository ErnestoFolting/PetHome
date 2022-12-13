import React from 'react'
import { Calendar} from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/red.css"
import { MyButton } from '../../UI/buttons/MyButton';

export const TimeExceptionCalendar = ({ calendarValue, valueChange, buttonClick, mapDays, deleteStyle }) => {
    return (
        <Calendar
            rangeHover
            value={calendarValue}
            onChange={valueChange}
            multiple
            minDate={new Date()}
            maxDate={new Date().setMonth(new Date().getMonth() + 2)}
            numberOfMonths={1}
            className={deleteStyle ? "red" : "bg-dark"}
            mapDays={mapDays}
        >
            {
                deleteStyle
                    ? <MyButton style={{ backgroundColor: 'rgb(228, 74, 74)' }} onClick={buttonClick}>Видалити</MyButton>
                    : <MyButton style={{ backgroundColor: 'rgba(35, 145, 241, 1)' }} onClick={buttonClick}>Додати</MyButton>
            }

        </Calendar>
    )
}
