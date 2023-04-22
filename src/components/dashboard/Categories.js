import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from 'components/common/Flex';
import FalconLightBox from 'components/common/FalconLightBox';
import axios from 'axios';
import { toast } from 'react-toastify';
import Background from 'components/common/Background';
import video1 from '../../assets/video/video-1.mp4'
import { useNavigate, useParams } from 'react-router-dom';

const Categories = () => {
    const navigate = useNavigate()
    const [CategoryData, setCategoryData] = useState([])
    const [CategoryLoading, setCategoryLoading] = useState(false)
    const { category } = useParams();

    useEffect(() => {
        document.title = "Omnifood | Categories";
        setCategoryLoading(true)
        axios.get(process.env.REACT_APP_BASE_URL + `filter.php?c=${category}`)
            .then(res => {
                if (res.data.meals.length > 0) {
                    setCategoryLoading(false)
                    setCategoryData(res.data.meals)
                } else {
                    setCategoryLoading(false)
                    setCategoryData([])
                    toast.warning(`Currently no meals found for this ${category}`, {
                        theme: 'colored'
                    });
                }
            }).catch(err => {
                setCategoryLoading(false)
                toast.error(`${err.message}`, {
                    theme: 'colored'
                });
            })
    }, [category])


    return (
        <>
        {CategoryLoading?<Row className="g-0 w-100 h-100" >
          <Col xs={12} className='d-flex align-items-center justify-content-center' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
            <Spinner animation="border" variant="success" size='sm'/>
          </Col>
        </Row>:<>
            <div className="position-relative light mb-3">
                <Background video={[video1]} className="rounded-soft w-100" overlay={1}/>
                <div className="position-relative vh-25 d-flex flex-center">
                    <Flex className='align-items-center'>
                        <h4 className="fs-4 fw-bold text-warning ms-3"> {category}</h4>
                    </Flex>
                </div>
            </div>
            {CategoryData.length > 0 &&
            <Card className="h-100 p-2">
                <Flex alignItems='strech' justifyContent='between' wrap='wrap'>
                    {CategoryData.map((item) => (
                        <Card key={item.idMeal} style={{ width: '20rem' }} className='flex-fill m-2'>
                            <FalconLightBox image={item.strMealThumb}>
                                <Card.Img src={item.strMealThumb} />
                            </FalconLightBox>
                            <Card.Body>
                                <Card.Title as='h5'>
                                    {item.strMeal}
                                </Card.Title>
                                <Button variant="outline-warning" size="sm" onClick={() => { navigate(`/mealdetails/${item.idMeal}`) }}>
                                    Detailed view
                                    <FontAwesomeIcon icon="chevron-right" className="ms-1 fs--2" />
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Flex>
            </Card>}
        </>}
        </>
    );
};

export default Categories;
