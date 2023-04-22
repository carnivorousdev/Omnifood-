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
    config: { isDark, isRTL },
    setConfig
  } = useContext(AppContext);

  return (
    <Nav navbar className="ms-auto">
      <Nav.Item as={'li'}>
        <Nav.Link
          className="pe-2 theme-switch-toggle"
          onClick={() => setConfig('isDark', !isDark)}
        >
          <OverlayTrigger
            key="left"
            placement={isRTL ? 'bottom' : 'left'}
            overlay={
              <Tooltip id="ThemeColor" className="d-none d-lg-block">
                {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              </Tooltip>
            }
          >
            <span>
              <div className="theme-switch-toggle-label">
                <FontAwesomeIcon
                  icon={isDark ? 'sun' : 'moon'}
                  className="me-2"
                />
              </div>
              <p className="d-lg-none mb-0">
                {isDark ? 'Switch to light theme ' : 'Switch to dark theme'}
              </p>
            </span>
          </OverlayTrigger>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default LandingRightSideNavItem;
