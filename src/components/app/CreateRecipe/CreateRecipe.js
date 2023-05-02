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
import { Timestamp, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { OmnifoodServer } from 'config';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";

const CreateRecipe = () => {
  const storage = getStorage();
  const [editorKey, setEditorKey] = useState(Date.now());
  const { userInfo, handleRecipeInfoData, loading, handleCreatedRecipesData, handleCreatedRecipesLoading } = useContext(AppContext);
  const [submitLoading, setSubmitLoading] = useState(false)
  const { register, handleSubmit, setValue, formState: { errors }, control, watch, reset } = useForm({
    defaultValues: {
      strMeal: '',
      strSource: '',
      strInstructions: null,
      ingredientsData: [{ strIngredient: '', strMeasure: '' }],
      strArea: null,
      strCategory: null,
      strTags: null
    },
  });

  const onSubmit = async (data) => {
    setSubmitLoading(true)
    handleCreatedRecipesLoading(true)
    setEditorKey(Date.now());
    Promise.all(data.strRecipesImages.map((file) => {
      const userProfileAvatarRef = ref(storage, `${userInfo.userEmail}/Created_Recipe_Images/${data.strMeal}/${file.path}`);
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
              .catch(() => {
                setSubmitLoading(false)
                handleCreatedRecipesLoading(false)
                reject();
              });
          })
          .catch(() => {
            setSubmitLoading(false)
            handleCreatedRecipesLoading(false)
            reject();
          });
      });
    })).then(async (downloadUrls) => {
      let recipeCreatedObj = {
        ...data,
        idIngredient: uuidv4(),
        strRecipesImages: downloadUrls,
        createdOn: Timestamp.now(),
        authorName: userInfo.userName,
        authorEmail: userInfo.userEmail,
        authorUID: userInfo.uid,
        authorProfile: userInfo.userProfilePhoto
      }
      const dataRef = doc(OmnifoodServer, userInfo.userEmail, 'RecipeCreated')
      const RecipeCreatedSnap = await getDoc(dataRef);
      if (RecipeCreatedSnap.exists()) {
        await updateDoc(dataRef, { [recipeCreatedObj.strMeal]: recipeCreatedObj }, { capital: true }, { merge: true });
      } else {
        await setDoc(dataRef, { [recipeCreatedObj.strMeal]: recipeCreatedObj }, { capital: true }, { merge: true });
      }
      setRecipeCreated(recipeCreatedObj.authorEmail)
      setSubmitLoading(false)
      handleCreatedRecipesLoading(false)
      toast.success(`Recipe created successfully`, {
        theme: 'colored'
      });
    }).catch(() => {
      setSubmitLoading(false)
      handleCreatedRecipesLoading(false)
      setRecipeCreated(userInfo.userEmail)
    });
    reset()
  };

  const setRecipeCreated = async (email) => {
    const RecipeCreatedRef = doc(OmnifoodServer, email, 'RecipeCreated')
    const RecipeCreatedSnap = await getDoc(RecipeCreatedRef);
    if (RecipeCreatedSnap.exists()) {
      handleCreatedRecipesData(Object.values(RecipeCreatedSnap.data()))
    } else {
      handleCreatedRecipesData([])
    }
  }

  useEffect(() => {
    document.title = "Omnifood | Create Recipe";
    if (Object.keys(userInfo).length > 0) {
      setRecipeInfo()
    } else return
  }, [userInfo])

  const setRecipeInfo = async () => {
    const RecipeInfoRef = doc(OmnifoodServer, userInfo.userEmail, 'RecipeInfoData')
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
      {loading || submitLoading ? <Row className="g-0 w-100 h-100" >
        <Col xs={12} className='d-flex align-items-center justify-content-center' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          <Spinner animation="border" variant="success" size='sm' />
        </Col>
      </Row> : <Form onSubmit={handleSubmit(onSubmit)}>
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
            <RecipeUpload register={register} setValue={setValue} errors={errors} />
          </Col>
          <Col lg={4}>
            <div className="sticky-sidebar">
              <RecipeOtherInfo register={register} control={control} errors={errors} watch={watch} />
            </div>
          </Col>
          <Col>
            <RecipeFooter />
          </Col>
        </Row>
      </Form>}
      <ModalOtherInfoBody />
    </RecipeProvider>
  );
};

export default CreateRecipe;
