import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import classNames from 'classnames';
import AppContext from 'context/Context';
import Logo from 'components/common/Logo';
import SearchBox from './SearchBox';
import { navbarBreakPoint, topNavbarBreakpoint } from 'config';
import TopNavRightSideNavItem from './TopNavRightSideNavItem';
import { useLocation } from 'react-router';

const NavbarTop = () => {
  const {
    config: { showBurgerMenu, navbarPosition },
    setConfig,
  } = useContext(AppContext);

  const { pathname } = useLocation();
  const isChat = pathname.includes('chat');

  const [showDropShadow, setShowDropShadow] = useState(false);

  const handleBurgerMenu = () => {
    setConfig('showBurgerMenu', !showBurgerMenu);
  };

  const setDropShadow = () => {
    const el = document.documentElement;
    if (el.scrollTop > 0) {
      setShowDropShadow(true);
    } else {
      setShowDropShadow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', setDropShadow);
    return () => window.removeEventListener('scroll', setDropShadow);
  }, []);

  return (
    <Navbar
      className={classNames('navbar-glass  fs--1 navbar-top sticky-kit mb-1', {
        'navbar-glass-shadow': showDropShadow && !isChat
      })}
      expand={true}
    >
      <Navbar.Toggle
        className={classNames('toggle-icon-wrapper me-md-3 me-2', {
          'd-lg-none': navbarPosition === 'top',
          [`d-${navbarBreakPoint}-none`]:
            navbarPosition === 'vertical' || navbarPosition === 'combo'
        })}
        as="div"
      >
        <button
          className="navbar-toggler-humburger-icon btn btn-link d-flex flex-center"
          onClick={handleBurgerMenu}
          id="burgerMenu"
        >
          <span className="navbar-toggle-icon">
            <span className="toggle-line" />
          </span>
        </button>
      </Navbar.Toggle>
      <Logo at="navbar-top" width={150} id="topLogo" />
      <Nav
        navbar
        className={`align-items-center d-none d-${topNavbarBreakpoint}-block`}
        as="ul"
      >
        <Nav.Item as="li">
          <SearchBox />
        </Nav.Item>
      </Nav>
      <TopNavRightSideNavItem />
    </Navbar>
  );
};

export default NavbarTop;
