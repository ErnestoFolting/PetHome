import React from 'react'
import { MyInput } from './MyInput'
import './InputWithLabel.css'

export const InputWithLabel = React.forwardRef(({ label, type, isNotValid, ...props }, ref) => {
    return (
        <div>
            <label>{label}</label>
            <MyInput
                ref={ref}
                type={type}
                placeholder={`Введіть ${label?.toLowerCase()}`}
                {...props}
                isNotValid = {isNotValid}
            />
        </div>
    )
}
)
