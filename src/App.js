import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import Layout from './layouts/Layout';
import Logo from './assets/img/illustrations/Bg-lg.png'
import './App.css';
import ScrollToTop from 'react-scroll-to-top';
import { Col, Row, Spinner } from 'react-bootstrap';
import AuthenticatedLayout from 'layouts/AuthenticatedLayout';
import { doc, getDoc } from "firebase/firestore";
import { OmnifoodServer } from 'config';

const App = () => {
  const [userData, setUserData] = useState(null)
  const [appLoading, setAppLoading] = useState(false)

  document.addEventListener("contextmenu", evt => evt.preventDefault(), false);
  document.addEventListener("copy", evt => {
    evt.preventDefault();
  }, false);

  const getUserData = async () => {
    setAppLoading(true)
    const SignedInEmail = JSON.parse(localStorage.getItem('SignedInEmail'))
    const documentRef = doc(OmnifoodServer, SignedInEmail, 'User-Data')
    const docSnap = await getDoc(documentRef);
    setUserData(docSnap.data())
    setAppLoading(false)
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
