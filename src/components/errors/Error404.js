import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useContext } from 'react';
import AppContext from 'context/Context';

const Error404 = () => {
  const {
    loading,
    userInfo
  } = useContext(AppContext);

  return (
    <>
      {loading ? <Row className="g-0">
        <Col xs={12} className='d-flex align-items-center justify-content-center' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          <Spinner animation="border" variant="primary" size='sm' />
        </Col>
      </Row> : <Card className="text-center">
        <Card.Body className="p-5">
          <div className="display-1 text-300 fs-error">404</div>
          <p className="lead mt-4 text-800 font-sans-serif fw-semi-bold">
            The page you're looking for is not found.
          </p>
          <hr />
          <p>
            Make sure the address is correct and that the page hasn't moved. If
            you think this is a mistake,
            <a href="mailto:info@exmaple.com" className="ms-1">
              contact us
            </a>
            .
          </p>
          <Link className="btn btn-primary btn-sm mt-3" to={Object.keys(userInfo).length > 0 ? '/dashboard' : '/login'}>
            <FontAwesomeIcon icon={faHome} className="me-2" />
            Take me home
          </Link>
        </Card.Body>
      </Card>}
    </>

  );
};

export default Error404;
