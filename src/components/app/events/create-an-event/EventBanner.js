import React from 'react';
import { Card, Form, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EventBanner = () => {
  return (
    <Card className="cover-image">
      <Form.Group controlId="formFile">
        <Form.Label className="cover-image-file-input">
          <FontAwesomeIcon icon="camera" className="me-2" />
          <span>Default file input example</span>
        </Form.Label>
        <Form.Control type="file" className="d-none" />
      </Form.Group>
    </Card>
  );
};

export default EventBanner;
