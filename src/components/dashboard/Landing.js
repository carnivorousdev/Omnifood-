import PageHeader from 'components/common/PageHeader';
import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import Avatar, { AvatarGroup } from 'components/common/Avatar';
import CountUp from 'react-countup';
import Flex from 'components/common/Flex';
import axios from 'axios';
import Background from 'components/common/Background';
import { useMediaQuery, useTheme } from '@mui/material';
import video4 from 'assets/video/video-4.mp4'
import AppContext from 'context/Context';
import { useContext } from 'react';
import Products from 'components/product/Products';

const Landing = () => {
  const generic1 = 'https://i.ibb.co/pPCDTst/corner-1.webp'
  const user1 = 'https://i.ibb.co/0GM1hG8/1.webp'
  const user2 = 'https://i.ibb.co/pQSkRZY/2.webp'
  const user3 = 'https://i.ibb.co/fYSJg8J/3.webp'
  const user4 = 'https://i.ibb.co/nw6NM2x/4.webp'
  const user5 = 'https://i.ibb.co/L04HG8C/5.webp'
  const user6 = 'https://i.ibb.co/HgWMvKH/6.webp'

  const [ShowCaseData, setShowCaseData] = useState([])
  const [ShowCaseLoading, setShowCaseLoading] = useState(false)

  const {
    loading,
  } = useContext(AppContext);

  const makeid = (length) => {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    document.title = "Omnifood | Dashboard";
    setDocument()
  }, [])

  const setDocument = () => {
    setShowCaseLoading(true)
    axios.get(process.env.REACT_APP_BASE_URL + `search.php?f=${makeid(1)}`)
      .then(async res => {
        if (res.data.meals) {
          setShowCaseLoading(false)
          setShowCaseData(res.data.meals)
        } else {
          setDocument()
        }
      }).catch(() => {
        setShowCaseLoading(false)
      })
  }

  return (
    <>
      {ShowCaseLoading || loading ? <Row className="g-0 w-100 h-100" >
        <Col xs={12} className='d-flex align-items-center justify-content-center' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          <Spinner animation="border" variant="success" size='sm' />
        </Col>
      </Row> :
        <>
          {!isMatch ? <div className="position-relative light mb-3">
            <Background video={[video4]} className="rounded-soft w-100" overlay={true} />
            <div className="position-relative vh-25 d-flex flex-center">
              <Flex className='align-items-center'>
                <AvatarGroup key='2xl' dense className='py-2'>
                  <Avatar src={user1} size='2xl' />
                  <Avatar src={user2} size='2xl' />
                  <Avatar src={user3} size='2xl' />
                  <Avatar src={user4} size='2xl' />
                  <Avatar src={user5} size='2xl' />
                  <Avatar src={user6} size='2xl' />
                </AvatarGroup>
                <h4 className="fs-2 fw-semi-bold text-warning ms-3 me-1">
                  <CountUp end={250000} duration={2.75} separator="," suffix="+" />
                </h4>
                <h4 className="fs-2 fw-medium text-white"> meals searched last year!</h4>
              </Flex>
            </div>
          </div> : <PageHeader
            title="A healthy meal delivered to your door, every single day"
            description="The smart 365-days-per-year food subscription that will make you eat healthy again. Tailored to your personal tastes and nutritional needs."
            className="mb-3"
            image={generic1}
          >
            <Flex className='align-items-center' wrap='wrap'>
              <AvatarGroup key='2xl' dense className='py-2'>
                <Avatar src={user1} size='2xl' />
                <Avatar src={user2} size='2xl' />
                <Avatar src={user3} size='2xl' />
                <Avatar src={user4} size='2xl' />
                <Avatar src={user5} size='2xl' />
                <Avatar src={user6} size='2xl' />
              </AvatarGroup>
            </Flex>
            <Flex className='align-items-center' wrap='wrap'>
              <h4 className="fs-2 fw-semi-bold text-warning me-1">
                <CountUp end={250000} duration={2.75} separator="," suffix="+" />
              </h4>
              <h4 className="fs-2 fw-medium text-700"> meals searched last year!</h4>
            </Flex>
          </PageHeader>}

          {ShowCaseData.length > 0 && <Products ShowCaseData={ShowCaseData} />}
        </>}
    </>
  );
};

export default Landing;
