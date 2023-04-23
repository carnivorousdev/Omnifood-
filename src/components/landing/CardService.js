import React from 'react';
import { Card } from 'react-bootstrap';

const CardService = ({ media, title, description, children }) => (
  <Card className="card-span h-100">
    <div className="card-span-img">
      {media}
    </div>
    <Card.Body className="pt-6 pb-4">
      <h5 className="mb-2">{title}</h5>
      {description && <p>{description}</p>}
      {children}
    </Card.Body>
  </Card>
);


export default CardService;
