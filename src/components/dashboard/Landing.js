import PageHeader from 'components/common/PageHeader';
import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Spinner, Modal, Form, OverlayTrigger, Tooltip, Image, Dropdown } from 'react-bootstrap';
import Avatar, { AvatarGroup } from 'components/common/Avatar';
import CountUp from 'react-countup';
import Flex from 'components/common/Flex';
import axios from 'axios';
import Background from 'components/common/Background';
import { useMediaQuery, useTheme } from '@mui/material';
import video4 from 'assets/video/video-4.mp4'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { OmnifoodServer } from 'config';
import { useForm } from 'react-hook-form';
import { getSize } from 'helpers/utils';
import { useDropzone } from 'react-dropzone';
import CardDropdown from 'components/common/CardDropdown';
import cloudUpload from 'assets/img/illustrations/cloud-upload.svg';
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import AppContext from 'context/Context';
import { useContext } from 'react';
import Products from 'components/product/Products';

const Landing = () => {
  const generic1 = 'https://i.ibb.co/pPCDTst/corner-1.png'
  const user1 = 'https://i.ibb.co/0GM1hG8/1.jpg'
  const user2 = 'https://i.ibb.co/pQSkRZY/2.jpg'
  const user3 = 'https://i.ibb.co/fYSJg8J/3.jpg'
  const user4 = 'https://i.ibb.co/nw6NM2x/4.jpg'
  const user5 = 'https://i.ibb.co/L04HG8C/5.jpg'
  const user6 = 'https://i.ibb.co/HgWMvKH/6.jpg'

  const [ShowCaseData, setShowCaseData] = useState([])
  const [ShowCaseLoading, setShowCaseLoading] = useState(false)
  const [files, setFiles] = useState([]);
  const [UpdateLoader, setUpdateLoader] = useState(false)
  const [avatarLoader, setAvatarLoader] = useState(false)

  const storage = getStorage();
  const {
    userInfo,
    loading,
    handleUserInfo
  } = useContext(AppContext);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    required: true,
    onDrop: acceptedFiles => {
      if (acceptedFiles.length) {
        acceptedFiles.map(file => {
          setAvatarLoader(true)
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            setAvatarLoader(false)
            setFiles([{
              preview: reader.result,
              size: file.size,
              path: file.path,
              type: file.type
            }])
          };
          return true;
        });
      }
    },
  });

  const handleRemove = () => {
    setFiles(files.filter(file => file.path !== file.path));
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
    formState: { errors }
  } = useForm();

  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    document.title = "Omnifood | Dashboard";
    if (Object.keys(userInfo).length > 0) {
      setDocument()
    } else return
  }, [userInfo])

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


  const onSubmit = async data => {
    setUpdateLoader(true)
    let fullName = data.firstName.trim() + ' ' + data.lastName.trim()
    if (files.length > 0) {
      const userProfileAvatar = ref(storage, userInfo.uid + '/' + 'Profile_Image/');
      uploadString(userProfileAvatar, files[0].preview, 'data_url')
        .then(() => {
          getDownloadURL(userProfileAvatar)
            .then(async (url) => {
              const documentRef = doc(OmnifoodServer, userInfo.uid, 'User-Data')
              let payload = {
                firstName: data.firstName,
                lastName: data.lastName,
                userName: fullName,
                userProfilePhoto: url,
                phoneNumber: Number(data.phone),
                profileHeading: data.heading
              }
              await updateDoc(documentRef, payload, { capital: true }, { merge: true });
              const UserSnap = await getDoc(documentRef);
              handleUserInfo(UserSnap.data())
              setUpdateLoader(false)
            })
            .catch(() => {
              setUpdateLoader(false)
            });
        }).catch(() => {
          setUpdateLoader(false)
        });
    } else {
      const documentRef = doc(OmnifoodServer, userInfo.uid, 'User-Data')
      let payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        userName: fullName,
        phoneNumber: Number(data.phone),
        profileHeading: data.heading
      }
      await updateDoc(documentRef, payload, { capital: true }, { merge: true });
      const UserSnap = await getDoc(documentRef);
      handleUserInfo(UserSnap.data())
      setUpdateLoader(false)
    }
  };

  return (
    <>
      {ShowCaseLoading || loading ? <Row className="g-0 w-100 h-100" >
        <Col xs={12} className='d-flex align-items-center justify-content-center' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          <Spinner animation="border" variant="success" size='sm' />
        </Col>
      </Row> :
        <>
          {userInfo.firstName && userInfo.lastName && userInfo.profileHeading ?
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
                    <Form.Group as={Col} lg={6} controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        disabled={UpdateLoader}
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
                    </Form.Group>

                    <Form.Group as={Col} lg={6} controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        disabled={UpdateLoader}
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
                            {userInfo.userEmail}
                          </Tooltip>
                        }
                      >
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          value={userInfo.userEmail}
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
                        disabled={UpdateLoader}
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
                        disabled={UpdateLoader}
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
                    {UpdateLoader ? '' : <div {...getRootProps({ className: 'dropzone-area py-3' })}>
                      <input {...getInputProps()} />
                      <Flex justifyContent="center">
                        <img src={cloudUpload} alt="" width={25} className="me-2" />
                        <p className="fs-0 mb-0 text-700">Upload profile photo</p>
                      </Flex>
                    </div>}
                    {errors.avatar && <p className='fs--2 text-danger'>*Required</p>}
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
                              <Dropdown.Item className="text-danger" onClick={() => handleRemove(file)}>
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
