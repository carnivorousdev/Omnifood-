import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { firestoreAuth } from 'config'
import { useForm } from 'react-hook-form';
import Flex from 'components/common/Flex';
import { sendPasswordResetEmail } from "firebase/auth";

const ForgetPasswordForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = data => {
    setLoading(true)
    sendPasswordResetEmail(firestoreAuth, data.email)
      .then(() => {
        toast.success(`Password reset email sent!`, {
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
    document.title = "Omnifood | Forget Password";
  }, []);

  return (
    <Form className="mt-4" noValidate
      onSubmit={handleSubmit(onSubmit)}
      role="form">
      <Form.Group className="mb-3">
        <Form.Control
          placeholder={'Email address'}
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
        {loading ? (
          <Row className="g-0">
            <Col xs={12} className="w-100 h-100 my-3">
              <Flex className="align-items-center justify-content-center">
                <Spinner animation="border" variant="primary" />
              </Flex>
            </Col>
          </Row>
        ) : (<Button className="w-100" type="submit" >
          Send reset link
        </Button>)}
      </Form.Group>
    </Form>
  );
};

ForgetPasswordForm.propTypes = {
  layout: PropTypes.string
};

ForgetPasswordForm.defaultProps = { layout: 'simple' };

export default ForgetPasswordForm;
