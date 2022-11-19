import React from 'react'
import { MyInput } from './MyInput'
import './InputWithLabel.css'

export const InputWithLabel = ({ label, type, ...props }) => {
    return (
        <div>
            <label>{label}</label>
            <MyInput 
                type={type}
                placeholder = {`Введіть ${label?.toLowerCase()}`}
                {...props}
            />
        </div>

    )
}
