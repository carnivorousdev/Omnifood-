import React from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import { firestoreAuth } from 'config'
import { toast } from 'react-toastify';

const SocialAuthButtons = () => {
  const navigate = useNavigate()
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider()
  const handleGoogleLogin = () => {
    signInWithPopup(firestoreAuth, googleProvider)
      .then((result) => {
        toast.success(`Logged in as ${result.user.email}`, {
          theme: 'colored'
        });
        navigate('dashboard')
      }).catch((error) => {
        toast.error(`${error.message}`, {
          theme: 'colored'
        });
      });
  }

  const handleFacebookLogin = () => {
    signInWithPopup(firestoreAuth, facebookProvider)
      .then((result) => {
        toast.success(`Logged in as ${result.user.email}`, {
          theme: 'colored'
        });
        navigate('dashboard')
      }).catch((error) => {
        toast.error(`${error.message}`, {
          theme: 'colored'
        });
      });
  }
  
  return (
    <Form.Group className="mb-0">
      <Row>
        <Col sm={6} className="pe-sm-1">
          <Button
            variant=""
            size="sm"
            className="btn-outline-google-plus mt-2 w-100"
            onClick={() => handleGoogleLogin()}
          >
            <FontAwesomeIcon
              icon={['fab', 'google-plus-g']}
              transform="grow-8"
              className="me-2"
            />{' '}
            google
          </Button>
        </Col>
        <Col sm={6} className="ps-sm-1">
          <Button
            variant=""
            size="sm"
            className="btn-outline-facebook mt-2 w-100"
            onClick={() => handleFacebookLogin()}
          >
            <FontAwesomeIcon
              icon={['fab', 'facebook-square']}
              transform="grow-8"
              className="me-2"
            />{' '}
            facebook
          </Button>
        </Col>
      </Row>
    </Form.Group>
  )

};

export default SocialAuthButtons;
