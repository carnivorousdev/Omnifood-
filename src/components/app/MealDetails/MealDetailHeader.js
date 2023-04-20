import React, { useEffect } from 'react';
import { Card, Row, Col, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import FalconLightBox from 'components/common/FalconLightBox';
import { Timestamp, deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { firestoreAuth } from 'config'
import { OmnifoodServer } from 'config';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';

const MealDetailHeader = ({ lookUpdata }) => {
  const [loading, setLoading] = useState(false)
  const [checkHeartColor, setHeartColor] = useState(false)

  useEffect(() => {
    if (lookUpdata) {
      onAuthStateChanged(firestoreAuth, async (user) => {
        if (user) {
          const docRef = doc(OmnifoodServer, "Users", user.email);
          const docSnap = await getDoc(docRef);
          var result = _.findKey(docSnap.data(), { 'idMeal': lookUpdata.idMeal });
          if (result) {
            setHeartColor(true)
          } else {
            setHeartColor(false)
          }
        } else return
      });
    } else return
  }, [lookUpdata])

  const addToBookMark = (data) => {
    onAuthStateChanged(firestoreAuth, async (user) => {
      if (user) {
        try {
          const UserRef = doc(OmnifoodServer, "Users", user.email)
          data['dateModified'] = Timestamp.now()
          await updateDoc(UserRef, {
            ['Liked-Item' + data.idMeal]: data
          }, { capital: true }, { merge: true });
          toast.success(`Added to Bookmarks`, {
            theme: 'colored'
          });
          setLoading(false)
          setHeartColor(true)
        } catch (err) {
          toast.error(`${err.message}`, {
            theme: 'colored'
          });
          setLoading(false)
        }
      } else return
    });
  }

  const removeFromBookMark = (data) => {
    onAuthStateChanged(firestoreAuth, async (user) => {
      if (user) {
        try {
          const UserRef = doc(OmnifoodServer, "Users", user.email)
          await updateDoc(UserRef, {
            ['Liked-Item' + data.idMeal]: deleteField()
          });
          toast.success(`Removed from Bookmarks`, {
            theme: 'colored'
          });
          setLoading(false)
          setHeartColor(false)
        } catch (err) {
          toast.error(`${err.message}`, {
            theme: 'colored'
          });
          setLoading(false)
        }
      } else return
    });
  }

  const checkAddToBookMark = (lookUpdata) => {
    onAuthStateChanged(firestoreAuth, async (user) => {
      if (user) {
        const docRef = doc(OmnifoodServer, "Users", user.email);
        const docSnap = await getDoc(docRef);
        var result = _.findKey(docSnap.data(), { 'idMeal': lookUpdata.idMeal });
        if (result) {
          removeFromBookMark(lookUpdata)
        } else {
          addToBookMark(lookUpdata)
        }
      } else return
    });
  }
  return (
    <Card className="p-0 mb-3">
      {lookUpdata && (
        <FalconLightBox image={lookUpdata.strMealThumb}>
          <img className="card-img-top" src={lookUpdata.strMealThumb} alt={lookUpdata.strMeal} />
        </FalconLightBox>
      )}
      {lookUpdata && <Card.Body className="overflow-hidden">
        <Row className="flex-center">
          <Col>
            <Flex>
              <div className="fs--1 ms-2 flex-1">
                <h5 className="fs-0 text-capitalize">{lookUpdata.strMeal}</h5>
              </div>
            </Flex>
          </Col>
          <Col md="auto" className="mt-4 mt-md-0">
            {loading ?
              <Spinner animation="border" variant="primary" size='sm' />
              :
              <OverlayTrigger
                key='top'
                placement='top'
                overlay={
                  <Tooltip>
                    {checkHeartColor ? 'Removed from Bookmark' : 'Add to Bookmark'}
                  </Tooltip>
                }
              >
                <p className='m-0 p-0'>
                  <FontAwesomeIcon
                    className={`fs-3 cursor-pointer ${checkHeartColor ? 'text-danger' : 'text-700'}`}
                    icon="heart"
                    onClick={() => {
                      setLoading(true)
                      checkAddToBookMark(lookUpdata)
                    }}
                  />
                </p>

              </OverlayTrigger>
            }
          </Col>
        </Row>
      </Card.Body>}
    </Card>
  );
};

export default MealDetailHeader;
