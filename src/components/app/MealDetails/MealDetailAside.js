import React from 'react';
import { Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import defaultBanner from 'assets/img/illustrations/meal-1.jpg';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const MealDetailAside = ({ lookUpdata }) => {
  return (
    <div className="sticky-sidebar">
      <Card className="mb-3 fs--1">
        <Card.Body>
          <h5 className="fs-0">Ingredients</h5>
          <hr />
          {lookUpdata && <div className="mb-1">
            {Object.entries(lookUpdata).map((_, i) => (lookUpdata[`strIngredient${i + 1}`] ?
              lookUpdata[`strIngredient${i + 1}`] != '' ?
                <Row key={i}>
                  <OverlayTrigger
                    placement='top'
                    overlay={
                      <Tooltip className='text-capitalize'>
                        <div className="calendar">
                          <LazyLoadImage src={lookUpdata[`strIngredient${i + 1}`] ? process.env.REACT_APP_PHOTO_URL + lookUpdata[`strIngredient${i + 1}`] + '.png' : defaultBanner} alt={lookUpdata[`strIngredient${i + 1}`]} className="card-img-top rounded fluid mb-1" />
                          {lookUpdata[`strIngredient${i + 1}`]}
                        </div>
                      </Tooltip>
                    }
                  >
                    <Col className='text-capitalize text-1000 fw-medium text-truncate' xs={5} md={5} lg={5}>
                      <Link
                        to={`/ingredient/${lookUpdata[`strIngredient${i + 1}`]}`}
                        key={i + '-' + lookUpdata[`strIngredient${i + 1}`]}
                      >
                        {lookUpdata[`strIngredient${i + 1}`]}
                      </Link>
                    </Col>
                  </OverlayTrigger>


                  <Col className='text-capitalize text-1000 fw-medium' xs={1} md={1} lg={1}>:</Col>
                  <OverlayTrigger
                    placement='top'
                    overlay={
                      <Tooltip className='text-capitalize'>
                        {lookUpdata[`strMeasure${i + 1}`]}
                      </Tooltip>
                    }
                  >
                    <Col className='text-800 text-capitalize text-truncate' xs={5} md={5} lg={5}>{lookUpdata[`strMeasure${i + 1}`] == '' ? 'As per your taste' : lookUpdata[`strMeasure${i + 1}`]}</Col>
                  </OverlayTrigger>

                </Row>
                : ''
              : ''))}
          </div>}
        </Card.Body>
      </Card>
    </div>
  );
};

export default MealDetailAside;
