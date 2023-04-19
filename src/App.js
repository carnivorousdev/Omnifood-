import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from './layouts/Layout';
import Logo from './assets/img/illustrations/Bg-lg.png'
import './App.css';
import ScrollToTop from 'react-scroll-to-top';
const App = ({ locationUrl }) => {
  const currentLocationPath = locationUrl + '/'

  useEffect(() => {
    if (window.location.href == currentLocationPath || window.location.href.includes('register') || window.location.href.includes('errors') || window.location.href.includes('forgot-password')) {
      document.body.style = `background: url(${Logo}) no-repeat center;
      background-size: cover;
      `
    }
  },[])

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ScrollToTop smooth color="#fc8019" />
      <Layout />
    </Router>
  );
};

export default App;
