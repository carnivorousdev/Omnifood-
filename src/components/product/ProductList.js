import React, { useEffect, useState } from 'react';
import { Badge, Button, Col, Row, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ProductImage from './ProductImage';
import Flex from 'components/common/Flex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BsBookmarkStarFill } from 'react-icons/bs'
import axios from 'axios';
import BookMarkCheck from './BookmarkCheck';

const ProductList = ({ product }) => {
  const {
    idMeal,
  } = product;
  const navigate = useNavigate()
  const [idData, setIdData] = useState({})
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    axios.get(process.env.REACT_APP_BASE_URL + `lookup.php?i=${idMeal}`)
      .then(res => {
        if (res.data.meals) {
          setLoading(false)
          setIdData(res.data.meals[0])
        } else {
          setLoading(false)
          setIdData({})
        }
      }).catch(() => {
        setLoading(false)
        setIdData({})
      })
  }, [idMeal])


  const {
    bookMarkLoading,
    checkHeartColor,
    checkAddToBookMark,
    setBookMarkLoading
  } = BookMarkCheck(idData);

  return (
    <>
      {Object.keys(idData).length > 0 && <Col
        xs={12}
        className='p-card bg-soft-light'
      >
        {loading ? <Row className="g-0 w-100 h-100">
          <Col xs={12} className='d-flex align-items-center justify-content-center' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
            <Spinner animation="border" variant="success" size='sm' />
          </Col>
        </Row> : <Row>
          <Col sm={5} md={4}>
            <ProductImage
              name={idData.strMeal}
              id={idMeal}
              strMealThumb={idData.strMealThumb}
            />
          </Col>
          <Col sm={7} md={8}>
            <Row className="h-100">
              <Col lg={8}>
                <h5 className="mt-3 mt-sm-0">
                  <p className="text-dark fs-0 fs-lg-1">
                    {idData.strMeal}
                  </p>
                </h5>
                <div className='fs--1 mb-2 mb-md-3'>
                  {<Link
                    to={`/category/${idData.strCategory}`}>
                    <Badge pill bg="info" className="me-2">
                      {idData.strCategory}
                    </Badge>
                  </Link>}
                  {idData.strArea && idData.strArea.toString().toLowerCase() != 'unknown' && <Link
                    to={`/areas/${idData.strArea}`}>
                    <Badge pill bg="success" className="me-2">
                      {idData.strArea}
                    </Badge>
                  </Link>}
                </div>
                {Object.entries(idData).map((_, i) => (idData[`strIngredient${i + 1}`] && i < 4 ?
                  idData[`strIngredient${i + 1}`] != '' ?
                    <Row key={i} className='fs--2 w-75'>
                      <Col className='text-capitalize text-1000 fw-medium text-truncate' xs={5} md={5} lg={5}>
                        <Link
                          to={`/ingredient/${idData[`strIngredient${i + 1}`]}`}
                          key={i + '-' + idData[`strIngredient${i + 1}`]}
                        >
                          {idData[`strIngredient${i + 1}`]}
                        </Link>
                      </Col>
                      <Col className='text-capitalize text-1000 fw-medium' xs={1} md={1} lg={1}>:</Col>
                      <Col className='text-800 text-capitalize text-truncate ' xs={5} md={5} lg={5}>{idData[`strMeasure${i + 1}`]}</Col>
                    </Row>
                    : ''
                  : ''))}
                <Row className='fs--2 my-3 text-waring fw-medium'>
                  <Col>.... More in detailed view</Col>
                </Row>
              </Col>
              <Col lg={4} as={Flex} justifyContent="end" direction="column" >
                <div className="mt-2">
                  {bookMarkLoading ?
                    <Button size="sm" variant={checkHeartColor ? 'falcon-danger' : "falcon-default"}
                    className='mb-2 w-100 d-flex align-items-center justify-content-center fs--1 py-1'>
                      <Spinner animation="border" variant={checkHeartColor ? 'falcon-danger' : "falcon-default"} size='sm' />
                    </Button>
                    : <Button
                      variant={checkHeartColor ? 'falcon-danger' : "falcon-default"}
                      className='mb-2 w-100 d-flex align-items-center justify-content-center fs--1'
                      size="sm"
                      onClick={() => { 
                        setBookMarkLoading(true)
                        checkAddToBookMark(idData) }}>
                      Favourite
                      <BsBookmarkStarFill className="ms-2 fs-0" />
                    </Button>}
                  <Button
                    variant="falcon-warning"
                    className='w-100 d-flex align-items-center justify-content-center fs--1'
                    onClick={() => { navigate(`/mealdetails/${idMeal}`) }}>
                    Detailed view
                    <FontAwesomeIcon icon="chevron-right" className="ms-2 fs-0" />
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>}
      </Col >}
    </>
  );
};


export default ProductList;
