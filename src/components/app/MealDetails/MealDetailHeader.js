import React, { useEffect, useContext } from 'react';
import { Card, Row, Col, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import FalconLightBox from 'components/common/FalconLightBox';
import { Timestamp, deleteField, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { OmnifoodServer } from 'config';
import { toast } from 'react-toastify';
import { useState } from 'react';
import _ from 'lodash';
import AppContext from 'context/Context';
import { BsBookmarkStarFill } from 'react-icons/bs'

const MealDetailHeader = ({ lookUpdata }) => {
  const [bookMarkLoading, setBookMarkLoading] = useState(false)
  const [checkHeartColor, setHeartColor] = useState(false)
  const { handleBookMarksData, userInfo, loading } = useContext(AppContext);

  useEffect(() => {
    if (lookUpdata && Object.keys(userInfo).length > 0) {
      getDocument()
    } else return
  }, [lookUpdata, userInfo])

  const getDocument = async () => {
    const documentRef = doc(OmnifoodServer, userInfo.uid, 'Bookmarks-Data')
    const docSnap = await getDoc(documentRef);
    if (docSnap.exists()) {
      handleBookMarksData(Object.values(docSnap.data()))
      var result = _.findKey(docSnap.data(), { 'idMeal': lookUpdata.idMeal });
      if (result) {
        setHeartColor(true)
      } else {
        setHeartColor(false)
      }
    } else {
      handleBookMarksData(0)
      setHeartColor(false)
    }
  }

  const addToBookMark = async (data) => {
    const documentRef = doc(OmnifoodServer, userInfo.uid, 'Bookmarks-Data')
    data['dateModified'] = Timestamp.now()
    const docSnap = await getDoc(documentRef);
    if (docSnap.exists()) {
      await updateDoc(documentRef, {
        [data.idMeal]: data
      }, { capital: true }, { merge: true });
      toast.success(`Added to Bookmarks`, {
        theme: 'colored'
      });
      setBookMarkLoading(false)
      setHeartColor(true)
    } else {
      await setDoc(documentRef, {
        [data.idMeal]: data
      }, { capital: true }, { merge: true });
      toast.success(`Added to Bookmarks`, {
        theme: 'colored'
      });
      setBookMarkLoading(false)
      setHeartColor(true)
    }
    getDocument()
  }

  const removeFromBookMark = async (data) => {
    const documentRef = doc(OmnifoodServer, userInfo.uid, 'Bookmarks-Data')
    await updateDoc(documentRef, {
      [data.idMeal]: deleteField()
    });
    toast.warn(`Removed from Bookmarks`, {
      theme: 'colored'
    });
    setBookMarkLoading(false)
    setHeartColor(false)
    getDocument()
  }

  const checkAddToBookMark = async (lookUpdata) => {
    const docRef = doc(OmnifoodServer, userInfo.uid, 'Bookmarks-Data');
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
              <div className="fs--1">
                <h5 className="fs-0 text-capitalize">{lookUpdata.strMeal}</h5>
              </div>
            </Flex>
          </Col>
          <Col md="auto" className="mt-3 mt-md-0">
            {bookMarkLoading || loading ?
              <Spinner animation="border" variant="danger" size='sm' />
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
                  <BsBookmarkStarFill
                    className={`fs-3 cursor-pointer ${checkHeartColor ? 'text-danger' : 'text-700'}`}
                    onClick={() => {
                      setBookMarkLoading(true)
                      checkAddToBookMark(lookUpdata)
                    }} />
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
