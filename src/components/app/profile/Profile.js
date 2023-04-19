import React from 'react';
import ProfileBanner from './Banner';
import { Col, Row } from 'react-bootstrap';
import Events from './Events';
import events from '../../data/events';
import activities from '../../data/activities';
import { useEffect } from 'react';
import { useState } from 'react';
import { onAuthStateChanged } from "firebase/auth"
import { firestoreAuth } from 'config'
import ActivityLog from './ActivityLog';

const Profile = () => {
  const [userData, setUserData] = useState(null)
  useEffect(() => {
    onAuthStateChanged(firestoreAuth, (user) => {
      if (user) {
        setUserData(user)
      } else {
        setUserData(null)
      }
    });
  }, [])

  return (
    <>
      <ProfileBanner userData={userData} />
      <Row className="g-3">
        <Col lg={8}>
          <ActivityLog className="mt-3" activities={activities.slice(4, 9)} />
        </Col>
        <Col lg={4}>
          <div className="sticky-sidebar">
            <Events
              className="mb-3"
              cardTitle="Events"
              events={events.slice(2, 5)}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
