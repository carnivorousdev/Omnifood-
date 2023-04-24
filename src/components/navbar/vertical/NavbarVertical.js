import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Col, Nav, Navbar, Row, Spinner } from 'react-bootstrap';
import { navbarBreakPoint } from 'config';
import AppContext from 'context/Context';
import Flex from 'components/common/Flex';
import Logo from 'components/common/Logo';
import NavbarVerticalMenu from './NavbarVerticalMenu';
import ToggleButton from './ToggleButton';
import { AreaCodes } from 'routes/routes';
import axios from 'axios';
import _ from 'lodash';
import bgNavbar from 'assets/img/illustrations/bg-navbar.png';

const NavbarVertical = () => {
  const [loading, setLoading] = useState(false)
  const [routesData, setRoutesData] = useState([])
  const {
    config: {
      isNavbarVerticalCollapsed,
      showBurgerMenu,
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

  useEffect(() => {
    getRoutesData()
  }, [])

  const getRoutesData = () => {
    setLoading(true)
    let CategoryData = {}, AreaData = {}, IngredientData = {}
    axios.get(process.env.REACT_APP_BASE_URL + `categories.php`)
      .then(res => {
        let MealDataByCategory = res.data.categories
        CategoryData = {
          label: 'categoryData',
          children: [
            {
              active: true,
              icon: 'category',
              name: 'Categories',
              children: getCategoryChildrenData(MealDataByCategory)
            }
          ]
        }
        axios.get(process.env.REACT_APP_BASE_URL + `list.php?a=list`)
          .then(res => {
            let MealDataByArea = res.data.meals.map((ele, idx) => {
              return {
                ...ele,
                id: idx + 1
              }
            })
            let merged = _.merge(_.keyBy(MealDataByArea, 'id'), _.keyBy(AreaCodes, 'id'));
            let MergedValues = _.values(merged);
            AreaData = {
              label: 'areaData',
              children: [
                {
                  active: true,
                  icon: 'area',
                  name: 'Area',
                  children: getAreaChildrenData(MergedValues.filter(ele => ele.strArea != 'Unknown'))
                }
              ]
            }
            axios.get(process.env.REACT_APP_BASE_URL + `list.php?i=list`)
              .then(res => {
                let MealDataByIngredient = res.data.meals
                IngredientData = {
                  label: 'ingredientData',
                  children: [
                    {
                      active: true,
                      icon: 'ingredient',
                      name: 'Ingredients',
                      children: getIngredientChildrenData(MealDataByIngredient.slice(0, 300))
                    }
                  ]
                }
                setRoutesData([CategoryData, AreaData, IngredientData])
                setLoading(false)
              })
          })
      })
  }
  // const getImage = async (ingredientImageURL) => {
  //   const response = await axios.get(process.env.REACT_APP_PHOTO_URL + ingredientImageURL + '.png', {
  //     responseType: "arraybuffer",
  //   });
  //   const base64Image = Buffer.from(response.data, 'binary').toString('base64');
  //   const imageUrl = `data:image/jpeg;base64,${base64Image}`;
  //   return imageUrl
  // };

  const getIngredientChildrenData = (ingredientData) => {
    const data = ingredientData.map((ele) => {
      return {
        name: ele.strIngredient,
        active: true,
        idIngredient: ele.idIngredient,
        strIngredientThumb: process.env.REACT_APP_PHOTO_URL + ele.strIngredient + '.png'
      }
    })
    return data
  }

  const getAreaChildrenData = (areaData) => {
    const data = areaData.map((ele) => {
      return {
        name: ele.strArea,
        active: true,
        areaCode: ele.areaCode
      }
    })
    return data
  }
  const getCategoryChildrenData = (categoryData) => {
    const data = categoryData.map((ele) => {
      return {
        name: ele.strCategory,
        active: true,
        idCategory: ele.idCategory,
        strCategoryThumb: ele.strCategoryThumb
      }
    })
    return data
  }
  return (
    <Navbar
      expand={navbarBreakPoint}
      className='navbar-vertical navbar-vibrant'
      variant="light"
    >
      <Flex alignItems="center">
        <ToggleButton />
        <Logo at="navbar-vertical" width={150} />
      </Flex>
      {loading ? <Row className="g-0 w-100 h-100" >
        <Col xs={12} className='d-flex align-items-center justify-content-center' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          <Spinner animation="border" variant="warning" size='sm' />
        </Col>
      </Row> : <Navbar.Collapse
        in={showBurgerMenu}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundImage: `linear-gradient(-45deg, rgba(0, 160, 255, 0.86), #0048a2),url(${bgNavbar})`
        }}
      >
        <div className="navbar-vertical-content scrollbar">
          <Nav className="flex-column" as="ul">
            {routesData.map((route, idx) => (
              <Fragment key={idx}>
                <NavbarVerticalMenu routes={route.children} />
              </Fragment>
            ))}
          </Nav>
        </div>
      </Navbar.Collapse>}
    </Navbar>
  );
};


export default NavbarVertical;
