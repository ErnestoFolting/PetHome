import React from 'react'
import './NotFound.css'

export const NotFound = () => {
    return (
        <div className='notFoundContent'>
            <img src={require('../../Images/unhappyDog.png')} />
            <div>Unfortunately, the page is not found</div>
        </div>
    )
}
