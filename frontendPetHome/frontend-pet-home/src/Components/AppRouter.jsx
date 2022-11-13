import React from 'react'
import { Route, Routes} from "react-router-dom";
import Adverts from '../pages/Adverts/Adverts'
import { CertainAdvert } from '../pages/CertainAdvert/CertainAdvert';
import { CreateAdvert } from '../pages/CreateAdvert/CreateAdvert';
import { Login } from '../pages/Login/Login';
import { NotFound } from '../pages/NotFound/NotFound';

export const AppRouter = () => {
  return (
    <Routes>
        <Route exact path="/adverts" element=<Adverts /> />
        <Route exact path="/adverts/:id" element=<CertainAdvert /> />
        <Route path="/login" element=<Login /> />
        <Route path="/create" element=<CreateAdvert/> />
        <Route path="*" element=<NotFound /> />
      </Routes>
  )
}
