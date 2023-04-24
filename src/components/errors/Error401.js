import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card } from 'react-bootstrap';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Error401 = () => (
  <Card className="text-center h-100">
    <Card.Body className="p-5">
      <div className="display-1 text-300 fs-error">401</div>
      <p className="lead mt-4 text-800 font-sans-serif fw-semi-bold">
        Access Denied
      </p>
      <hr />
      <p>
        You must be logged in to access this platform. Please log in or create an account to continue.
      </p>
      <a className="btn btn-primary btn-sm mt-3" href={'/login'}>
        <FontAwesomeIcon icon={faHome} className="me-2" />
        Take me home
      </a>
    </Card.Body>
  </Card>
);

export default Error401;
