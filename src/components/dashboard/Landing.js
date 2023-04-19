import PageHeader from 'components/common/PageHeader';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Spinner, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar, { AvatarGroup } from 'components/common/Avatar';
import user1 from '../../assets/img/team/1.jpg'
import user2 from '../../assets/img/team/2.jpg'
import user3 from '../../assets/img/team/3.jpg'
import user4 from '../../assets/img/team/4.jpg'
import user5 from '../../assets/img/team/5.jpg'
import user6 from '../../assets/img/team/6.jpg'
import user7 from '../../assets/img/team/7.jpg'
import user8 from '../../assets/img/team/8.jpg'
import user9 from '../../assets/img/team/9.jpg'
import user10 from '../../assets/img/team/10.jpg'
import generic1 from '../../assets/img/illustrations/corner-1.png'
import CountUp from 'react-countup';
import Flex from 'components/common/Flex';
import FalconLightBox from 'components/common/FalconLightBox';
import axios from 'axios';
import { toast } from 'react-toastify';
import Background from 'components/common/Background';
import { useMediaQuery, useTheme } from '@mui/material';
import video4 from '../../assets/video/video-4.mp4'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate()
  const [ShowCaseData, setShowCaseData] = useState([])
  const [ShowCaseLoading, setShowCaseLoading] = useState(false)
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
    setShowCaseLoading(true)
    axios.get(process.env.REACT_APP_BASE_URL + `search.php?f=${makeid(1)}`)
      .then(res => {
        if (res.data.meals) {
          setShowCaseLoading(false)
          setShowCaseData(res.data.meals)
        } else {
          setShowCaseLoading(false)
          setShowCaseData([])
        }

      }).catch(err => {
        setShowCaseLoading(false)
        toast.error(`${err.message}`, {
          theme: 'colored'
        });
      })
  }, [])


  return (
    <>
      {!isMatch ? <div className="position-relative light mb-3">
        <Background video={[video4]} className="rounded-soft w-100" overlay={1}/>
        <div className="position-relative vh-25 d-flex flex-center">
          <Flex className='align-items-center'>
            <AvatarGroup key='2xl' dense className='py-2'>
              <Avatar src={user1} size='2xl' />
              <Avatar src={user2} size='2xl' />
              <Avatar src={user3} size='2xl' />
              <Avatar src={user4} size='2xl' />
              <Avatar src={user5} size='2xl' />
              <Avatar src={user6} size='2xl' />
              <Avatar src={user7} size='2xl' />
              <Avatar src={user8} size='2xl' />
              <Avatar src={user9} size='2xl' />
              <Avatar src={user10} size='2xl' />
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
            <Avatar src={user7} size='2xl' />
            <Avatar src={user8} size='2xl' />
            <Avatar src={user9} size='2xl' />
            <Avatar src={user10} size='2xl' />
          </AvatarGroup>
        </Flex>
        <Flex className='align-items-center' wrap='wrap'>
          <h4 className="fs-2 fw-semi-bold text-warning me-1">
            <CountUp end={250000} duration={2.75} separator="," suffix="+" />
          </h4>
          <h4 className="fs-2 fw-medium text-700"> meals searched last year!</h4>
        </Flex>
      </PageHeader>}
      {ShowCaseLoading ? <Row className="g-0">
        <Col xs={12} className="w-100 h-100 my-3">
          <Flex className="align-items-center justify-content-center">
            <Spinner animation="border" variant="primary" />
          </Flex>
        </Col>
      </Row> : ShowCaseData.length > 0 &&
      <Card className="h-100 p-2">
        <Flex alignItems='strech' justifyContent='between' wrap='wrap'>
          {ShowCaseData.map((item) => (
            <Card key={item.idMeal} style={{ width: '20rem' }} className='flex-fill m-2'>
              <FalconLightBox image={item.strMealThumb}>
                <Card.Img src={item.strMealThumb} />
              </FalconLightBox>
              <Card.Body>
                <Card.Title as='h5'>
                  {item.strMeal}
                </Card.Title>
                <Card.Text>
                  <div>
                    <Link
                      to={`/category/${item.strCategory}`}>
                      <Badge pill bg="info" className="me-2">
                        {item.strCategory}
                      </Badge>
                    </Link>
                    {item.strArea.toString().toLowerCase() != 'unknown' && <Link
                      to={`/areas/${item.strArea}`}>
                      <Badge pill bg="success" className="me-2">
                        {item.strArea}
                      </Badge>
                    </Link>}

                  </div>
                </Card.Text>
                <Button variant="outline-warning" size="sm" onClick={() => { navigate(`/mealdetails/${item.idMeal}`) }}>
                  Detailed view
                  <FontAwesomeIcon icon="chevron-right" className="ms-1 fs--2" />
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Flex>
      </Card>}
    </>
  );
};

export default Landing;
