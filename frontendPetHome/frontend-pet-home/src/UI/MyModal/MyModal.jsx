import React from 'react'
import classes from './MyModal.module.css'

export const MyModal = ({ children, visible, setVisible, ...props }) => {
    const rootClasses = [classes.myModal]
    if(visible){
        rootClasses.push(classes.myModal__active)
    }
    return (
        <div className={rootClasses.join(' ')}  onClick= {()=>setVisible(false)}>
            <div className={classes.myModalContent}  {...props} onClick = {(e)=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
