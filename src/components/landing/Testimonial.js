import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Section from 'components/common/Section';
import Slider from 'react-slick';
import { isIterableArray } from 'helpers/utils';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import testimonials from '../data/testimonialList';
import Avatar from 'components/common/Avatar';
import { useMediaQuery, useTheme } from '@mui/material';

const TestimonialItem = ({
  description,
  author,
  companyImage,
}) => {
  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <div className="px-5 px-sm-6">
      <p className="fs-sm-1 fs-md-2 fst-italic text-dark">{description}</p>
      <p className="fs-0 text-600">
        - {author}
      </p>
      <Avatar className="w-auto mx-auto" src={companyImage} alt="" size={isMatch ? '3xl' : '4xl'} />
    </div>
  );
};

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true
};

const Testimonial = () => (
  <Section className="text-center bg-white">
    <Row className="justify-content-center">
      <Col xs={10} lg={9} xl={8}>
        <Slider {...settings}>
          {isIterableArray(testimonials) &&
            testimonials.map((testimonial) => (
              <TestimonialItem {...testimonial} key={testimonial.author} />
            ))}
        </Slider>
      </Col>
    </Row>
  </Section>
);

export default Testimonial;
