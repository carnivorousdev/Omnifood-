import React, { useEffect, useContext } from 'react';
import ProfileBanner from './ProfileBanner';
import { Col, Row, Spinner } from 'react-bootstrap';
import ProfileSettings from './ProfileSettings';
import AppContext from 'context/Context';
import ChangePassword from './ChangePassword';
import DangerZone from './DangerZone';
import { ProfileProvider } from 'context/ProfileProvider';

const Settings = () => {
  const {
    userInfo,
    loading
  } = useContext(AppContext);

  useEffect(() => {
    document.title = "Omnifood | Settings";
  }, [])

  return (
    <>
      {loading ? <Row className="g-0 w-100 h-100" >
        <Col xs={12} className='d-flex align-items-center justify-content-center' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          <Spinner animation="border" variant="success" size='sm' />
        </Col>
      </Row> :
        <>
          <ProfileProvider>
            {Object.keys(userInfo).length > 0 && <ProfileBanner>
              <ProfileBanner.Header
                coverSrc={userInfo}
                avatar={userInfo}
                className="mb-8"
              />
            </ProfileBanner>}
            {Object.keys(userInfo).length > 0 &&
              <Row className="g-3">
                <Col lg={8}>
                  <ProfileSettings userData={userInfo} />
                </Col>
                <Col lg={4}>
                  <div className="sticky-sidebar">
                    <ChangePassword />
                    <DangerZone />
                  </div>
                </Col>
              </Row>}
          </ProfileProvider>
        </>}
    </>
  );
};

export default Settings;
