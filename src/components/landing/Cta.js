import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Section from 'components/common/Section';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Cta = () => {
  const bg2 = 'https://i.ibb.co/16k75S0/meal-2.jpg'
  return (
    <Section overlay position="center top" className="light"
      style={{
        background: `linear-gradient(180deg, rgba(253, 242, 233, 0.4), #382E24), 
        url('${bg2}') center no-repeat fixed,
        url('${bg2}') center no-repeat fixed`,
        backgroundSize: 'cover',
      }}>
      <Row className="justify-content-center text-center">
        <Col lg={8}>
          <p className="fs-3 fs-sm-4 text-white fw-normal">
            From fresh salads to hearty entrees, our expert chefs use only the freshest ingredients to create mouth-watering dishes that are sure to satisfy your cravings.
          </p>
          <Button
            variant="outline-light"
            size="lg"
            className="border-2 rounded-pill mt-4 fs-0 py-2"
            onClick={() => location.replace('/login')}
          >
            Start eating well
            <FontAwesomeIcon icon="play" transform="shrink-6 down-1 right-5" />
          </Button>
        </Col>
      </Row>
    </Section >
  )
}

export default Cta;
