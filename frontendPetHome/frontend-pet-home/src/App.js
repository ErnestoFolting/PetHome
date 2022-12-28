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
import { UserNotification } from './Components/UserNotification/UserNotification';

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
      store?.myHubConnection?.on("Apply", (request) => {
        console.log(request)
        toast(
          <UserNotification
            request={request}
          />
          ,
          { id: request.id }
        )
      })
      store?.myHubConnection?.on("Send", (advert) => {
        toast(
          <AdvertNotification
            advert={advert}
          />,
          { id: advert.id }
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
        autoClose={3000}
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
