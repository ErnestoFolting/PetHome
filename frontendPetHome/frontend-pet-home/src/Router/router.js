import Adverts from "../pages/Adverts/Adverts"
import { CertainAdvert } from "../pages/CertainAdvert/CertainAdvert"
import { CreateAdvert } from "../pages/CreateAdvert/CreateAdvert"
import Login from "../pages/Login/Login"


export const privateRoutes = [
    {path: '/adverts', element: Adverts ,exact: true},
    {path: '/adverts/:id', element:CertainAdvert ,exact: true},
    {path: '/create', element:CreateAdvert ,exact: false},
]

export const publicRoutes = [
    {path: '/login', element: Login ,exact: false},
    {path: '/check', element:<h1>check</h1>,exact:false},
]
