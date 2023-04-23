import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import Layout from './layouts/Layout';
import Logo from './assets/img/illustrations/bg-navbar.png'
import './App.css';
import ScrollToTop from 'react-scroll-to-top';
import { Col, Row, Spinner } from 'react-bootstrap';
import AuthenticatedLayout from 'layouts/AuthenticatedLayout';
import { onAuthStateChanged } from 'firebase/auth';
import { firestoreAuth } from 'config'

const App = ({ locationUrl }) => {
  const currentLocationPath = locationUrl + '/'
  const [userData, setUserData] = useState(null)
  const [appLoading, setAppLoading] = useState(false)

  document.addEventListener("contextmenu", evt => evt.preventDefault(), false);
  document.addEventListener("copy", evt => {
    evt.preventDefault();
  }, false);

  useEffect(() => {
    if (window.location.href == currentLocationPath + 'login' || window.location.href.includes('register') || window.location.href.includes('forgot-password')) {
      document.body.style = `background: url(${Logo}) no-repeat center;
      background-size: cover;
      `
    } else {
      document.body.style = 'none'
    }
  })

  const getUserData = () => {
    setAppLoading(true)
    onAuthStateChanged(firestoreAuth, async (user) => {
      if (user) {
        setAppLoading(false)
        setUserData(user)
      } else {
        setAppLoading(false)
        setUserData(null)
      }
    })
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <>
      {appLoading ? <Row className="g-0">
        <Col xs={12} className='d-flex align-items-center justify-content-center' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          <Spinner animation="border" variant="primary" size='sm' />
        </Col>
      </Row> :
        <Layout />
      }
    </>
  );
};

export default App;
