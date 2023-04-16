import React from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const SocialAuthButtons = () => (
  <Form.Group className="mb-0">
    <Row className='d-flex justify-content-center'>
      <Col sm={8} className="pe-sm-1">
        <Button
          variant=""
          size="sm"
          className="btn-outline-google-plus mt-2 w-100"
        >
          <FontAwesomeIcon
            icon={['fab', 'google-plus-g']}
            transform="grow-8"
            className="me-2"
          />{' '}
          google
        </Button>
      </Col>
    </Row>
  </Form.Group>
);

export default SocialAuthButtons;
