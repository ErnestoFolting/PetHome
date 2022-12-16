import React from 'react'
import classes from './MyButton.module.css'

export const MyButton = ({ children, isNotValid, ...props }) => {
  return (
    <button {...props} className={isNotValid ? classes.myBtnIsNotValid : classes.myBtn}>
      {children}
    </button>
  )
}
