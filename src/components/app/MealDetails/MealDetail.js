import React from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Fragment } from 'react';
import { toast } from 'react-toastify';
import MealDetailHeader from './MealDetailHeader';
import MealDetailContent from './MealDetailContent';
import MealDetailAside from './MealDetailAside';


const MealDetail = () => {
  const { detailedId } = useParams();
  const [lookUpdata, setLookupData] = useState([])
  const [lookUpdataLoading, setLookUpdataLoading] = useState(false)

  useEffect(() => {
    document.title = "Omnifood | Meal Details";
    setLookUpdataLoading(true)
    axios.get(process.env.REACT_APP_BASE_URL + `lookup.php?i=${detailedId}`)
      .then(res => {
        if (res.data.meals) {
          setLookUpdataLoading(false)
          setLookupData(res.data.meals)
        } else {
          setLookUpdataLoading(false)
          setLookupData([])
        }
      }).catch(err => {
        setLookUpdataLoading(false)
        toast.error(`${err.message}`, {
          theme: 'colored'
        });
      })
  }, [detailedId])

  return (
    <Fragment>
      {lookUpdataLoading ? <Row className="g-0 w-100 h-100" >
        <Col xs={12} className='d-flex align-items-center justify-content-center' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          <Spinner animation="border" variant="success" size='sm' />
        </Col>
      </Row> : <> <MealDetailHeader lookUpdata={lookUpdata.length > 0 ? lookUpdata[0] : null} />
        <Row className="g-3">
          <Col lg={8}>
            <MealDetailContent lookUpdata={lookUpdata.length > 0 ? lookUpdata[0] : null} />
          </Col>
          <Col lg={4}>
            <MealDetailAside lookUpdata={lookUpdata.length > 0 ? lookUpdata[0] : null} />
          </Col>
        </Row></>}
    </Fragment>
  );
};

export default MealDetail;
