import React, { useContext } from 'react';
import { Row, Col, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import FalconLightBox from 'components/common/FalconLightBox';
import _ from 'lodash';
import AppContext from 'context/Context';
import { BsBookmarkStarFill } from 'react-icons/bs'
import BookMarkCheck from 'components/product/BookmarkCheck';
import FalconComponentCard from 'components/common/FalconComponentCard';

const MealDetailHeader = ({ lookUpdata }) => {
  const { loading } = useContext(AppContext);
  const {
    bookMarkLoading,
    checkHeartColor,
    checkAddToBookMark,
    setBookMarkLoading
  } = BookMarkCheck(lookUpdata);

  return (
    <FalconComponentCard className="h-100">
      <FalconComponentCard.Header noPreview>
        {lookUpdata && <Row className="flex-center">
          <Col>
            <Flex>
              <div>
                <h3 className="text-capitalize">{lookUpdata.strMeal}</h3>
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
        </Row>}
      </FalconComponentCard.Header>
      {lookUpdata && (
        <FalconLightBox image={lookUpdata.strMealThumb}>
          <img className="card-img-bottom" src={lookUpdata.strMealThumb} alt={lookUpdata.strMeal} />
        </FalconLightBox>
      )}
    </FalconComponentCard>
  );
};

export default MealDetailHeader;
