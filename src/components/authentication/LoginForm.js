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

const LoginForm = ({ hasLabel }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = data => {
    setLoading(true)
    signInWithEmailAndPassword(firestoreAuth, data.email, data.password)
      .then(() => {
        onAuthStateChanged(firestoreAuth, async (user) => {
          if (user.emailVerified) {
            const documentRef = doc(OmnifoodServer, data.email, 'User-Data')
            const docSnap = await getDoc(documentRef);
            if (docSnap.exists()) {
              await updateDoc(documentRef, {
                accessToken: user.accessToken,
              }, { capital: true }, { merge: true });
              setLoading(false)
              toast.success(`Logged in as ${data.email}`, {
                theme: 'colored'
              });
              navigate('dashboard')
            } else {
              await setDoc(documentRef, {
                userName: user.displayName,
                userEmail: user.email,
                userProfilePhoto: user.photoURL,
                accessToken: user.accessToken,
                providerData: user.providerData,
                emailVerified: user.emailVerified,
                isAnonymous: user.isAnonymous,
              }, { capital: true }, { merge: true });
              setLoading(false)
              toast.success(`Logged in as ${data.email}`, {
                theme: 'colored'
              });
              navigate('dashboard')
            }
            localStorage.setItem('SignedInEmail', JSON.stringify(data.email))
          } else {
            setLoading(false)
            toast.error(`Email not verified`, {
              theme: 'colored'
            });
          }
        })
      })
      .catch(() => {
        setLoading(false)
        toast.error('User not found', {
          theme: 'colored'
        });
        navigate('register')
      });
  };

  useEffect(() => {
    document.title = "Omnifood";
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
          isInvalid={!!errors.password}
          {...register('password', {
            required: 'You must specify a password',
            minLength: {
              value: 2,
              message: 'Password must have at least 2 characters'
            },
            pattern: {
              value:
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
              message: 'Password should be strong(Use special characters)'
            }
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password && errors.password.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
        </Col>
        <Col xs="auto">
          <Link
            className="fs--1 mb-0"
            to={`forgot-password`}
          >
            Forget Password?
          </Link>
        </Col>
      </Row>

      <Form.Group>
        {loading ? (
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

      <SocialAuthButtons />
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
