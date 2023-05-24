import React from 'react';
import Typed from 'react-typed';
import { Row, Col, Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Section from 'components/common/Section';
import Slider from 'react-slick';

const Hero = () => {
  const dashboardImages =
    [
      'https://i.ibb.co/NscqrxP/gallery-4.webp',
      'https://i.ibb.co/KVqdZz1/gallery-7.webp',
      'https://i.ibb.co/qd9bWBM/gallery-8.webp',
      'https://i.ibb.co/1b37tRk/gallery-11.webp',
      'https://i.ibb.co/ds9pYmw/meal-1.webp'
    ]
  const settings = {
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    arrows: false,
  };

  return (
    <>
      <Slider {...settings}>
        {dashboardImages.map((image, index) => (
          <div key={index}>
            <div
              className="slide-image"
              style={{
                backgroundImage: `linear-gradient(-90deg, rgba(245, 245, 245, 0.3), #E0E0E0),url(${image})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: '100vh',
                zIndex: -1
              }}
            />
          </div>
        ))}
      </Slider>
      <Section
        className="py-0 overflow-hidden light"
        position="center bottom"
        overlay
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          zIndex: 1
        }}
      >
        <Row className="justify-content-center align-items-center pt-8 pt-lg-10 pb-lg-9 pb-xl-0">
          <Col
            xs={12}
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
        </Row>
      </Section>
    </>
  );
};

export default Hero;
