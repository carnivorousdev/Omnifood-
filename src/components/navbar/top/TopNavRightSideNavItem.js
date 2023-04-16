import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import ProfileDropdown from 'components/navbar/top/ProfileDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppContext from 'context/Context';

const TopNavRightSideNavItem = () => {
  const {
    config: { isDark },
    setConfig
  } = useContext(AppContext);
  return (
    <Nav
      navbar
      className="navbar-nav-icons ms-auto flex-row align-items-center"
      as="ul"
    >
      <Nav.Item as={'li'}>
        <Nav.Link
          className="px-2 theme-control-toggle"
          onClick={() => setConfig('isDark', !isDark)}
        >
          <div className="theme-control-toggle-label">
            <FontAwesomeIcon
              icon={isDark ? 'sun' : 'moon'}
              className="fs-0"
            />
          </div>
        </Nav.Link>
      </Nav.Item>
      <ProfileDropdown />
    </Nav>
  );
};

export default TopNavRightSideNavItem;
