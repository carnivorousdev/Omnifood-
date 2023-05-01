import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import Logo from 'components/common/Logo';
import { Outlet } from 'react-router-dom';
import bgNavbar from 'assets/img/illustrations/bg-1.jpg';
import Section from 'components/common/Section';

const ErrorLayout = () => {
  return (
    <Section className="py-0"
      style={{
        backgroundImage: `linear-gradient(-45deg, rgba(0, 160, 255, 0.01), #0048a2),url(${bgNavbar})`
      }}>
      <Row className="flex-center min-vh-100 py-6">
        <Col sm={11} md={9} lg={7} xl={6} className="col-xxl-5">
          <Logo at="auth" width={null} />
          <Outlet />
        </Col>
      </Row>
    </Section>
  );
};

ErrorLayout.propTypes = {
  match: PropTypes.object
};

export default ErrorLayout;
