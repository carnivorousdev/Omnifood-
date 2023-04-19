import axios from 'axios';
import Avatar from 'components/common/Avatar';
import React, { useEffect, useState } from 'react';
import { Card, Col, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap';
import { toast } from 'react-toastify';

const MealDetailAside = ({ lookUpdata }) => {
  // if (lookUpdata) {
  //   Object.keys(lookUpdata).forEach((key) => {
  //     if (lookUpdata[key] == null || lookUpdata[key] == '') {
  //       delete lookUpdata[key];
  //     }
  //   });
  // }
  // const getImageUrl = (props) => {
  //   axios.get(process.env.REACT_APP_PHOTO_URL + `${props}.png`, { responseType: "blob" })
  //     .then((response) => {
  //       var reader = new window.FileReader();
  //       reader.readAsDataURL(response.data);
  //       return reader.result
  //     })
  // }

  return (
    <div className="sticky-sidebar">
      <Card className="mb-3 fs--1">
        <Card.Body>
          <h5 className="fs-0">Ingredients</h5>
          <hr />
          {lookUpdata && <div className="mb-1">
            {Object.entries(lookUpdata).map((_, i) => (lookUpdata[`strIngredient${i + 1}`] ?
              lookUpdata[`strIngredient${i + 1}`] != '' ?
                <Row>
                  <OverlayTrigger
                    key='top'
                    placement='top'
                    overlay={
                      <Tooltip className='text-capitalize'>
                        {lookUpdata[`strIngredient${i + 1}`]}
                      </Tooltip>
                    }
                  >
                    <Col className='text-capitalize text-1000 fw-medium text-truncate' sm={5}>{lookUpdata[`strIngredient${i + 1}`]}</Col>
                  </OverlayTrigger>

                  <Col className='text-capitalize text-1000 fw-medium' sm={2}>:</Col>
                  <OverlayTrigger
                    key='top'
                    placement='top'
                    overlay={
                      <Tooltip className='text-capitalize'>
                        {lookUpdata[`strMeasure${i + 1}`]}
                      </Tooltip>
                    }
                  >
                    <Col className='text-800 text-capitalize text-truncate' sm={5}>{lookUpdata[`strMeasure${i + 1}`]}</Col>
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
