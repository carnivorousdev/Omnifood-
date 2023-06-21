import React from 'react';
import { Row, Col } from 'react-bootstrap';

const SectionHeader = ({ title, subtitle, ...rest }) => {
  return (
    <Row className="justify-content-center text-center" {...rest}>
      <Col lg={8} xl={7} xxl={6} className="col-xxl-6">
        <h1 className="fs-2 fs-sm-4 fs-md-5">{title}</h1>
        <p className="lead">{subtitle}</p>
      </Col>
    </Row>
  );
};

export default SectionHeader;
