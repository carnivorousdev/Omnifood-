import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import { firestoreAuth } from 'config'
import { useForm } from 'react-hook-form';
import Flex from 'components/common/Flex';
import { useEffect } from 'react';
import { LoginContext } from 'context/LoginProvider';

const RegistrationForm = ({ hasLabel }) => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const { loginLoading, handleLoginLoading } = useContext(LoginContext)

  const onSubmit = data => {
    handleLoginLoading(true)
    createUserWithEmailAndPassword(firestoreAuth, data.email, data.confirmPassword)
      .then(() => {
        sendEmailVerification(firestoreAuth.currentUser).then(() => {
          handleLoginLoading(false)
          navigate('/login')
          toast.success(`Successfully registered.Please verify your email`, {
            theme: 'colored'
          });
        })
          .catch((err) => {
            handleLoginLoading(false)
            toast.error(`${err.message}`, {
              theme: 'colored'
            });
          })

      })
      .catch((error) => {
        handleLoginLoading(false)
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
        {hasLabel && <Form.Label>email@domain.com</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'email@domain.com' : ''}
          name="email"
          isInvalid={!!errors.email}
          disabled={loginLoading}
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
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Confirm Password</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Confirm Password' : ''}
          name="confirmPassword"
          type="password"
          disabled={loginLoading}
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
      <Form.Group className="mb-3">
        <Form.Check type="checkbox" className="form-check">
          <Form.Check.Input
            type="checkbox"
            name="isAccepted"
            disabled={loginLoading}
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
