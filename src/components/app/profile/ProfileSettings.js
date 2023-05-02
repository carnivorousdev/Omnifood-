import React, { useState, useContext } from 'react';
import { Button, Card, Col, Dropdown, Form, Image, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import { useForm } from 'react-hook-form';
import Flex from 'components/common/Flex';
import { getSize } from 'helpers/utils';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import CardDropdown from 'components/common/CardDropdown';
import cloudUpload from '../../../assets/img/icons/cloud-upload.svg';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { OmnifoodServer } from 'config';
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from 'context/Context';

const ProfileSettings = ({ userData }) => {
  const [avatarLoader, setAvatarLoader] = useState(false)
  const [files, setFiles] = useState([]);
  const [UpdateLoader, setUpdateLoader] = useState(false)
  const storage = getStorage();
  const navigate = useNavigate()
  const {
    handleUserInfo,
    handleCreatedRecipesLoading,
    handleCreatedRecipesData,
  } = useContext(AppContext);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const updateUserInfo = async (payload) => {
    handleCreatedRecipesLoading(true)
    const updateUserInfo = doc(OmnifoodServer, userData.userEmail, 'RecipeCreated')
    const userInfoSnap = await getDoc(updateUserInfo);
    if (userInfoSnap.exists()) {
      let updateUserInfo_RecipeCreator = Object.values(userInfoSnap.data()).forEach(async (ele) => {
        let recipeCreatedObj = {
          ...ele,
          authorName: payload.userName,
          authorEmail: userData.userEmail,
          authorProfile: payload.userProfilePhoto
        }
        await updateDoc(updateUserInfo, { [ele.strMeal]: recipeCreatedObj }, { capital: true }, { merge: true });
        handleCreatedRecipesData(updateUserInfo_RecipeCreator)
        handleCreatedRecipesLoading(false)
      })
    } else {
      Object.values(userInfoSnap.data()).forEach(async (ele) => {
        let recipeCreatedObj = {
          ...ele,
          authorName: payload.userName,
          authorEmail: userData.userEmail,
          authorProfile: payload.userProfilePhoto
        }
        await setDoc(dataRef, { [ele.strMeal]: recipeCreatedObj }, { capital: true }, { merge: true });
        handleCreatedRecipesData([])
        handleCreatedRecipesLoading(false)
      })

    }
  }

  const onSubmit = async (data) => {
    setUpdateLoader(true)
    let fullName = data.firstName + ' ' + data.lastName
    if (files.length > 0) {
      const userProfileAvatar = ref(storage, userData.userEmail + '/' + 'Profile_Image/');
      uploadString(userProfileAvatar, files[0].preview, 'data_url')
        .then(() => {
          getDownloadURL(userProfileAvatar)
            .then(async (url) => {
              const documentRef = doc(OmnifoodServer, userData.userEmail, 'User-Data')
              let payload = {
                firstName: data.firstName,
                lastName: data.lastName,
                userName: fullName,
                userProfilePhoto: url,
                phoneNumber: Number(data.phone),
                profileHeading: data.heading
              }
              updateUserInfo(payload)
              await updateDoc(documentRef, payload, { capital: true }, { merge: true });
              const UserRef = doc(OmnifoodServer, userData.userEmail, 'User-Data')
              const UserSnap = await getDoc(UserRef);
              handleUserInfo(UserSnap.data())
              setUpdateLoader(false)
              navigate(`/profile/${userData.userName}`)
            }).catch(() => {
              setUpdateLoader(false)
            });
        }).catch((err) => {
          setUpdateLoader(false)
          toast.error(`${err.message}`, {
            theme: 'colored'
          });
        });
    } else {
      const documentRef = doc(OmnifoodServer, userData.userEmail, 'User-Data')
      let payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        userName: fullName,
        phoneNumber: Number(data.phone),
        profileHeading: data.heading
      }
      updateUserInfo(payload)
      await updateDoc(documentRef, payload, { capital: true }, { merge: true });
      const UserRef = doc(OmnifoodServer, userData.userEmail, 'User-Data')
      const UserSnap = await getDoc(UserRef);
      handleUserInfo(UserSnap.data())
      setUpdateLoader(false)
      navigate(`/profile/${userData.userName}`)
    }
  };

  useEffect(() => {
    if (userData) {
      setValue('firstName', userData.firstName);
      setValue('lastName', userData.lastName);
      setValue('phone', userData.phoneNumber);
      setValue('heading', userData.profileHeading);
    }
  }, [])

  return (
    <Card>
      <FalconCardHeader title="Edit Profile Settings" />
      <Card.Body className="bg-light">
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
                disabled={UpdateLoader}
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
                key='left'
                placement='left'
                overlay={
                  <Tooltip className='w-auto'>
                    {userData.userEmail}
                  </Tooltip>
                }
              >
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={userData.userEmail}
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
                disabled={UpdateLoader}
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

          <Form.Group className="mb-3" controlId="heading">
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

          <Row className="mb-3 g-3">
            {UpdateLoader ? '' : <div {...getRootProps({ className: 'dropzone-area py-3' })}>
              <input {...getInputProps()} />
              <Flex justifyContent="center">
                <img src={cloudUpload} alt="" width={25} className="me-2" />
                <p className="fs-0 mb-0 text-700">Upload profile photo</p>
              </Flex>
            </div>}

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

                  {UpdateLoader ? '' : <CardDropdown>
                    <div className="py-2">
                      <Dropdown.Item className="text-danger" onClick={() => handleRemove(file)}>
                        Remove
                      </Dropdown.Item>
                    </div>
                  </CardDropdown>}
                </Flex>
              ))}
            </div>}
          </Row>
          <div className="d-flex align-items-center justify-content-end">
            {UpdateLoader ? <Spinner animation="border" variant="success" size='sm' /> :
              <Flex>
                <Button variant="falcon-default" className='me-3' onClick={() =>
                  navigate(-1)}>
                  Cancel
                </Button>
                <Button variant="outline-info" type="submit"
                  disabled={avatarLoader}>
                  Update
                </Button>
              </Flex>
            }
          </div>
        </Form>
      </Card.Body>
    </Card >
  );
};

export default ProfileSettings;
