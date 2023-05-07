import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import axios from 'axios';
import { toast } from 'react-toastify';
import Background from 'components/common/Background';
import video3 from 'assets/video/video-3.mp4'
import { useParams } from 'react-router-dom';
import Products from 'components/product/Products';

const Areas = () => {
    const [AreaData, setAreaData] = useState([])
    const [AreaLoading, setAreaLoading] = useState(false)
    const { areas } = useParams();

    useEffect(() => {
        document.title = "Omnifood | Areas";
        setAreaLoading(true)
        axios.get(process.env.REACT_APP_BASE_URL + `filter.php?a=${areas}`)
            .then(res => {
                if (res.data.meals) {
                    setAreaLoading(false)
                    setAreaData(res.data.meals)
                } else {
                    setAreaLoading(false)
                    setAreaData([])
                    toast.warning(`Currently no meals found in ${areas}`, {
                        theme: 'colored'
                    });
                }
            }).catch(err => {
                setAreaLoading(false)
                toast.error(`${err.message}`, {
                    theme: 'colored'
                });
            })
    }, [areas])

    return (
        <>
            {AreaLoading ? <Row className="g-0 w-100 h-100" >
                <Col xs={12} className='d-flex align-items-center justify-content-center' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                    <Spinner animation="border" variant="success" size='sm' />
                </Col>
            </Row> : <>
                <div className="position-relative light mb-3">
                    <Background video={[video3]} className="rounded-soft w-100" overlay={1} />
                    <div className="position-relative vh-25 d-flex flex-center">
                        <Flex className='align-items-center'>
                            <h4 className="fs-4 fw-bold text-warning ms-3"> {areas}</h4>
                        </Flex>
                    </div>
                </div>
                {AreaData.length > 0 && <Products ShowCaseData={AreaData} />}
            </>}
        </>
    );
};

export default Areas;
