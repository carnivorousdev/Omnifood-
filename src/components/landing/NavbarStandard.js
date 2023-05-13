import React, { useEffect } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import handleNavbarTransparency from 'helpers/handleNavbarTransparency';
import LandingRightSideNavItem from './LandingRightSideNavItem';
import { topNavbarBreakpoint } from 'config';

const NavbarStandard = () => {
  const logo = 'https://i.ibb.co/Qk4F3rb/omnifood-logo.webp'
  
  useEffect(() => {
    window.addEventListener('scroll', handleNavbarTransparency);
    return () => window.removeEventListener('scroll', handleNavbarTransparency);
  }, []);

  return (
    <Navbar
      variant='dark'
      fixed="top"
      expand={topNavbarBreakpoint}
      className='navbar-standard navbar-theme'
    >
      <Container className='d-flex align-items-center'>
        <Navbar.Brand className="text-white dark__text-white" >
          <img className="me-2 font-sans-serif" src={logo} alt="Logo" width={150} id='landing-top-img' />
        </Navbar.Brand>
        <LandingRightSideNavItem />
      </Container>
    </Navbar>
  );
};

export default NavbarStandard;
