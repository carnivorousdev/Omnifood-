import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import bg2 from 'assets/video/bg-3.jpg';
import Section from 'components/common/Section';
import { useNavigate } from 'react-router-dom';

const Cta = () => {
  const navigate = useNavigate()
  return (
    <Section overlay image={bg2} position="center top" className="light" >
      <Row className="justify-content-center text-center">
        <Col lg={8}>
          <p className="fs-3 fs-sm-4 text-white">
            From fresh salads to hearty entrees, our expert chefs use only the freshest ingredients to create mouth-watering dishes that are sure to satisfy your cravings.
          </p>
          <Button
            variant="outline-light"
            size="lg"
            className="border-2 rounded-pill mt-4 fs-0 py-2"
            onClick={() => navigate('/login')}
          >
            Start eating well
          </Button>
        </Col>
      </Row>
    </Section >
  )
}

export default Cta;
