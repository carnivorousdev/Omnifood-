import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Main from './Main';
import 'helpers/initFA';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';

const loadingMarkup = () => (
  <Row className="g-0 w-100 h-100" >
    <Col xs={12} className='d-flex align-items-center justify-content-center' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
      <Spinner animation="border" variant="success" size='sm' />
    </Col>
  </Row>
)
ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
    <BrowserRouter>
      <Main>
        <App />
      </Main>
    </BrowserRouter>
  </Suspense>,
  document.getElementById('main')
);
