import React from 'react';
import { Card, Col, Button, Row } from 'react-bootstrap';

const RecipeFooter = ({ navigate, filteredData }) => {
  return (
    <Card>
      <Card.Body>
        <Row className="flex-end">
          <Col></Col>
          <Col xs="auto">
            <Button variant="falcon-default" className='me-3' onClick={() =>
              navigate(`/myRecipe/${filteredData.strMeal}/${filteredData.idIngredient}`)}>
              Cancel
            </Button>
            <Button
              variant="falcon-primary"
              className="me-2"
              type="submit"
            >
              Save
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default RecipeFooter;
