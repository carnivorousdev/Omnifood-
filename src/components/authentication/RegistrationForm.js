import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import Divider from 'components/common/Divider';
import SocialAuthButtons from './SocialAuthButtons';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import { firestoreAuth } from 'config'
import { useForm } from 'react-hook-form';
import Flex from 'components/common/Flex';
import { useEffect } from 'react';

const RegistrationForm = ({ hasLabel }) => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const [loading, setLoading] = useState(false);

  // Handler
  const onSubmit = data => {
    setLoading(true)
    createUserWithEmailAndPassword(firestoreAuth, data.email, data.confirmPassword)
      .then(() => {
        setLoading(false)
        toast.success(`Successfully registered`, {
          theme: 'colored'
        });
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        toast.error(`${error.message}`, {
          theme: 'colored'
        });
      });
  };

  useEffect(() => {
    document.title = "Omnifood | Register";
  }, []);

  return (
    <Form noValidate
      onSubmit={handleSubmit(onSubmit)}
      role="form"
    >
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Email address</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Email address' : ''}
          name="email"
          isInvalid={!!errors.email}
          type="email"
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

      <Row className="g-2 mb-3">
        <Form.Group as={Col} sm={6}>
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
        <Form.Group as={Col} sm={6}>
          {hasLabel && <Form.Label>Confirm Password</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? 'Confirm Password' : ''}
            name="confirmPassword"
            type="password"
            isInvalid={!!errors.confirmPassword}
            {...register('confirmPassword', {
              required: 'You must confirm password',
              validate: value =>
                value === watch('password') ||
                'Passwords are not matching'
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword && errors.confirmPassword.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3">
        <Form.Check type="checkbox" className="form-check">
          <Form.Check.Input
            type="checkbox"
            name="isAccepted"
            isInvalid={!!errors.isAccepted}
            {...register('isAccepted', {
              required: 'You need to agree the terms and Privacy.',
            })}
          />
          <Form.Check.Label className="form-label">
            I accept the <Link to="#!">terms</Link> and{' '}
            <Link to="#!">privacy policy</Link>
          </Form.Check.Label>
          <Form.Control.Feedback type="invalid">
            {errors.isAccepted && errors.isAccepted.message}
          </Form.Control.Feedback>
        </Form.Check>
      </Form.Group>

      <Form.Group className="mb-4">
        {loading ? (
          <Row className="g-0">
            <Col xs={12} className="w-100 h-100 my-3">
              <Flex className="align-items-center justify-content-center">
                <Spinner animation="border" variant="primary" />
              </Flex>
            </Col>
          </Row>
        ) : (<Button
          className="w-100"
          type="submit"
        >
          Register
        </Button>)}
      </Form.Group>
    </Form>
  );
};

RegistrationForm.propTypes = {
  hasLabel: PropTypes.bool
};

export default RegistrationForm;
