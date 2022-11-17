import React from 'react'
import './MyForm.css'
export const MyForm = ({children, type, ...props}) => {
    return (
        <form className='myForm' {...props}>
            {children}
        </form>
    )
}
