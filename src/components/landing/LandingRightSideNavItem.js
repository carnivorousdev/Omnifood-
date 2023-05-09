import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Nav,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import AppContext from 'context/Context';

const LandingRightSideNavItem = () => {
  const {
    config: { isDark },
    setConfig
  } = useContext(AppContext);

  return (
    <Nav navbar className="ms-auto">
      <Nav.Item as={'li'}>
        <Nav.Link
          className="theme-control-toggle"
          onClick={() => setConfig('isDark', !isDark)}
        >
          <OverlayTrigger
            key="bottom"
            placement='bottom'
            overlay={
              <Tooltip id="ThemeColor">
                {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              </Tooltip>
            }
          >
            <div className="theme-control-toggle-label">
              <FontAwesomeIcon
                className="fs-0"
                icon={isDark ? 'sun' : 'moon'}
              />
            </div>
          </OverlayTrigger>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default LandingRightSideNavItem;
