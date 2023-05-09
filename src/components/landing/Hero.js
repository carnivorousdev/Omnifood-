import React from 'react';
import Typed from 'react-typed';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dashboard from 'assets/img/illustrations/hero.png'
import Section from 'components/common/Section';
import { useMediaQuery, useTheme } from '@mui/material';

const Hero = () => {
  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Section
      className="py-0 overflow-hidden light"
      position="center bottom"
      overlay
      style={{backgroundColor:'#fdf2e9'}}
    >
      <Row className="justify-content-center align-items-center pt-8 pt-lg-10 pb-lg-9 pb-xl-0">
        <Col
          md={11}
          lg={8}
          xl={4}
          className="pb-7 pb-xl-9 text-center text-xl-start"
        >
          <h1 className="text-1000 fw-light">
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
          <p className="lead text-900 opacity-75 fst-italic">
            Feast Your Senses with Omnifood's Exquisite Creations
          </p>
          <Button
            variant="outline-dark"
            size="lg"
            className="border-2 rounded-pill mt-4 fs-0 py-2"
            onClick={() => location.replace('/login')}
          >
            Start eating well
            <FontAwesomeIcon icon="play" transform="shrink-6 down-1 right-5" />
          </Button>
        </Col>
        {isMatch ? '' : <Col
          xl={{ span: 7, offset: 1 }}
          className="align-self-center mt-4 mt-xl-0 cta-img-box"
        >
          <Image
            className="img-fluid img-landing-banner"
            src={dashboard}
            alt="dashboard"
          />
        </Col>}
      </Row>
    </Section>
  );
};

export default Hero;
