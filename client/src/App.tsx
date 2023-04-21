import React, {FC, useContext, useEffect, useState} from 'react';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import { Navigate, useNavigate } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage';
import Account from './components/Account';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import LoginPage from './components/LoginPage';

const App: FC = () => {

  const {store} = useContext(Context);

  useEffect(() =>{
    if(localStorage.getItem('token')){
      store.checkAuth();
    }
  }, [])

  return (
    <Router>
      <Navbar />
      <Routes>
          <Route path="/" element={store.isAuth ? <Account /> : <RegistrationPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  )
}

export default observer(App);