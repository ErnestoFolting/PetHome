import React from 'react'
import classes from './MyInput.module.css'
export const MyInput = React.forwardRef(({ isNotValid, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={isNotValid ? classes.MyInputNotValid : classes.MyInput}
      type={type}
      {...props}
    />
  )
}
)
