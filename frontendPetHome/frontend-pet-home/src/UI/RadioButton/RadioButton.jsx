import React from 'react'
import styles from './RadioButton.module.css'

export const RadioButton = React.forwardRef(({ label, isNotValid, ...props }, ref) => {
  return (
    <label>
      <input ref={ref} className={isNotValid ? styles.inputNotValid : styles.inputValid} type="radio" {...props} />
      {label}
    </label>
  );
}
)
