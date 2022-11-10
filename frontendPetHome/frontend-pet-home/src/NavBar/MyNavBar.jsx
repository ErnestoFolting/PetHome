import React from 'react'
import './MyNavBar.css'
import { Link } from 'react-router-dom'
export const MyNavBar = () => {
  return (
    <div className='navBar'>
          <div className = 'navBar__links'>
              <Link to="/">Home</Link>
              <Link to="/adverts">Adverts</Link>
              <Link to="/about">About</Link>
          </div>
      </div>
  )
}
