import React from 'react';
import Section from 'components/common/Section';
import IconGroup from 'components/common/icon/IconGroup';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { menuList1, menuList2, menuList3 } from '../data/footer';
import { bgWhiteIcons } from '../data/socialIcons';
import { version } from 'config';

const FooterTitle = ({ children }) => (
  <h5 className="text-uppercase text-white opacity-85 mb-3">{children}</h5>
);


const FooterList = ({ list }) => (
  <ul className="list-unstyled">
    {list.map(({ title, to }, index) => (
      <li className="mb-1" key={index}>
        <Link className="text-600" to={to}>
          {title}
        </Link>
      </li>
    ))}
  </ul>
);


const FooterStandard = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };
  return (
    <>
      <Section bg="dark" className="pt-8 pb-4 light">
        <Row>
          <Col lg={4}>
            <FooterTitle>Our Mission</FooterTitle>
            <p className="text-600">
              At Omnifood, we believe that healthy food should be convenient and delicious. Our mission is to provide busy people with nutritious meals made from the freshest, locally sourced ingredients, cooked and delivered with care. We are committed to promoting a sustainable food system and supporting our community by working with small-scale farmers and producers. Whether you're looking for a quick lunch or a full week's worth of dinners, we've got you covered.
            </p>
            <IconGroup className="mt-4" icons={bgWhiteIcons} />
          </Col>
          <Col className="ps-lg-6 ps-xl-8">
            <Row className="mt-5 mt-lg-0">
              <Col xs={6} md={3}>
                <FooterTitle>Account</FooterTitle>
                <FooterList list={menuList1} />
              </Col>
              <Col xs={6} md={3}>
                <FooterTitle>Company</FooterTitle>
                <FooterList list={menuList2} />
              </Col>
              <Col xs={6} md={3}>
                <FooterTitle>Resources</FooterTitle>
                <FooterList list={menuList3} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Section>

      <section className=" bg-dark py-0 text-center fs--1 light">
        <hr className="my-0 border-600 opacity-25" />
        <div className="container py-3">
          <Row className="justify-content-between">
            <Col xs={12} sm="auto">
              <p className="mb-0 text-600">
                © 2023 Omnifood Inc.
              </p>
            </Col>
            <Col xs={12} sm="auto">
              <p className="mb-0 text-600">v{version}</p>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default FooterStandard;
