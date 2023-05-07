import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import axios from 'axios';
import { toast } from 'react-toastify';
import Background from 'components/common/Background';
import video1 from 'assets/video/video-1.mp4'
import { useParams } from 'react-router-dom';
import Products from 'components/product/Products';

const Categories = () => {
    const [CategoryData, setCategoryData] = useState([])
    const [CategoryLoading, setCategoryLoading] = useState(false)
    const { category } = useParams();

    useEffect(() => {
        document.title = "Omnifood | Categories";
        setCategoryLoading(true)
        axios.get(process.env.REACT_APP_BASE_URL + `filter.php?c=${category}`)
            .then(res => {
                if (res.data.meals) {
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
            {CategoryLoading ? <Row className="g-0 w-100 h-100" >
                <Col xs={12} className='d-flex align-items-center justify-content-center' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                    <Spinner animation="border" variant="success" size='sm' />
                </Col>
            </Row> : <>
                <div className="position-relative light mb-3">
                    <Background video={[video1]} className="rounded-soft w-100" overlay={1} />
                    <div className="position-relative vh-25 d-flex flex-center">
                        <Flex className='align-items-center'>
                            <h4 className="fs-4 fw-bold text-warning ms-3"> {category}</h4>
                        </Flex>
                    </div>
                </div>
                {CategoryData.length > 0 && <Products ShowCaseData={CategoryData} />}
            </>}
        </>
    );
};

export default Categories;
