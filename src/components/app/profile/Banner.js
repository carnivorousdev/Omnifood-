import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProfileBanner from './ProfileBanner';
import VerifiedBadge from 'components/common/VerifiedBadge';
import { BsFillPencilFill } from 'react-icons/bs'
import { useMediaQuery, useTheme } from '@mui/material';

const Banner = ({ userData }) => {
  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('lg'))
  return (
    <>
      {userData && <ProfileBanner>
        <ProfileBanner.Header avatar={userData} coverSrc={userData} />
        <ProfileBanner.Body>
          <Row>
            <Col lg={8}>
              <h4 className="mb-1">
                {userData.userName ? userData.userName : userData.userEmail} <VerifiedBadge />
              </h4>
              {userData.profileHeading && <h5 className="fs-0 fw-normal">
                {userData.profileHeading}
              </h5>}
              <div className="border-dashed-bottom my-4 d-lg-none" />
            </Col>
            {isMatch ? '' : <Col sm={3}></Col>}
            <Col>
              <Link to="/settings" className='icon-item'>
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
