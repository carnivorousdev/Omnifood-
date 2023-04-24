import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import Layout from './layouts/Layout';
import './App.css';
import ScrollToTop from 'react-scroll-to-top';
import { Col, Row, Spinner } from 'react-bootstrap';
import AuthenticatedLayout from 'layouts/AuthenticatedLayout';
import { onAuthStateChanged } from 'firebase/auth';
import { firestoreAuth } from 'config'

const App = () => {
  const [userData, setUserData] = useState(null)
  const [appLoading, setAppLoading] = useState(false)

  document.addEventListener("contextmenu", evt => evt.preventDefault(), false);

  document.addEventListener("copy", evt => {
    evt.preventDefault();
  }, false);


  const getUserData = () => {
    setAppLoading(true)
    onAuthStateChanged(firestoreAuth, async (user) => {
      if (user.emailVerified) {
        setUserData(user)
      } else {
        setUserData(null)
      }
    })
  }

  // useEffect(() => {
  //   getUserData()
  // }, [])

  return (
    <Layout/>
  );
};

export default App;
