import React from 'react';
import { Card, Col, Button, Row } from 'react-bootstrap';

const RecipeFooter = () => {
  return (
    <Card>
      <Card.Body>
        <Row className="flex-end">
          <Col></Col>
          <Col xs="auto">
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
