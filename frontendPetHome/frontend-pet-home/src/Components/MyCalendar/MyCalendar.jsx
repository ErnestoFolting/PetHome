import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/red.css"
import './MyCalendar.css'

export function MyCalendar({dates,props}) {
    return (
        <div className="myCalendar">
            <Calendar
            {...props} 
            numberOfMonths={3}
            readOnly 
            className="red" 
            multiple 
            value = {dates}
            minDate ={new Date()}
            maxDate ={new Date().setMonth(new Date().getMonth()+2)}
            />
        </div>
    )
}
