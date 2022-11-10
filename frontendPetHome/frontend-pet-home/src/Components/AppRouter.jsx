import React from 'react'
import { Route, Routes} from "react-router-dom";
import { About } from '../pages/About'
import Adverts from '../pages/Adverts/Adverts'
import { CertainAdvert } from '../pages/CertainAdvert/CertainAdvert';
import { NotFound } from '../pages/NotFound/NotFound';

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/about" element=<About /> />
        <Route exact path="/adverts" element=<Adverts /> />
        <Route exact path="/adverts/:id" element=<CertainAdvert /> />
        <Route path="/" element={<div>Home.</div>}/>
        <Route path="*" element=<NotFound /> />
      </Routes>
  )
}
