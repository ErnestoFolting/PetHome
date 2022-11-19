import './Styles/App.css';
import { BrowserRouter } from "react-router-dom";
import MyNavBar from './NavBar/MyNavBar';
import AppRouter from './Components/AppRouter';
import { React, useEffect, useContext } from 'react';
import { Context } from './index'
import { observer } from 'mobx-react-lite';
import Footer from './Footer/Footer';



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
        <AppRouter />
    </BrowserRouter>
  );
}

export default observer(App);
