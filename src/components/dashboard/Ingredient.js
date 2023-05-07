import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import axios from 'axios';
import { toast } from 'react-toastify';
import Background from 'components/common/Background';
import video2 from 'assets/video/video-2.mp4'
import { useParams } from 'react-router-dom';
import Products from 'components/product/Products';

const Ingredients = () => {
    const [IngredientData, setIngredientData] = useState([])
    const [IngredientLoading, setIngredientLoading] = useState(false)
    const { ingredient } = useParams();

    useEffect(() => {
        document.title = "Omnifood | Ingredients";
        setIngredientLoading(true)
        axios.get(process.env.REACT_APP_BASE_URL + `filter.php?i=${ingredient}`)
            .then(res => {
                if (res.data.meals) {
                    setIngredientLoading(false)
                    setIngredientData(res.data.meals)
                } else {
                    setIngredientLoading(false)
                    setIngredientData([])
                    toast.warning(`Currently no meals found in ${ingredient}`, {
                        theme: 'colored'
                    });
                }
            }).catch(err => {
                setIngredientLoading(false)
                toast.error(`${err.message}`, {
                    theme: 'colored'
                });
            })
    }, [ingredient])

    return (
        <>
            {IngredientLoading ? <Row className="g-0 w-100 h-100" >
                <Col xs={12} className='d-flex align-items-center justify-content-center' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                    <Spinner animation="border" variant="success" size='sm' />
                </Col>
            </Row> : <>
                <div className="position-relative light mb-3">
                    <Background video={[video2]} className="rounded-soft w-100" overlay={1} />
                    <div className="position-relative vh-25 d-flex flex-center">
                        <Flex className='align-items-center'>
                            <h4 className="fs-4 fw-bold text-danger ms-3"> {ingredient}</h4>
                        </Flex>
                    </div>
                </div>
                {IngredientData.length > 0 && <Products ShowCaseData={IngredientData} />}
            </>}
        </>
    );
};

export default Ingredients;
