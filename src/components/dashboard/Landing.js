import PageHeader from 'components/common/PageHeader';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Spinner, Badge, Modal, Form, OverlayTrigger, Tooltip, Image, Dropdown } from 'react-bootstrap';
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
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { OmnifoodServer } from 'config';
import { useForm } from 'react-hook-form';
import { getSize } from 'helpers/utils';
import { useDropzone } from 'react-dropzone';
import CardDropdown from 'components/common/CardDropdown';
import cloudUpload from '../../assets/img/icons/cloud-upload.svg';
import { deleteObject, getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";

const Landing = () => {
  const navigate = useNavigate()
  const [ShowCaseData, setShowCaseData] = useState([])
  const [ShowCaseLoading, setShowCaseLoading] = useState(false)
  const [files, setFiles] = useState([]);
  const [UpdateLoader, setUpdateLoader] = useState(false)
  const [avatarLoader, setAvatarLoader] = useState(false)
  const [StorageData, setStorageData] = useState({
    firstName: null,
    lastName: null,
    heading: null,
    phone: null
  })
  const storage = getStorage();

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const stringFiles = [];
      if (acceptedFiles.length) {
        acceptedFiles.map(file => {
          const userProfileAvatar = ref(storage, 'Omnifood Inc./' + StorageData.userEmail);
          setAvatarLoader(true)
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            uploadString(userProfileAvatar, reader.result, 'data_url').then(() => {
              setAvatarLoader(false)
              setValue('avatar', reader.result);
              setValue('fileName', file.name);

              stringFiles.push({
                preview: reader.result,
                size: file.size,
                path: file.path,
                type: file.type
              });
              setFiles([...stringFiles])
            }).catch(() => {
              setAvatarLoader(false)
            })
          };
          return true;
        });
      }
    },
  });

  const handleRemove = path => {
    setAvatarLoader(true)
    const deleteRef = ref(storage, 'Omnifood Inc./' + StorageData.userEmail);
    deleteObject(deleteRef).then(() => {
      setFiles(files.filter(file => file.path !== path));
      setAvatarLoader(false)
    }).catch((error) => {
      toast.error(`${error.message}`, {
        theme: 'colored'
      });
      setAvatarLoader(false)
    });
  };


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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

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
        const SignedInEmail = JSON.parse(localStorage.getItem('SignedInEmail')) 
        if (res.data.meals) {
          const documentRef = doc(OmnifoodServer, SignedInEmail, 'User-Data')
          const docSnap = await getDoc(documentRef);
          setStorageData(docSnap.data())
          setValue('firstName', docSnap.data().firstName);
          setValue('lastName', docSnap.data().lastName);
          setValue('phone', docSnap.data().phoneNumber);
          setValue('heading', docSnap.data().profileHeading);
          setShowCaseLoading(false)
          setShowCaseData(res.data.meals)
        } else {
          const documentRef = doc(OmnifoodServer, SignedInEmail, 'User-Data')
          const docSnap = await getDoc(documentRef);
          setStorageData(docSnap.data())
          setValue('firstName', docSnap.data().firstName);
          setValue('lastName', docSnap.data().lastName);
          setValue('phone', docSnap.data().phoneNumber);
          setValue('heading', docSnap.data().profileHeading);
          setShowCaseLoading(false)
          setShowCaseData([])
        }
      }).catch(err => {
        setShowCaseLoading(false)
        toast.error(`${err.message}`, {
          theme: 'colored'
        });
      })
  }


  const onSubmit = data => {
    setUpdateLoader(true)
    let fullName = data.firstName.trim() + ' ' + data.lastName.trim()
    getDownloadURL(ref(storage, 'Omnifood Inc./' + StorageData.userEmail))
      .then(async (url) => {
        const documentRef = doc(OmnifoodServer, StorageData.userEmail, 'User-Data')
        let payload = {
          firstName: data.firstName,
          lastName: data.lastName,
          userName: fullName,
          userProfilePhoto: url,
          phoneNumber: Number(data.phone),
          profileHeading: data.heading
        }
        await updateDoc(documentRef, payload, { capital: true }, { merge: true });
        setUpdateLoader(false)
        navigate(0)
      })
      .catch((err) => {
        setUpdateLoader(false)
        toast.error(`${err.message}`, {
          theme: 'colored'
        });
      });
  };
  return (
    <>
      {ShowCaseLoading ? <Row className="g-0 w-100 h-100" >
        <Col xs={12} className='d-flex align-items-center justify-content-center' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          <Spinner animation="border" variant="success" size='sm' />
        </Col>
      </Row> :
        <>
          {StorageData.firstName && StorageData.lastName && StorageData.profileHeading ?
            '' : <Modal show={true} className="mt-4" backdrop="static"
              keyboard={false} aria-labelledby="contained-modal-title-vcenter"
              centered>
              <Modal.Header className="bg-shape modal-shape-header px-4 position-relative">
                <div className="position-relative z-index-1 light">
                  <h4 className="mb-0 text-white" id="authentication-modal-label">
                    Update Profile
                  </h4>
                  <p className="fs--1 mb-0 text-white">
                    Please provide details for your account
                  </p>
                </div>
              </Modal.Header>
              <Modal.Body>
                <Form noValidate
                  onSubmit={handleSubmit(onSubmit)}
                  role="form">
                  <Row className="mb-3 g-3">
                    {<Form.Group as={Col} lg={6} controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        isInvalid={!!errors.firstName}
                        {...register('firstName', {
                          required: '*Required'
                        })}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName && errors.firstName.message}
                      </Form.Control.Feedback>
                    </Form.Group>}

                    <Form.Group as={Col} lg={6} controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        isInvalid={!!errors.lastName}
                        {...register('lastName', {
                          required: '*Required'
                        })}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName && errors.lastName.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3 g-3">
                    <Form.Group as={Col} lg={6} controlId="email">
                      <Form.Label>Email</Form.Label>
                      <OverlayTrigger
                        key='top'
                        placement='top'
                        overlay={
                          <Tooltip className='w-auto'>
                            {JSON.parse(localStorage.getItem('SignedInEmail'))}
                          </Tooltip>
                        }
                      >
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          value={JSON.parse(localStorage.getItem('SignedInEmail'))}
                          disabled
                          className='text-truncate'
                          name="email"
                        />
                      </OverlayTrigger>
                    </Form.Group>
                    <Form.Group as={Col} lg={6} controlId="phone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Phone"
                        name="phone"
                        isInvalid={!!errors.phone}
                        {...register('phone', {
                          required: '*Required',
                          pattern: {
                            value:
                              /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                            message: 'Invalid'
                          }
                        })
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone && errors.phone.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3 g-3">
                    <Form.Group as={Col} lg={12} controlId="heading">
                      <Form.Label>Profile Heading</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Profile Heading"
                        name="heading"
                        isInvalid={!!errors.heading}
                        {...register('heading', {
                          required: '*Required'
                        })}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.heading && errors.heading.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3 g-3">
                    <div {...getRootProps({ className: 'dropzone-area py-3' })}>
                      <input {...getInputProps()} />
                      <Flex justifyContent="center">
                        <img src={cloudUpload} alt="" width={25} className="me-2" />
                        <p className="fs-0 mb-0 text-700">Upload profile photo</p>
                      </Flex>
                    </div>

                    {avatarLoader ? <Row className="g-0">
                      <Col xs={12} className="w-100 h-100 my-3">
                        <Flex className="align-items-center justify-content-center">
                          <Spinner animation="border" variant="success" size='sm' />
                        </Flex>
                      </Col>
                    </Row> : <div className="mt-3">
                      {files.map(file => (
                        <Flex
                          alignItems="center"
                          className="py-2 border-bottom btn-reveal-trigger"
                          key={file.path}
                        >
                          <Image rounded width={40} height={40} src={file.preview} alt={file.path} />
                          <Flex justifyContent="between" alignItems="center" className="ms-3 flex-1">
                            <div>
                              <h6>{file.path}</h6>
                              <Flex className="position-relative" alignItems="center">
                                <p className="mb-0 fs--1 text-400 line-height-1">
                                  <strong>
                                    {getSize(file.size)}
                                  </strong>
                                </p>
                              </Flex>
                            </div>
                          </Flex>

                          <CardDropdown>
                            <div className="py-2">
                              <Dropdown.Item className="text-danger" onClick={() => handleRemove(file.path)}>
                                Remove
                              </Dropdown.Item>
                            </div>
                          </CardDropdown>
                        </Flex>
                      ))}
                    </div>}
                  </Row>

                  <div className="text-center w-100">
                    {UpdateLoader ? <Spinner animation="border" variant="success" size='sm' /> : <Button variant="outline-info" type="submit"
                      disabled={avatarLoader}>
                      Update
                    </Button>}
                  </div>
                </Form>
              </Modal.Body>
            </Modal>}

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


          {ShowCaseData.length > 0 &&
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
        </>}
    </>
  );
};

export default Landing;
