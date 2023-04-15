import React from 'react';
import NavbarDropdown from './NavbarDropdown';
import {
  appRoutes,
} from 'routes/routes';
import NavbarDropdownApp from './NavbarDropdownApp';

const NavbarTopDropDownMenus = () => {
  return (
    <>
      <NavbarDropdown>
        <NavbarDropdownApp items={appRoutes.children} />
      </NavbarDropdown>
    </>
  );
};

export default NavbarTopDropDownMenus;
