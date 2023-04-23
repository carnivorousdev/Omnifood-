import React from 'react';
import ProfileBanner from './Banner';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { OmnifoodServer } from 'config';
import BookMarks from './BookMarks';
import { toast } from 'react-toastify';



const Profile = () => {
  const [userData, setUserData] = useState(null)
  const [bookMarksData, setBookMarksData] = useState([])
  const [getBookMarksLoading, setBookMarksLoading] = useState(false)

  const getData = async () => {
    setBookMarksLoading(true)
    const SignedInEmail = JSON.parse(localStorage.getItem('SignedInEmail'))
    const docRef = doc(OmnifoodServer, SignedInEmail, 'Bookmarks-Data');
    const documentRef = doc(OmnifoodServer, SignedInEmail, 'User-Data')
    const docSnap1 = await getDoc(documentRef);
    setUserData(docSnap1.data())
    const docSnap2 = await getDoc(docRef);
    if (docSnap2.exists()) {
      var result = docSnap2.data()
      setBookMarksData(Object.values(result))
      setBookMarksLoading(false)
    } else {
      setBookMarksLoading(false)
      toast.error(`No bookmarks found for ${docSnap2.data().userName}`, {
        theme: 'colored'
      });
      setBookMarksData([])
    }
  }

  useEffect(() => {
    getData()
    document.title = "Omnifood | Profile";
  }, [])

  return (
    <>
      {getBookMarksLoading ?
        <Row className="g-0 w-100 h-100" >
          <Col xs={12} className='d-flex align-items-center justify-content-center' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
            <Spinner animation="border" variant="success" size='sm' />
          </Col>
        </Row> : <>
          <ProfileBanner userData={userData} />
          {bookMarksData.length > 0 && <Row className="g-3">
            <Col lg={12}>
              <BookMarks
                className="mb-3"
                cardTitle="Bookmarks"
                events={bookMarksData.slice(0, 4)}
                allBookMarksData={bookMarksData}
              />
            </Col>
          </Row>}
        </>}
    </>
  );
};

export default Profile;
