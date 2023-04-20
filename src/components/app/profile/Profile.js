import React from 'react';
import ProfileBanner from './Banner';
import { Col, Row } from 'react-bootstrap';
import activities from '../../data/activities';
import { useEffect } from 'react';
import { useState } from 'react';
import { onAuthStateChanged } from "firebase/auth"
import { firestoreAuth } from 'config'
import ActivityLog from './ActivityLog';
import { doc, getDoc } from "firebase/firestore";
import { OmnifoodServer } from 'config';
import _ from 'lodash';
import BookMarks from './BookMarks';

const Profile = () => {
  const [userData, setUserData] = useState(null)
  const [bookMarksData, setBookMarksData] = useState([])
  useEffect(() => {
    onAuthStateChanged(firestoreAuth, async (user) => {
      if (user) {
        setUserData(user)
        const docRef = doc(OmnifoodServer, "Users", user.email);
        const docSnap = await getDoc(docRef);
        var result = _.omit(docSnap.data(), ['accessToken',
          'emailVerified', 'isAnonymous', 'phoneNumber', 'providerData', 'userEmail', 'userName', 'userProfilePhoto']);
        setBookMarksData(Object.values(result))
      } else {
        setUserData(null)
      }
    });
  }, [])

  return (
    <>
      <ProfileBanner userData={userData} />
      <Row className="g-3">
        {/* <Col lg={8}>
          <ActivityLog className="mt-3" activities={activities.slice(4, 9)} />
        </Col> */}
        {bookMarksData.length > 0 && <Col lg={12}>
          <BookMarks
            className="mb-3"
            cardTitle="Bookmarks"
            events={bookMarksData.slice(0, 4)}
          />
        </Col>}
      </Row>
    </>
  );
};

export default Profile;
