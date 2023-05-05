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
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { useNavigate, useParams } from 'react-router-dom';
import { filter } from 'lodash';

const EditRecipe = () => {
  const navigate = useNavigate()
  const { recipeId } = useParams()
  const [filteredData, setFilterData] = useState({})
  const [recipeLoading, setRecipeLoading] = useState(false)
  const storage = getStorage();
  const [editorKey, setEditorKey] = useState(Date.now());
  const { userInfo, handleRecipeInfoData, handleCreatedRecipesData, handleCreatedRecipesLoading } = useContext(AppContext);
  const [submitLoading, setSubmitLoading] = useState(false)
  const { register, handleSubmit, setValue, formState: { errors }, control, watch } = useForm({
    mode: 'onBlur'
  });

  const onSubmit = async (data) => {
    setSubmitLoading(true)
    handleCreatedRecipesLoading(true)
    setEditorKey(Date.now());

    Promise.all(data.strRecipesImages.map((file) => {
      const userProfileAvatarRef = ref(storage, `${userInfo.userEmail}/Created_Recipe_Images/${data.strMeal}/${file.path}`);
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
      await updateDoc(dataRef, { [recipeCreatedObj.strMeal]: recipeCreatedObj }, { capital: true }, { merge: true });
      setRecipeEdited(recipeCreatedObj.authorEmail)
    }).catch((err) => {
      toast.error(`${err.message}`, {
        theme: 'colored'
      });
      handleCreatedRecipesLoading(false)
      setSubmitLoading(false)
    });
  };

  const setRecipeEdited = async (email) => {
    const RecipeCreatedRef = doc(OmnifoodServer, email, 'RecipeCreated')
    const RecipeCreatedSnap = await getDoc(RecipeCreatedRef);
    if (RecipeCreatedSnap.exists()) {
      handleCreatedRecipesData(Object.values(RecipeCreatedSnap.data()))
      handleCreatedRecipesLoading(false)
      setSubmitLoading(false)
      navigate(`/myRecipe/${filteredData.strMeal}/${recipeId}`)
    } else {
      handleCreatedRecipesLoading(false)
      setSubmitLoading(false)
      navigate(`/myRecipe/${filteredData.strMeal}/${recipeId}`)
    }
    toast.success(`Recipe edited successfully`, {
      theme: 'colored'
    });
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
                <RecipeUpload register={register} setValue={setValue} watch={watch} errors={errors}/>
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
