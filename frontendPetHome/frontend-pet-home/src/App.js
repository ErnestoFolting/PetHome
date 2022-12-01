import './Styles/App.css';
import { BrowserRouter } from "react-router-dom";
import MyNavBar from './NavBar/MyNavBar';
import AppRouter from './Components/AppRouter';
import { React, useEffect, useContext } from 'react';
import { Context } from './index'
import { observer } from 'mobx-react-lite';
import Footer from './Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdvertNotification } from './Components/AdvertNotification/AdvertNotification';

function App() {

  const { store } = useContext(Context);

  useEffect(() => {
    async function checkAuth() {
      await store.checkAuth()
      store.setLoading(false)
    }
    checkAuth()
  }, []);

  useEffect(() => {
    async function createHubConnection() {
      await store.createHubConnection()
    }
    if (store.isAuth) {
      createHubConnection()
    }
  }, [store.isAuth]);

  useEffect(() => {
    if (store?.myHubConnection) {
      store?.myHubConnection?.on("Send", (postedAdvert) => {
        // console.log("currentConnection", store.myHubConnection)
        // console.log("postedAdvert", postedAdvert)
        toast(
          <AdvertNotification
            advert={postedAdvert}
          />,
          { id: postedAdvert.id }
        )
      })
    }
  }, [store?.myHubConnection]);

  return (
    <BrowserRouter>
      <MyNavBar />
      <AppRouter />
      <ToastContainer
        position="bottom-right"
        autoClose={1000000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default observer(App);
