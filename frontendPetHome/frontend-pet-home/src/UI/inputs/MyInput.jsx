import React from 'react'
import classes from './MyInput.module.css'
export const MyInput = React.forwardRef(({ isNotValid, ...props }, ref) => {
  return (
    <input ref={ref} className={isNotValid ? classes.MyInputNotValid : classes.MyInput} {...props} />
  )
}
)
