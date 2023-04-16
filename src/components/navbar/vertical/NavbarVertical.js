import React, { useContext, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Nav, Navbar } from 'react-bootstrap';
import { navbarBreakPoint } from 'config';
import AppContext from 'context/Context';
import Flex from 'components/common/Flex';
import Logo from 'components/common/Logo';
import NavbarVerticalMenu from './NavbarVerticalMenu';
import ToggleButton from './ToggleButton';
import routes from 'routes/routes';

const NavbarVertical = () => {
  const {
    config: {
      isNavbarVerticalCollapsed,
      showBurgerMenu
    }
  } = useContext(AppContext);

  const HTMLClassList = document.getElementsByTagName('html')[0].classList;

  useEffect(() => {
    if (isNavbarVerticalCollapsed) {
      HTMLClassList.add('navbar-vertical-collapsed');
    } else {
      HTMLClassList.remove('navbar-vertical-collapsed');
    }
    return () => {
      HTMLClassList.remove('navbar-vertical-collapsed-hover');
    };
  }, [isNavbarVerticalCollapsed, HTMLClassList]);

  //Control mouseEnter event
  let time = null;
  const handleMouseEnter = () => {
    if (isNavbarVerticalCollapsed) {
      time = setTimeout(() => {
        HTMLClassList.add('navbar-vertical-collapsed-hover');
      }, 100);
    }
  };
  const handleMouseLeave = () => {
    clearTimeout(time);
    HTMLClassList.remove('navbar-vertical-collapsed-hover');
  };

  return (
    <Navbar
      expand={navbarBreakPoint}
      className={classNames('navbar-vertical transparent')}
      variant="light"
    >
      <Flex alignItems="center">
        <ToggleButton />
        <Logo at="navbar-vertical" width={100} />
      </Flex>
      <Navbar.Collapse
        in={showBurgerMenu}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="navbar-vertical-content scrollbar">
          <Nav className="flex-column" as="ul">
            {routes.map(route => (
              <Fragment key={route.label}>
                <NavbarVerticalMenu routes={route.children} />
              </Fragment>
            ))}
          </Nav>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavbarVertical.propTypes = {
  label: PropTypes.string
};

export default NavbarVertical;
