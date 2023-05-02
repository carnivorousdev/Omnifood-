import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import AppContext from 'context/Context';
import { Link } from 'react-router-dom';

const Error401 = () => {
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
      </Row> : <Card className="text-center h-100">
        <Card.Body className="p-5">
          <div className="display-1 text-300 fs-error">401</div>
          <p className="lead mt-4 text-800 font-sans-serif fw-semi-bold">
            Access Denied
          </p>
          <hr />
          <p>
            You must be logged in to access this platform. Please log in or create an account to continue.
          </p>
          <Link className="btn btn-primary btn-sm mt-3" to={Object.keys(userInfo).length > 0 ? '/dashboard' : '/login'}>
            <FontAwesomeIcon icon={faHome} className="me-2" />
            Take me home
          </Link>
        </Card.Body>
      </Card>}
    </>

  )
}

export default Error401;
