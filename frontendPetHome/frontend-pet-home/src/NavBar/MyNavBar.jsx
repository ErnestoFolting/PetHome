import { React, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { MyButton } from '../UI/buttons/MyButton'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import s from './MyNavBar.module.css'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import Logo from '../Assets/PetHome.png'

const MyNavBar = () => {
  const [nav, setNav] = useState(false);
  const { store } = useContext(Context);
  if (!store.isAuth) {
    return (
      <div className={s.navBar}>
        <h2 style={{ color: 'rgb(109, 106, 105)' }}>Будь ласка, для початку авторизуйтесь.</h2>
      </div>
    )
  }
  return (
    <div className={s.navBar}>


      <Link to="/adverts" onClick={() => setNav(!nav)}><img src={Logo} alt='logo' href='/adverts' /></Link>
      <div className={nav ? [s.menu, s.active].join(' ') : [s.menu]}>
        <Link to="/adverts" onClick={() => setNav(!nav)}>Оголошення</Link>
        <Link to="/create" onClick={() => setNav(!nav)}>Створити оголошення</Link>
        <Link to="/myadverts" onClick={() => setNav(!nav)}>Мої оголошення</Link>
        <Link to="/myrequests" onClick={() => setNav(!nav)}>Мої заявки</Link>
        <Link to="/myprofile" onClick={() => setNav(!nav)}>Профіль</Link>
      </div>
      <div onClick={() => setNav(!nav)} className={s.mobile_btn}>
        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </div>
      <div>
        {store.isAuth && <MyButton onClick={store.logout} style={{ boxShadow: 'none' }}>Вийти</MyButton>}
      </div>
    </div>
  )
}

export default observer(MyNavBar)
