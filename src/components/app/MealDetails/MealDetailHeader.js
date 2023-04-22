import React, { useEffect } from 'react';
import { Card, Row, Col, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import FalconLightBox from 'components/common/FalconLightBox';
import { Timestamp, deleteField, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
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
      getDocument()
    } else return
  }, [lookUpdata])

  const getDocument = async () => {
    const SignedInEmail = JSON.parse(localStorage.getItem('SignedInEmail'))
    const documentRef = doc(OmnifoodServer, SignedInEmail, 'Bookmarks-Data')
    const docSnap = await getDoc(documentRef);
    if (docSnap.exists()) {
      var result = _.findKey(docSnap.data(), { 'idMeal': lookUpdata.idMeal });
      if (result) {
        setHeartColor(true)
      } else {
        setHeartColor(false)
      }
    } else {
      setHeartColor(false)
    }
  }

  const addToBookMark = async (data) => {
    const SignedInEmail = JSON.parse(localStorage.getItem('SignedInEmail'))
    const documentRef = doc(OmnifoodServer, SignedInEmail, 'Bookmarks-Data')
    data['dateModified'] = Timestamp.now()
    const docSnap = await getDoc(documentRef);
    if (docSnap.exists()) {
      await updateDoc(documentRef, {
        [data.idMeal]: data
      }, { capital: true }, { merge: true });
      toast.success(`Added to Bookmarks`, {
        theme: 'colored'
      });
      setLoading(false)
      setHeartColor(true)
    } else {
      await setDoc(documentRef, {
        [data.idMeal]: data
      }, { capital: true }, { merge: true });
      toast.success(`Added to Bookmarks`, {
        theme: 'colored'
      });
      setLoading(false)
      setHeartColor(true)
    }
  }

  const removeFromBookMark = async (data) => {
    const SignedInEmail = JSON.parse(localStorage.getItem('SignedInEmail'))
    const documentRef = doc(OmnifoodServer, SignedInEmail, 'Bookmarks-Data')
    await updateDoc(documentRef, {
      [data.idMeal]: deleteField()
    });
    toast.warn(`Removed from Bookmarks`, {
      theme: 'colored'
    });
    setLoading(false)
    setHeartColor(false)
  }

  const checkAddToBookMark = async (lookUpdata) => {
    const SignedInEmail = JSON.parse(localStorage.getItem('SignedInEmail'))
    const docRef = doc(OmnifoodServer, SignedInEmail, 'Bookmarks-Data');
    const docSnap = await getDoc(docRef);
    var result = _.findKey(docSnap.data(), { 'idMeal': lookUpdata.idMeal });
    if (docSnap.exists()) {
      var result = _.findKey(docSnap.data(), { 'idMeal': lookUpdata.idMeal });
      if (result) {
        removeFromBookMark(lookUpdata)
      } else {
        addToBookMark(lookUpdata)
      }
    } else {
      addToBookMark(lookUpdata)
    }
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
