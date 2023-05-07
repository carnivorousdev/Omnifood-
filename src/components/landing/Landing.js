import React, { useEffect } from 'react';
import Hero from './Hero';
import NavbarStandard from './NavbarStandard';
import Partners from './Partners';
import Processes from './Processes';
import Testimonial from './Testimonial';
import Cta from './Cta';
import FooterStandard from './FooterStandard';
import Services from './Services';

const WithoutAuthLanding = () => {
  useEffect(() => {
    document.title = "Omnifood";
  }, []);

  return (
    <>
      <NavbarStandard />
      <Hero />
      <Partners />
      <Processes />
      <Services />
      <Testimonial />
      <Cta />
      <FooterStandard />
    </>
  );
};

export default WithoutAuthLanding;
