import React, { useEffect, useContext } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import ScrollToTop from 'react-scroll-to-top';
import { FaArrowUp } from "react-icons/fa";
import { doc, getDoc } from 'firebase/firestore';
import { OmnifoodServer } from 'config';
import { firestoreAuth } from 'config'
import { onAuthStateChanged } from "firebase/auth"
import AppContext from 'context/Context';
import { useLocation, useNavigate } from 'react-router-dom';
import { Col, Row, Spinner } from 'react-bootstrap';
import Loadable from 'react-loadable';
import Layout from './layouts/Layout';
import { LoginProvider } from 'context/LoginProvider';

const App = () => {
  const { pathname } = useLocation();
  const excludedPaths = ['/login', '/register', '/forgot-password', '/'];
  const {
    handleLoading,
    handleUserInfo,
    loading
  } = useContext(AppContext);

  const navigate = useNavigate()
  const customStyles = {
    backgroundColor: "#2c7be5",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    zIndex: 10000000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "background-color 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "#fff",
    },
  };

  useEffect(() => {
    handleLoading(true)
    Loadable.preloadReady().then(() => {
      onAuthStateChanged(firestoreAuth, async (user) => {
        if (user) {
          if (user.emailVerified) {
            const documentRef = doc(OmnifoodServer, user.uid, 'User-Data')
            const docSnap = await getDoc(documentRef);
            if (docSnap.exists()) {
              handleUserInfo(docSnap.data())
              handleLoading(false)
              if (excludedPaths.includes(pathname)) {
                navigate('/dashboard')
              } else navigate(pathname)
            } else {
              handleLoading(false)
              if (pathname === '/') {
                navigate('/')
              } else {
                navigate('/login')
              }
            }
          } else {
            handleLoading(false)
            if (pathname === '/') {
              navigate('/')
            } else {
              navigate('/login')
            }
          }
        } else {
          handleLoading(false)
          if (pathname === '/') {
            navigate('/')
          } else {
            navigate('/login')
          }
        }
      })
    });
  }, []);

  return (
    <>
      {loading && excludedPaths.includes(pathname) ? <Row className="g-0 w-100 h-100" >
        <Col xs={12} className='d-flex align-items-center justify-content-center' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          <Spinner animation="border" variant="primary" />
        </Col>
      </Row> : <>
        <LoginProvider>
          <ScrollToTop
            smooth
            component={<FaArrowUp className='text-white' />}
            style={customStyles}
          />
          <Layout />
        </LoginProvider>
      </>}
    </>

  );
};

export default App;
