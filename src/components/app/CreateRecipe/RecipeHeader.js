import React from 'react';
import { Card, Col, Button, Row } from 'react-bootstrap';

const RecipeHeader = () => {
  return (
    <Card>
      <Card.Body>
        <Row className="flex-between-center">
          <Col md>
            <h5 className="mb-2 mb-md-0"> Create Recipe</h5>
          </Col>
          <Col xs="auto">
            <Button
              size="sm"
              variant="falcon-default"
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

export default RecipeHeader;
