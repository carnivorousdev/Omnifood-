import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import AppContext from 'context/Context';

const ToggleButton = () => {
  const {
    config: { isNavbarVerticalCollapsed },
    setConfig
  } = useContext(AppContext);

  const handleClick = () => {
    document
      .getElementsByTagName('html')[0]
      .classList.toggle('navbar-vertical-collapsed');
    setConfig('isNavbarVerticalCollapsed', !isNavbarVerticalCollapsed);
  };

  return (
      <div className="toggle-icon-wrapper">
        <Button
          variant="link"
          className="navbar-toggler-humburger-icon navbar-vertical-toggle"
          id="toggleNavigationTooltip"
          onClick={handleClick}
        >
          <span className="navbar-toggle-icon">
            <span className="toggle-line" />
          </span>
        </Button>
      </div>
  );
};

export default ToggleButton;
