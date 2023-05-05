import classNames from 'classnames';
import React, { useContext, useState, useEffect } from 'react';
import { Button, Col, OverlayTrigger, Row, Tooltip, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BsBookmarkStarFill } from 'react-icons/bs'
import moment from 'moment';
import Avatar from 'components/common/Avatar';
import { MdEdit } from 'react-icons/md'
import AppContext from 'context/Context';
import _ from 'lodash';
import { Timestamp, deleteField, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { OmnifoodServer } from 'config';
import { toast } from 'react-toastify';
import Flex from 'components/common/Flex';

const RecipeDetailsMain = ({ ToBemodifiedObj, CreatedRecipe:
  { strCategory,
    createdOn,
    authorName,
    authorEmail,
    authorProfile,
    strTags,
    strMeal,
    strArea,
    idIngredient
  } }) => {
  const navigate = useNavigate()
  const [bookMarkLoading, setBookMarkLoading] = useState(false)
  const [checkHeartColor, setHeartColor] = useState(false)
  const { handleBookMarksData, userInfo, loading } = useContext(AppContext);

  useEffect(() => {
    if (idIngredient && Object.keys(userInfo).length > 0) {
      getDocument()
    } else return
  }, [idIngredient, userInfo])

  const getDocument = async () => {
    const documentRef = doc(OmnifoodServer, userInfo.uid, 'Bookmarks-Data')
    const docSnap = await getDoc(documentRef);
    if (docSnap.exists()) {
      handleBookMarksData(Object.values(docSnap.data()))
      var result = _.findKey(docSnap.data(), { 'idMeal': idIngredient });
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
    var result = _.findKey(docSnap.data(), { 'idMeal': idIngredient });
    if (docSnap.exists()) {
      var result = _.findKey(docSnap.data(), { 'idMeal': idIngredient });
      if (result) {
        removeFromBookMark(lookUpdata)
      } else {
        addToBookMark(lookUpdata)
      }
    } else {
      addToBookMark(lookUpdata)
    }
  }

  const createModifiedObj = () => {
    const strTagString = ToBemodifiedObj['strTags'].reduce((acc, obj) => {
      delete obj.value;
      const objValues = Object.values(obj);
      const objValuesString = objValues.join(',');
      return acc === '' ? objValuesString : `${acc},${objValuesString}`;
    }, '');
    const strAreaString = ToBemodifiedObj['strArea'].reduce((acc, obj) => {
      delete obj.value;
      const objValues = Object.values(obj);
      const objValuesString = objValues.join(',');
      return acc === '' ? objValuesString : `${acc},${objValuesString}`;
    }, '');
    const strCategoryString = ToBemodifiedObj['strCategory'].reduce((acc, obj) => {
      delete obj.value;
      const objValues = Object.values(obj);
      const objValuesString = objValues.join(',');
      return acc === '' ? objValuesString : `${acc},${objValuesString}`;
    }, '');
    // Conversion of Array of Object ToBemodifiedObj['ingredientsData'] into indiviual keys and values in a object format
    const allKeys = ToBemodifiedObj['ingredientsData'].reduce((acc, obj) => {
      return [...acc, ...Object.keys(obj)];
    }, []);
    const uniqueKeys = [...new Set(allKeys)];

    const ingredientsObject = uniqueKeys.reduce((acc, key) => {
      const values = ToBemodifiedObj['ingredientsData'].map(obj => obj[key]);
      const uniqueValues = [...new Set(values)];
      let subObject = {};
      for (let i = 0; i < uniqueValues.length; i++) {
        subObject[`${key}${i + 1}`] = uniqueValues[i] || '';
      }
      return { ...acc, ...subObject };
    }, {});

    let modifiedObj = {
      ...ingredientsObject,
      idMeal: ToBemodifiedObj.idIngredient,
      strMeal: ToBemodifiedObj.strMeal,
      strDrinkAlternate: null,
      strCategory: strCategoryString,
      strArea: strAreaString,
      strTags: strTagString,
      strInstructions: ToBemodifiedObj.strInstructions,
      strMealThumb: ToBemodifiedObj.strRecipesImages,
      dateModified: ToBemodifiedObj.createdOn,
      strCreativeCommonsConfirmed: null,
      strImageSource: null,
      strSource: null,
      strYoutube: ToBemodifiedObj.strSource
    }
    return modifiedObj
  }


  return (
    <>
      <h5>{strMeal}</h5>
      {strCategory && (
        <p className="fs--1 mb-2 d-block">
          {strCategory?.map((category, index) => (
            <Link
              to="#!"
              key={category.value}
              className={classNames('text-capitalize', {
                'ms-1': index > 0
              })}
            >
              {category.label}{strCategory.length - 1 == index ? '' : ','}
            </Link>
          ))}
        </p>
      )}
      <p className="fs--1 mb-1">
        <span>Created On:</span>
        <strong> {moment.unix(createdOn.seconds).format('DD-MMM-YYYY')}</strong>
      </p>
      <p className="fs--1">
        Author:{' '}
        <OverlayTrigger
          placement='right'
          overlay={
            <Tooltip>
              <Avatar
                size="4xl"
                className="avatar-profile"
                src={authorProfile}
                mediaClass="img-thumbnail shadow-sm"
              />
            </Tooltip>}>
          <strong className='text-capitalize text-700'>
            <Link
              to={`/profile/${authorName ? authorName : authorEmail}`}>
              {authorName}
            </Link>
          </strong>
        </OverlayTrigger>
      </p>
      {strTags && (
        <p className="fs--1 mb-1">
          <strong>
            Tags:
          </strong>
          {strTags?.map((tag, index) => (
            <Link
              to="#!"
              key={tag.value}
              className={classNames('text-capitalize', {
                'ms-2': index === 0,
                'ms-1': index > 0
              })}
            >
              {tag.label}{strTags.length - 1 == index ? '' : ','}
            </Link>
          ))}
        </p>
      )}
      {strArea && (
        <p className="fs--1 mb-3">
          <strong>
            Areas:
          </strong>
          {strArea?.map((area, index) => (
            <Link
              to="#!"
              key={area.value}
              className={classNames('text-capitalize', {
                'ms-2': index === 0,
                'ms-1': index > 0
              })}
            >
              {area.label}{strArea.length - 1 == index ? '' : ','}
            </Link>
          ))}
        </p>
      )}
      <Row>
        <Col xs="auto" className="pe-0">
          <OverlayTrigger
            key='top'
            placement='top'
            overlay={
              <Tooltip>
                {checkHeartColor ? 'Removed from Bookmark' : 'Add to Bookmark'}
              </Tooltip>
            }
          >
            <Button
              variant="falcon-danger"
              size="sm"
              onClick={() => {
                setBookMarkLoading(true)
                checkAddToBookMark(createModifiedObj())
              }}
              disabled={bookMarkLoading || loading}
            >
              <Flex alignItems='center'>
                {bookMarkLoading || loading ? <Spinner animation="border" variant="danger" size='sm' /> : <BsBookmarkStarFill
                  className={`fs-2 cursor-pointer ${checkHeartColor ? 'text-danger' : 'text-700'}`}
                />}
              </Flex>
            </Button>
          </OverlayTrigger>
        </Col>
        <Col xs="auto" className="px-2 px-md-3">
          <Button
            variant="falcon-warning"
            size="sm"
            onClick={() => {
              navigate(`/editRecipe/${strMeal}/${idIngredient}`)
             }}
          >
            <Flex alignItems='center'>
              <MdEdit
                className={`fs-2 cursor-pointer text-warning`}
              />
            </Flex>
          </Button>
        </Col>
      </Row>
    </>
  );
};


export default RecipeDetailsMain;
