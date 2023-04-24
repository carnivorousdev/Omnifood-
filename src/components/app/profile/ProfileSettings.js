import React, { useState } from 'react';
import { Button, Card, Col, Dropdown, Form, Image, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import { useForm } from 'react-hook-form';
import Flex from 'components/common/Flex';
import { getSize } from 'helpers/utils';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import CardDropdown from 'components/common/CardDropdown';
import cloudUpload from '../../../assets/img/icons/cloud-upload.svg';
import { doc, updateDoc } from "firebase/firestore";
import { OmnifoodServer } from 'config';
import { deleteObject, getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { useEffect } from 'react';

const ProfileSettings = ({ userData }) => {
  const [avatarLoader, setAvatarLoader] = useState(false)
  const [files, setFiles] = useState([]);
  const [UpdateLoader, setUpdateLoader] = useState(false)
  const storage = getStorage();

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const stringFiles = [];
      if (acceptedFiles.length) {
        acceptedFiles.map(file => {
          const SignedInEmail = JSON.parse(localStorage.getItem('SignedInEmail'))
          const userProfileAvatar = ref(storage, SignedInEmail + '/' + 'Profile_Image/');
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

  const handleRemove = file => {
    setAvatarLoader(true)
    const SignedInEmail = JSON.parse(localStorage.getItem('SignedInEmail'))
    const deleteRef = ref(storage, SignedInEmail + '/' + 'Profile_Image/');
    deleteObject(deleteRef).then(() => {
      setFiles(files.filter(file => file.path !== file.path));
      setAvatarLoader(false)
    }).catch((error) => {
      toast.error(`${error.message}`, {
        theme: 'colored'
      });
      setAvatarLoader(false)
    });
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const onSubmit = data => {
    setUpdateLoader(true)
    let fullName = data.firstName + ' ' + data.lastName
    const SignedInEmail = JSON.parse(localStorage.getItem('SignedInEmail'))
    getDownloadURL(ref(storage, SignedInEmail + '/' + 'Profile_Image/'))
      .then(async (url) => {
        const documentRef = doc(OmnifoodServer, SignedInEmail, 'User-Data')
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
        location.replace(`/profile/${userData.userName}`)
      })
      .catch((err) => {
        setUpdateLoader(false)
        toast.error(`${err.message}`, {
          theme: 'colored'
        });
      });
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
          <div className="text-end">
            {UpdateLoader ? <Spinner animation="border" variant="success" size='sm' /> : <Button variant="outline-info" type="submit"
              disabled={avatarLoader}>
              Update
            </Button>}
          </div>
        </Form>
      </Card.Body>
    </Card >
  );
};

export default ProfileSettings;
