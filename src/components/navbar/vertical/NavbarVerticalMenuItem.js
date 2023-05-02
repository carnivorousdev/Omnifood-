import React from 'react';
import Flex from 'components/common/Flex';
import { BiCategoryAlt } from 'react-icons/bi';
import { AiOutlineAreaChart } from 'react-icons/ai'
import { GiHotMeal } from 'react-icons/gi'
import { MdFoodBank } from 'react-icons/md'
import Avatar from 'components/common/Avatar';
import Flag from 'react-world-flags'
import Image from 'assets/img/icons/image.png';

const NavbarVerticalMenuItem = ({ route }) => {
  return (
    <Flex alignItems="center">
      {route.icon && (
        <span className="nav-link-icon">
          {route.icon == 'category' ?
            <BiCategoryAlt className="text-800 fs-1" />
            : route.icon == 'area' ? <AiOutlineAreaChart className="text-800 fs-1" /> : route.icon == 'ingredient' ? <GiHotMeal className="text-800 fs-1" /> : route.icon == 'foodBank' ? <MdFoodBank className="text-800 fs-1" /> : null}
        </span>
      )}
      {route.strCategoryThumb && (
        <span className="nav-link-icon">
          <Avatar src={route.strCategoryThumb} size="s" />
        </span>
      )}
      {route.strIngredientThumb && (
        <span className="nav-link-icon">
          <Avatar src={route.strIngredientThumb} size="s" />
        </span>
      )}
       {route.strCreatedIngredientThumb && (
        <span className="nav-link-icon">
          <Avatar src={route.strCreatedIngredientThumb} size="s" />
        </span>
      )}
      {route.areaCode && (
        <span className="nav-link-icon">
          <Flag code={route.areaCode} fallback={<span className="nav-link-icon">
            <Avatar src={Image} size="s" />
          </span>} className='avatar-s avatar' />
        </span>
      )}
      <span className="nav-link-text ps-1 text-truncate">{route.name}</span>
    </Flex>
  );
};


export default React.memo(NavbarVerticalMenuItem);
