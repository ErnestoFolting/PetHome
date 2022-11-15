import { React, useContext } from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import { Context } from '../index'
import { observer } from 'mobx-react-lite';
import Login from '../pages/Login/Login';
import Adverts from "../pages/Adverts/Adverts"
import { CertainAdvert } from "../pages/CertainAdvert/CertainAdvert"
import { CreateAdvert } from "../pages/CreateAdvert/CreateAdvert"
import { MyLoader } from '../UI/Loader/MyLoader';

function AppRouter() {
  const { store } = useContext(Context);
  if(store.isLoading){
    return <MyLoader/>
  } 
  return (
    store.isAuth
      ?
      <Routes>
        <Route path="/adverts" element=<Adverts /> exact />
        <Route path="/adverts/:id" element=<CertainAdvert /> exact />
        <Route path="create" element=<CreateAdvert /> />
        <Route path="*" element= <Navigate replace to ='/adverts'/> />
      </Routes>
      :
      <Routes>
        <Route path="/login" element=<Login /> />
        <Route path="/check" element=<h1>check</h1> />
        <Route path="*" element= <Navigate replace to ='/login'/> />
      </Routes>
  );
}
export default observer(AppRouter);
