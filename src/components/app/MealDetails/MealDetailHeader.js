import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import FalconLightBox from 'components/common/FalconLightBox';
const MealDetailHeader = ({ lookUpdata }) => {
  return (
    <Card className="p-0 mb-3">
      {lookUpdata && (
        <FalconLightBox image={lookUpdata.strMealThumb}>
          <img className="card-img-top" src={lookUpdata.strMealThumb} alt={lookUpdata.strMeal} />
        </FalconLightBox>
      )}
      {lookUpdata && <Card.Body className="overflow-hidden">
        <Row className="flex-center">
          <Col>
            <Flex>
              <div className="fs--1 ms-2 flex-1">
                <h5 className="fs-0 text-capitalize">{lookUpdata.strMeal}</h5>
              </div>
            </Flex>
          </Col>
        </Row>
      </Card.Body>}
    </Card>
  );
};

export default MealDetailHeader;
