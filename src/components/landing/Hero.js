import React, { useContext } from 'react';
import Typed from 'react-typed';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bg1 from 'assets/img/illustrations/bg-navbar.png';
import dashboard from 'assets/img/illustrations/eating.jpg'
import Section from 'components/common/Section';

const Hero = () => {

  return (
    <Section
      className="py-0 overflow-hidden light"
      image={bg1}
      position="center bottom"
      overlay
    >
      <Row className="justify-content-center align-items-center pt-8 pt-lg-10 pb-lg-9 pb-xl-0">
        <Col
          md={11}
          lg={8}
          xl={4}
          className="pb-7 pb-xl-9 text-center text-xl-start"
        >
          <h1 className="text-white fw-light">
            A
            <Typed
              strings={['healthy', 'hearty', 'wholesome', 'nutritious']}
              typeSpeed={40}
              backSpeed={50}
              className="fw-bold ps-2"
              loop
            />
            <br />
            meal delivered to your door, every single day
          </h1>
          <p className="lead text-white opacity-75">
            Feast Your Senses with Omnifood's Exquisite Creations
          </p>
          <Button
            as={Link}
            variant="outline-light"
            size="lg"
            className="border-2 rounded-pill mt-4 fs-0 py-2"
            to="/login"
          >
            Start eating well
            <FontAwesomeIcon icon="play" transform="shrink-6 down-1 right-5" />
          </Button>
        </Col>
        <Col
          xl={{ span: 7, offset: 1 }}
          className="align-self-end mt-4 mt-xl-0 cta-img-box"
        >
          <Image
            className="img-fluid img-landing-banner"
            src={dashboard}
            alt="dashboard"
          />
        </Col>
      </Row>
    </Section>
  );
};

export default Hero;
