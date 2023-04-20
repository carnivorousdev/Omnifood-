import React from 'react';
import { Col, Row } from 'react-bootstrap';
import coverSrc from 'assets/img/illustrations/5.jpg';
import avatar from 'assets/img/team/7.jpg';
import { Link } from 'react-router-dom';
import ProfileBanner from './ProfileBanner';
import VerifiedBadge from 'components/common/VerifiedBadge';
import { BsFillPencilFill } from 'react-icons/bs'
const Banner = ({ userData }) => {
  return (
    <>
      {userData && <ProfileBanner>
        <ProfileBanner.Header avatar={userData.photoURL ? userData.photoURL : avatar} coverSrc={coverSrc} />
        <ProfileBanner.Body>
          <Row>
            <Col lg={8}>
              <h4 className="mb-1">
                {userData.displayName ? userData.displayName : 'Anthony Hopkins'} <VerifiedBadge />
              </h4>
              {/* <h5 className="fs-0 fw-normal">
                Senior Software Engineer at Technext Limited
              </h5> */}
              <div className="border-dashed-bottom my-4 d-lg-none" />
            </Col>
            <Col sm={3}></Col>
            <Col>
              <Link to="#!" className='icon-item'>
                <BsFillPencilFill className="text-800 fs-0" />
              </Link>
            </Col>
          </Row>
        </ProfileBanner.Body>
      </ProfileBanner>}
    </>
  );
};

export default Banner;
