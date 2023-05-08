import React from 'react';
import ProfileBanner from './Banner';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useEffect } from 'react';
import BookMarks from './BookMarks';
import { useContext } from 'react';
import AppContext from 'context/Context';

const Profile = () => {
  const { showBookMarks, loading, userInfo } = useContext(AppContext);

  useEffect(() => {
    document.title = "Omnifood | Profile";
  }, [])


  return (
    <>
      {loading ?
        <Row className="g-0 w-100 h-100" >
          <Col xs={12} className='d-flex align-items-center justify-content-center' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
            <Spinner animation="border" variant="success" size='sm' />
          </Col>
        </Row> : <>
          {Object.keys(userInfo).length > 0 && <ProfileBanner userData={userInfo} />}
          {showBookMarks.length > 0 && <Row className="g-3">
            <Col lg={12}>
              <BookMarks
                className="mb-3"
                cardTitle="Bookmarks"
                events={showBookMarks.slice(0, 4)}
                allBookMarksData={showBookMarks}
              />
            </Col>
          </Row>}
        </>}
    </>
  );
};

export default Profile;
