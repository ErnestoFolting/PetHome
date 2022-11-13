import React from 'react'
import './MyNavBar.css'
import { Link } from 'react-router-dom'
export const MyNavBar = () => {
  return (
    <div className='navBar'>
          <div className = 'navBar__links'>
              <Link to="/adverts">Оголошення</Link>
              <Link to="/create">Створити оголошення</Link>
              <Link to="/myadverts">Мої оголошення</Link>
              <Link to="/myrequests">Мої заявки</Link>
              <Link to="/myprofile">Профіль</Link>
          </div>
      </div>
  )
}
