import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavbarTop from 'components/navbar/top/NavbarTop';
import NavbarVertical from 'components/navbar/vertical/NavbarVertical';
import Footer from 'components/footer/Footer';
import classNames from 'classnames';

const MainLayout = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);




  return (
    <div className='container-fluid'>
      <NavbarVertical />
      <div className={classNames('content')}>
        <NavbarTop />
        {/*------ Main Routes ------*/}
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
