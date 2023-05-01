import React, { useEffect, useContext } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import Layout from './layouts/Layout';
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

const App = () => {
  const { pathname } = useLocation();
  const excludedPaths = ['/login', '/register', '/forget-password'];
  const {
    handleLoading,
    handleUserInfo,
    loading
  } = useContext(AppContext);

  const navigate = useNavigate()
  const customStyles = {
    backgroundColor: "#2F80ED",
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
    onAuthStateChanged(firestoreAuth, async (user) => {
      if (user) {
        if (user.emailVerified) {
          const documentRef = doc(OmnifoodServer, user.email, 'User-Data')
          const docSnap = await getDoc(documentRef);
          handleUserInfo(docSnap.data())
          handleLoading(false)
          if (excludedPaths.includes(pathname)) {
            navigate('/dashboard')
          } else navigate(pathname)
        } else {
          handleLoading(false)
          navigate('/login')
        }
      } else {
        handleLoading(false)
        navigate('/login')
      }
    })
  }, [])

  return (
    <>
      <ScrollToTop
        smooth
        component={<FaArrowUp />}
        style={customStyles}
      />
      <Layout />
    </>
  );
};

export default App;
