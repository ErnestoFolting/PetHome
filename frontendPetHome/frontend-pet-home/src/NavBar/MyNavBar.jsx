import { React, useContext } from 'react'
import './MyNavBar.css'
import { Link } from 'react-router-dom'
import { MyButton } from '../UI/buttons/MyButton'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'

const MyNavBar = () => {
  const { store } = useContext(Context);
  if (!store.isAuth) {
    return (
      <div className='navBar'>
        <h2 style={{color:'rgb(109, 106, 105)'}}>Буль ласка, для початку авторизуйтесь.</h2>
      </div>
    )
  }
  return (
    <div className='navBar'>
      <div className='exitButton'>
        {store.isAuth && <MyButton onClick={store.logout}>Вийти</MyButton>}
      </div>
      <div className='navBar__links'>
        <Link to="/adverts">Оголошення</Link>
        <Link to="/create">Створити оголошення</Link>
        <Link to="/myadverts">Мої оголошення</Link>
        <Link to="/myrequests">Мої заявки</Link>
        <Link to="/myprofile">Профіль</Link>
      </div>
    </div>
  )
}

export default observer(MyNavBar)
