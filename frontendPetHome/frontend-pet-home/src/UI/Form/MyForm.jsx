import React from 'react'
import './MyForm.css'
export const MyForm = ({ children, type, title, ...props }) => {
    return (
        <div>
            <div className='formName'>
                {title}
            </div>
            <form className='myForm' {...props}>
                {children}
            </form>
        </div>
    )
}
