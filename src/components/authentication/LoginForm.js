import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import Divider from 'components/common/Divider';
import SocialAuthButtons from './SocialAuthButtons';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import { firestoreAuth } from 'config'
import { useForm } from 'react-hook-form';
import Flex from 'components/common/Flex';
import { useEffect } from 'react';
import { OmnifoodServer } from 'config';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useContext } from 'react';
import AppContext from 'context/Context';
import axios from 'axios';

const LoginForm = ({ hasLabel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const {
    handleUserInfo,
  } = useContext(AppContext);
  const navigate = useNavigate()
  const [heading, setHeading] = useState('')

  const [loginLoading, setLoginLoading] = useState(false)

  const fetchHeading = async () => {
    const response = await axios.get(process.env.REACT_APP_RANDOM_PROFILE_HEADING_URL);
    setHeading(response.data.content)
  }

  const onSubmit = data => {
    setLoginLoading(true)
    signInWithEmailAndPassword(firestoreAuth, data.email, data.password)
      .then(() => {
        onAuthStateChanged(firestoreAuth, async (user) => {
          if (user.emailVerified) {
            const documentRef = doc(OmnifoodServer, user.uid, 'User-Data')
            const docSnap = await getDoc(documentRef);
            const parts = user.email.split("@")[0].split(".");
            const firstName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
            const lastName = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
            if (docSnap.exists()) {
              handleUserInfo(docSnap.data())
              await updateDoc(documentRef, {
                accessToken: user.accessToken,
              }, { capital: true }, { merge: true });
            } else {
              await setDoc(documentRef, {
                userName: user.displayName ? user.displayName : firstName + ' ' + lastName,
                firstName: firstName,
                lastName: lastName,
                userEmail: user.email,
                userProfilePhoto: user.photoURL,
                accessToken: user.accessToken,
                providerData: user.providerData,
                emailVerified: user.emailVerified,
                isAnonymous: user.isAnonymous,
                uid: user.uid,
                providerData: user.providerData,
                profileHeading: heading,
                reloadUserInfo: user.reloadUserInfo
              }, { capital: true }, { merge: true });
              handleUserInfo({
                userName: user.displayName ? user.displayName : firstName + ' ' + lastName,
                userEmail: user.email,
                userProfilePhoto: user.photoURL,
                accessToken: user.accessToken,
                providerData: user.providerData,
                emailVerified: user.emailVerified,
                isAnonymous: user.isAnonymous,
                uid: user.uid,
                providerData: user.providerData,
                reloadUserInfo: user.reloadUserInfo,
                profileHeading: heading,
              })
            }
            toast.success(`Logged in as ${data.email}`, {
              theme: 'colored'
            });
            setLoginLoading(false)
            navigate('/dashboard')
          } else {
            setLoginLoading(false)
            toast.warn(`Email not verified`, {
              theme: 'colored'
            });
          }
        })
      })
      .catch((err) => {
        setLoginLoading(false)
        toast.warn(`${err.message}`, {
          theme: 'colored'
        });
      });
  };


  useEffect(() => {
    fetchHeading()
    document.title = "Omnifood | Login";
  }, []);

  return (
    <Form noValidate
      onSubmit={handleSubmit(onSubmit)}
      role="form">
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Email address</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Email address' : ''}
          name="email"
          type="email"
          disabled={loginLoading}
          isInvalid={!!errors.email}
          {...register('email', {
            required: 'Email Id is required',
            pattern: {
              value:
                /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/i,
              message: 'Email must be valid'
            }
          })
          }
        />
        <Form.Control.Feedback type="invalid">
          {errors.email && errors.email.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Password</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Password' : ''}
          name="password"
          type="password"
          disabled={loginLoading}
          isInvalid={!!errors.password}
          {...register('password', {
            required: 'You must specify a password',
            minLength: {
              value: 2,
              message: 'Password must have at least 2 characters'
            },
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password && errors.password.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
        </Col>
        {loginLoading ? '' : <Col xs="auto">
          <Link
            className="fs--1 mb-0"
            to={`/forgot-password`}
          >
            Forget Password?
          </Link>
        </Col>}
      </Row>

      <Form.Group>
        {loginLoading ? (
          <Row className="g-0">
            <Col xs={12} className="w-100 h-100 my-3">
              <Flex className="align-items-center justify-content-center">
                <Spinner animation="border" variant="success" size='sm' />
              </Flex>
            </Col>
          </Row>
        ) : (<Button
          type="submit"
          color="primary"
          className="mt-3 w-100"
        >
          Log in
        </Button>)}
      </Form.Group>

      <Divider className="mt-4">or log in with</Divider>

      <SocialAuthButtons loginLoading={loginLoading} setLoginLoading={setLoginLoading} />
    </Form>
  );
};

LoginForm.propTypes = {
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
};

LoginForm.defaultProps = {
  layout: 'simple',
  hasLabel: false
};

export default LoginForm;
