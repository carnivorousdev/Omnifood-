import React from 'react';
import Flex from 'components/common/Flex';
import { BiCategoryAlt } from 'react-icons/bi';
import { AiOutlineAreaChart } from 'react-icons/ai'
const NavbarVerticalMenuItem = ({ route }) => {
  return (
    <Flex alignItems="center">
      {route.icon && (
        <span className="nav-link-icon">
          {route.icon == 'category' ?
            <BiCategoryAlt className="text-info fs-1" />
            : route.icon == 'area' ? <AiOutlineAreaChart className="text-success fs-1" /> : null}
        </span>
      )}
      <span className="nav-link-text ps-1">{route.name}</span>
    </Flex>
  );
};


export default React.memo(NavbarVerticalMenuItem);
