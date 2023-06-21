import React, { useState, useContext } from 'react';
import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import { useForm } from 'react-hook-form';
import Flex from 'components/common/Flex';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import cloudUpload from 'assets/img/illustrations/cloud-upload.svg';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { OmnifoodServer } from 'config';
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import AppContext from 'context/Context';
import Avatar from 'components/common/Avatar';
import { ProfileContext } from 'context/ProfileProvider';

const ProfileSettings = ({ userData }) => {
  const DefaultPic = 'https://i.ibb.co/pymdzwD/7.webp'
  const [avatarLoader, setAvatarLoader] = useState(false)
  const { profileLoading, handleProfileLoading } = useContext(ProfileContext)

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
      acceptedFiles.map(file => {
        setAvatarLoader(true)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setAvatarLoader(false)
          setValue('profileImage', reader.result)
        };
        return true;
      });
    },
  });


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      'firstName': userData.firstName,
      'lastName': userData.lastName,
      'phone': userData.phoneNumber,
      'heading': userData.profileHeading,
      'profileImage': userData.userProfilePhoto,
    }
  });

  const updateUserInfo = async (payload) => {
    handleCreatedRecipesLoading(true)
    const updateUserInfo = doc(OmnifoodServer, userData.uid, 'RecipeCreated')
    const userInfoSnap = await getDoc(updateUserInfo);
    if (userInfoSnap.exists()) {
      let updateUserInfo_RecipeCreator = Object.values(userInfoSnap.data()).forEach(async (ele) => {
        if (payload.userProfilePhoto) {
          let recipeCreatedObj = {
            ...ele,
            authorName: payload.userName,
            authorEmail: userData.userEmail,
            authorProfile: payload.userProfilePhoto
          }
          await updateDoc(updateUserInfo, { [ele.idIngredient]: recipeCreatedObj }, { capital: true }, { merge: true });
          handleCreatedRecipesData(updateUserInfo_RecipeCreator)
          handleCreatedRecipesLoading(false)
        } else {
          let recipeCreatedObj = {
            ...ele,
            authorName: payload.userName,
            authorEmail: userData.userEmail,
          }
          await updateDoc(updateUserInfo, { [ele.idIngredient]: recipeCreatedObj }, { capital: true }, { merge: true });
          handleCreatedRecipesData(updateUserInfo_RecipeCreator)
          handleCreatedRecipesLoading(false)
        }
      })
    } else {
      handleCreatedRecipesLoading(false)
    }
  }

  const onSubmit = async (data) => {
    handleProfileLoading(true)
    let fullName = data.firstName + ' ' + data.lastName
    if (watch('profileImage') != userData.userProfilePhoto) {
      const userProfileAvatar = ref(storage, userData.userEmail + '/' + 'Profile_Image/');
      uploadString(userProfileAvatar, watch('profileImage'), 'data_url')
        .then(() => {
          getDownloadURL(userProfileAvatar)
            .then(async (url) => {
              const documentRef = doc(OmnifoodServer, userData.uid, 'User-Data')
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
              const UserRef = doc(OmnifoodServer, userData.uid, 'User-Data')
              const UserSnap = await getDoc(UserRef);
              handleUserInfo(UserSnap.data())
              handleProfileLoading(false)
              navigate(`/profile/${userData.userName}`)
            }).catch(() => {
              handleProfileLoading(false)
            });
        }).catch((err) => {
          handleProfileLoading(false)
          toast.error(`${err.message}`, {
            theme: 'colored'
          });
        });
    } else {
      const documentRef = doc(OmnifoodServer, userData.uid, 'User-Data')
      let payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        userName: fullName,
        phoneNumber: Number(data.phone),
        profileHeading: data.heading
      }
      updateUserInfo(payload)
      await updateDoc(documentRef, payload, { capital: true }, { merge: true });
      const UserRef = doc(OmnifoodServer, userData.uid, 'User-Data')
      const UserSnap = await getDoc(UserRef);
      handleUserInfo(UserSnap.data())
      handleProfileLoading(false)
      navigate(`/profile/${userData.userName}`)
    }
  };


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
                disabled={profileLoading}
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
                disabled={profileLoading}
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
              <Form.Control
                type="email"
                placeholder="Email"
                value={userData.userEmail}
                disabled
                className='text-truncate'
                name="email"
              />
            </Form.Group>
            <Form.Group as={Col} lg={6} controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                placeholder="Phone"
                disabled={profileLoading}
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
              disabled={profileLoading}
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

          <Row className="mb-3 align-items-center gap-2">
            <Col sm='auto'>
              {avatarLoader ? <Row className="g-0 w-100 h-100" >
                <Col xs={12} className='d-flex align-items-center justify-content-center'>
                  <Spinner animation="border" variant="primary" size='sm' />
                </Col>
              </Row> : <Avatar
                size="4xl"
                src={
                  watch('profileImage') ? watch('profileImage') : DefaultPic
                }
              />}
            </Col>
            {profileLoading ? '' : <Col md={6} {...getRootProps({ className: 'dropzone-area py-3' })}>
              <input {...getInputProps()}
                disabled={profileLoading} />
              <Flex justifyContent="center">
                <img src={cloudUpload} alt="" width={25} className="me-2" />
                <p className="fs-0 mb-0 text-700">Upload profile photo</p>
              </Flex>
            </Col>}
          </Row>

          <div className="d-flex align-items-center justify-content-end">
            {profileLoading ? <Spinner animation="border" variant="success" size='sm' /> :
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
