import React, { useEffect, useState } from 'react';
import ProfileBanner from './ProfileBanner';
import { Col, Row, Spinner } from 'react-bootstrap';
import ProfileSettings from './ProfileSettings';
import { doc, getDoc } from "firebase/firestore";
import { OmnifoodServer } from 'config'

const Settings = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
     setDocument()
    document.title = "Omnifood | Settings";
  }, [])

  const setDocument = async () => {
    setLoading(true)
    const SignedInEmail = JSON.parse(localStorage.getItem('SignedInEmail'))
    const documentRef = doc(OmnifoodServer, SignedInEmail, 'User-Data')
    const docSnap = await getDoc(documentRef);
    setUserData(docSnap.data())
    setLoading(false)
  }

  return (
    <>
      {loading ? <Row className="g-0 w-100 h-100" >
        <Col xs={12} className='d-flex align-items-center justify-content-center' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          <Spinner animation="border" variant="success" size='sm' />
        </Col>
      </Row> :
        <>
          {userData && <ProfileBanner>
            <ProfileBanner.Header
              coverSrc={userData}
              avatar={userData}
              className="mb-8"
            />
          </ProfileBanner>}
          {userData && <Row className="g-3">
            <Col lg={12}>
              <ProfileSettings userData={userData} />
            </Col>
          </Row>}
        </>}
    </>
  );
};

export default Settings;
