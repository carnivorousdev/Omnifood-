import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Collapse } from 'react-bootstrap';
import NavbarVerticalMenuItem from './NavbarVerticalMenuItem';
import classNames from 'classnames';
import AppContext from 'context/Context';

const CollapseItems = ({ route }) => {
  const openCollapse = childrens => {
    const checkLink = children => {
      return (
        Object.prototype.hasOwnProperty.call(children, 'children') &&
        children.children.some(checkLink)
      );

    };
    return childrens.some(checkLink);
  };

  const [open, setOpen] = useState(openCollapse(route.children));

  return (
    <Nav.Item as="li">
      <Nav.Link
        onClick={() => {
          setOpen(!open);
        }}
        className={classNames('dropdown-indicator cursor-pointer', {
          'text-500': !route.active
        })}
        aria-expanded={open}
      >
        <NavbarVerticalMenuItem route={route} />
      </Nav.Link>
      <Collapse in={open}>
        <Nav className="flex-column nav" as="ul">
          <NavbarVerticalMenu routes={route.children} />
        </Nav>
      </Collapse>
    </Nav.Item>
  );
};

const NavbarVerticalMenu = ({ routes }) => {
  const {
    config: { showBurgerMenu },
    setConfig
  } = useContext(AppContext);

  const handleNavItemClick = () => {
    if (showBurgerMenu) {
      setConfig('showBurgerMenu', !showBurgerMenu);
    }
  };
  return routes.map(route => {
    if (!route.children) {
      return (
        <Nav.Item as="li" key={route.name} onClick={handleNavItemClick}>
          <NavLink
            to={route.idCategory ? `/category/${route.name}` :
              route.strIngredientThumb ?
                `/ingredient/${route.name}` :
                `/areas/${route.name}`}
            className={({ isActive }) =>
              isActive ? 'active nav-link' : 'nav-link'
            }
          >
            <NavbarVerticalMenuItem route={route} />
          </NavLink>
        </Nav.Item>
      );
    }
    return <CollapseItems route={route} key={route.name} />;
  });
};

export default NavbarVerticalMenu;
