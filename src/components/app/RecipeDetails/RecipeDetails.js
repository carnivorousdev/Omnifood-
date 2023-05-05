import React from 'react';
import { useParams } from 'react-router';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import RecipeDetailsMedia from './RecipeDetailsMedia';
import RecipeDetailsMain from './RecipeDetailsMain';
import RecipeDetailsFooter from './RecipeDetailsFooter';
import { filter } from 'lodash';
import { useEffect, useState, useContext } from 'react';
import AppContext from 'context/Context';
import { doc, getDoc } from 'firebase/firestore';
import { OmnifoodServer } from 'config';
import { toast } from 'react-toastify';

const RecipeDetails = () => {
  const { recipeId } = useParams()
  const [filteredData, setFilterData] = useState({})
  const [recipeLoading, setRecipeLoading] = useState(false)
  const {
    userInfo
  } = useContext(AppContext);

  useEffect(() => {
    if (Object.keys(userInfo).length > 0) {
      setRecipeCreated()
    } else return
  }, [recipeId, userInfo])

  const setRecipeCreated = async () => {
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

  return (
    <>
      {recipeLoading ? <Row className="g-0 w-100 h-100">
        <Col xs={12} className='d-flex align-items-center justify-content-center' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          <Spinner animation="border" variant="warning" size='sm' />
        </Col>
      </Row> :
        <>
          {Object.keys(filteredData).length > 0 &&
            <Card className="mb-3">
              <Card.Body>
                <Row>
                  <Col lg={6} className="mb-4 mb-lg-0">
                    <RecipeDetailsMedia CreatedRecipe={filteredData} />
                  </Col>
                  <Col lg={6} as={Flex} direction="column">
                    <RecipeDetailsMain
                      CreatedRecipe={filteredData}
                      ToBemodifiedObj={filteredData}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <RecipeDetailsFooter
                      CreatedRecipe={filteredData}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          }
        </>
      }
    </>

  )
};

export default RecipeDetails;
