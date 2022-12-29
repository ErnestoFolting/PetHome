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
        toast(
          <UserNotification
            request={request}
            status="apply"
          />
          ,
          { id: request.id }
        )
      })
      store?.myHubConnection?.on("Send", (advert) => {
        toast(
          <AdvertNotification
            advert={advert}
            status="generated"
          />,
          { id: advert.id }
        )
      })
      store?.myHubConnection?.on("Confirm", (confirmedRequest) => {
        toast(
          <AdvertNotification
            advert={confirmedRequest?.advert}
            status="confirm"
          />,
          { id: confirmedRequest.id }
        )
      })
      store?.myHubConnection?.on("Reject", (rejectedRequest) => {
        toast(
          <AdvertNotification
            advert={rejectedRequest?.advert}
            status="reject"
          />,
          { id: rejectedRequest.id }
        )
      })
      store?.myHubConnection?.on("Delete", (deletedRequest) => {
        toast(
          <UserNotification
            request={deletedRequest}
            status="delete"
          />
          ,
          { id: deletedRequest.id }
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
        autoClose={100000}
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
