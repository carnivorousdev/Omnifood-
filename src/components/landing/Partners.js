import React from 'react';
import featureList from '../data/featureList';
import Section from 'components/common/Section';
import { Row, Col, Image } from 'react-bootstrap';

const Partner = props => (
  <Col xs={3} sm="auto" className="my-1 my-sm-3 px-card">
    <Image className="landing-cta-img" {...props} alt="Partner" />
  </Col>
);

const Partners = () => {
  return (
    <Section  className="py-3 shadow bg-soft-primary">
      <Row className="justify-content-center text-center">
        <Col lg={8} xl={7} xxl={6} className="col-xxl-6">
          <h1 className='fs-0 fw-bold'>AS FEATURED IN</h1>
        </Col>
      </Row>
      <Row className="flex-center">
        {featureList.map((feature) => (
          <Partner key={feature.src} {...feature} />
        ))}
      </Row>
    </Section>
  );
};

export default Partners;
