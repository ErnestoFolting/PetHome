import { React, useContext } from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import { Context } from '../index'
import { observer } from 'mobx-react-lite';
import Login from '../pages/Login/Login';
import Adverts from "../pages/Adverts/Adverts"
import CertainAdvert from "../pages/CertainAdvert/CertainAdvert"
import { CreateAdvert } from "../pages/CreateAdvert/CreateAdvert"
import { MyLoader } from '../UI/Loader/MyLoader';
import { Registration } from '../pages/Registration/Registration';
import { UserProfile } from '../pages/UserProfile/UserProfile'
import { MyProfile } from '../pages/MyProfile/MyProfile';
import { MyAdverts } from '../pages/MyAdverts/MyAdverts';

function AppRouter() {
  const { store } = useContext(Context);
  if (store.isLoading) {
    return <MyLoader />
  }
  return (
    store.isAuth
      ?
      <Routes>
        <Route path="/adverts" element=<Adverts /> exact />
        <Route path="/adverts/:id" element=<CertainAdvert /> exact />
        <Route path="/users/:id" element=<UserProfile /> exact />
        <Route path="/myprofile" element=<MyProfile /> exact />
        <Route path="/myadverts" element=<MyAdverts /> exact />
        <Route path="/create" element=<CreateAdvert /> />
        <Route path="*" element=<Navigate replace to='/adverts' /> />
      </Routes>
      :
      <Routes>
        <Route path="/login" element=<Login /> />
        <Route path="/registration" element=<Registration /> />
        <Route path="*" element=<Navigate replace to='/login' /> />
      </Routes>
  );
}
export default observer(AppRouter);
