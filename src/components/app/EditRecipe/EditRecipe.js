import React, { useEffect, useContext } from 'react';
import { Col, Form, Row, Spinner } from 'react-bootstrap';
import { useForm, useFieldArray } from 'react-hook-form';
import RecipeHeader from './RecipeHeader';
import RecipeDetails from './RecipeDetails';
import RecipeOtherInfo from './RecipeOtherInfo';
import RecipeIngredients from './RecipeIngredients';
import RecipeUpload from './RecipeUpload';
import { RecipeProvider } from 'context/ReciepeProvider';
import { ModalOtherInfoBody } from './ModalOtherInfoBody';
import RecipeFooter from './RecipeFooter';
import AppContext from 'context/Context';
import { Timestamp, doc, getDoc, updateDoc } from 'firebase/firestore';
import { OmnifoodServer } from 'config';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { useNavigate, useParams } from 'react-router-dom';
import _, { filter } from 'lodash';

const EditRecipe = () => {
  const navigate = useNavigate()
  const { recipeId } = useParams()
  const [filteredData, setFilterData] = useState({})
  const [recipeLoading, setRecipeLoading] = useState(false)
  const storage = getStorage();
  const [editorKey, setEditorKey] = useState(Date.now());
  const { userInfo, handleRecipeInfoData, handleCreatedRecipesData, handleCreatedRecipesLoading, handleBookMarksData } = useContext(AppContext);
  const [submitLoading, setSubmitLoading] = useState(false)
  const { register, handleSubmit, setValue, formState: { errors }, control, watch } = useForm({
    mode: 'onBlur'
  });

  const onSubmit = async (data) => {
    setSubmitLoading(true)
    handleCreatedRecipesLoading(true)
    setEditorKey(Date.now());

    Promise.all(data.strRecipesImages.map((file) => {
      const userProfileAvatarRef = ref(storage, `${userInfo.uid}/Created_Recipe_Images/${data.strMeal}/${file.path}`);
      if (file.preview.startsWith("data:")) {
        return new Promise((resolve, reject) => {
          uploadString(userProfileAvatarRef, file.preview, 'data_url')
            .then(() => {
              getDownloadURL(userProfileAvatarRef)
                .then((url) => {
                  resolve(
                    {
                      preview: url,
                      size: file.size,
                      path: file.path,
                      type: file.type
                    });
                })
                .catch((err) => {
                  reject();
                });
            })
            .catch((error) => {
              reject();
            });
        });
      } else return {
        preview: file.preview,
        size: file.size,
        path: file.path,
        type: file.type
      }
    })).then(async (downloadUrls) => {
      let recipeCreatedObj = {
        ...data,
        idIngredient: recipeId,
        strRecipesImages: downloadUrls,
        createdOn: Timestamp.now(),
        authorName: userInfo.userName,
        authorEmail: userInfo.userEmail,
        authorUID: userInfo.uid,
        authorProfile: userInfo.userProfilePhoto
      }
      const dataRef = doc(OmnifoodServer, userInfo.uid, 'RecipeCreated')
      await updateDoc(dataRef, { [recipeCreatedObj.idIngredient]: recipeCreatedObj }, { capital: true }, { merge: true });
      setRecipeEdited(recipeCreatedObj, recipeCreatedObj.authorUID)
    }).catch((err) => {
      toast.error(`${err.message}`, {
        theme: 'colored'
      });
      handleCreatedRecipesLoading(false)
      setSubmitLoading(false)
    });
  };

  const setRecipeEdited = async (recipeCreatedObj, uid) => {
    const RecipeCreatedRef = doc(OmnifoodServer, uid, 'RecipeCreated')
    const RecipeCreatedSnap = await getDoc(RecipeCreatedRef);
    if (RecipeCreatedSnap.exists()) {
      handleCreatedRecipesData(Object.values(RecipeCreatedSnap.data()))
    }
    checkAddToBookMark(recipeCreatedObj)
  }

  const updateBookMark = async (data) => {
    const documentRef = doc(OmnifoodServer, data.authorUID, 'Bookmarks-Data')
    await updateDoc(documentRef, {
      [recipeId]: data
    }, { capital: true }, { merge: true });
    getDocument(data.authorUID)
  }

  const getDocument = async (uid) => {
    const documentRef = doc(OmnifoodServer, uid, 'Bookmarks-Data')
    const docSnap = await getDoc(documentRef);
    if (docSnap.exists()) {
      handleBookMarksData(Object.values(docSnap.data()))
    } else {
      handleBookMarksData([])
    }
    handleCreatedRecipesLoading(false)
    setSubmitLoading(false)
    navigate(`/myRecipe/${filteredData.strMeal}/${recipeId}`)
    toast.success(`Recipe edited successfully`, {
      theme: 'colored'
    });
  }

  const checkAddToBookMark = async (lookUpdata) => {
    const docRef = doc(OmnifoodServer, lookUpdata.authorUID, 'Bookmarks-Data');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      var result = _.findKey(docSnap.data(), { 'idMeal': recipeId });
      if (result) {
        updateBookMark(createModifiedObj(lookUpdata))
      } else return
    } else return
  }


  const createModifiedObj = (ToBemodifiedObj) => {
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
      idMeal: recipeId,
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
      strYoutube: ToBemodifiedObj.strSource,
      authorUID: ToBemodifiedObj.authorUID,
    }
    return modifiedObj
  }


  useEffect(() => {
    if (Object.keys(userInfo).length > 0) {
      getRecipeDetails()
    } else return
  }, [recipeId, userInfo])

  const getRecipeDetails = async () => {
    setRecipeLoading(true)
    const RecipeCreatedRef = doc(OmnifoodServer, userInfo.uid, 'RecipeCreated')
    const RecipeCreatedSnap = await getDoc(RecipeCreatedRef);
    if (RecipeCreatedSnap.exists()) {
      const filterObj = filter(Object.values(RecipeCreatedSnap.data()), (data) => data.idIngredient === recipeId);
      let updateUserInfo = filterObj.map((ele) => {
        return {
          ...ele,
          authorName: userInfo.userName,
          authorEmail: userInfo.userEmail,
          authorProfile: userInfo.userProfilePhoto
        }
      })
      setValue('strMeal', updateUserInfo[0].strMeal);
      setValue('strSource', updateUserInfo[0].strSource);
      setValue('strInstructions', updateUserInfo[0].strInstructions);
      setValue('ingredientsData', updateUserInfo[0].ingredientsData);
      setValue('strCategory', updateUserInfo[0].strCategory)
      setValue('strArea', updateUserInfo[0].strArea)
      setValue('strTags', updateUserInfo[0].strTags)
      setValue('mealType', updateUserInfo[0].mealType)
      setValue('strRecipesImages', updateUserInfo[0].strRecipesImages)
      setFilterData(updateUserInfo[0])
      setRecipeLoading(false)
    } else {
      setFilterData({})
      toast.error('Some error occured. Please try after some time', {
        theme: 'colored'
      });
      setRecipeLoading(false)
    }
  }
  useEffect(() => {
    document.title = "Omnifood | Edit Recipe";
    if (Object.keys(userInfo).length > 0) {
      setRecipeInfo()
    } else return
  }, [userInfo])

  const setRecipeInfo = async () => {
    const RecipeInfoRef = doc(OmnifoodServer, userInfo.uid, 'RecipeInfoData')
    const RecipeInfoSnap = await getDoc(RecipeInfoRef);
    if (RecipeInfoSnap.exists()) {
      handleRecipeInfoData(RecipeInfoSnap.data())
    } else {
      handleRecipeInfoData({
        'RecipeInfoData': {
          CategoryData: [],
          AreaData: [],
          TagData: []
        }
      })
    }
  }


  return (
    <RecipeProvider>
      {submitLoading || recipeLoading ? <Row className="g-0 w-100 h-100" >
        <Col xs={12} className='d-flex align-items-center justify-content-center' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          <Spinner animation="border" variant="success" size='sm' />
        </Col>
      </Row> :
        <>
          {Object.keys(filteredData).length > 0 && <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="g-3">
              <Col xs={12}>
                <RecipeHeader />
              </Col>
              <Col lg={8}>
                <RecipeDetails register={register} setValue={setValue} watch={watch} errors={errors} control={control} editorKey={editorKey} />
                <RecipeIngredients
                  register={register}
                  control={control}
                  errors={errors}
                  useFieldArray={useFieldArray}
                />
                <RecipeUpload register={register} setValue={setValue} watch={watch} errors={errors} />
              </Col>
              <Col lg={4}>
                <div className="sticky-sidebar">
                  <RecipeOtherInfo register={register} control={control} errors={errors} watch={watch} />
                </div>
              </Col>
              <Col>
                <RecipeFooter navigate={navigate} filteredData={filteredData} />
              </Col>
            </Row>
          </Form>}
        </>
      }
      <ModalOtherInfoBody />
    </RecipeProvider>
  );
};

export default EditRecipe;
