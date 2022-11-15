import './Styles/App.css';
import { BrowserRouter } from "react-router-dom";
import { MyNavBar } from './NavBar/MyNavBar';
import AppRouter from './Components/AppRouter';
import { React, useEffect, useContext } from 'react';
import { Context } from './index'
import { observer } from 'mobx-react-lite';
import { MyButton } from './UI/buttons/MyButton';



function App() {

  const { store } = useContext(Context);
  useEffect(() => {
    async function checkAuth() {
      await store.checkAuth()
      store.setLoading(false)
    }
    checkAuth()
  }, []);
  
  return (
    <BrowserRouter>
      <MyNavBar />
      {store.isAuth
        ? <div>
          <h1> Authorized </h1>
          <MyButton onClick={store.logout}>Вийти</MyButton>
        </div>
        : <h1> Not Authorized</h1>
      }
      <AppRouter />
    </BrowserRouter>
  );
}

export default observer(App);
