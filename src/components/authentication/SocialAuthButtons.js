import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, sendEmailVerification } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import { firestoreAuth } from 'config'
import { toast } from 'react-toastify';
import { OmnifoodServer } from 'config';
import AppContext from 'context/Context';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import axios from 'axios';


const SocialAuthButtons = ({ loginLoading, setLoginLoading }) => {
  const {
    handleUserInfo,
  } = useContext(AppContext);
  const navigate = useNavigate()
  const [heading, setHeading] = useState('')
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider()
  facebookProvider.addScope('email');
  googleProvider.addScope('email');
  googleProvider.addScope('profile');
  googleProvider.addScope('openid');

  facebookProvider.setCustomParameters({
    auth_type: 'rerequest',
    display: 'popup',
    prompt: 'select_account'
  });
  useEffect(() => {
    fetchHeading()
  }, [])

  const fetchHeading = async () => {
    const response = await axios.get(process.env.REACT_APP_RANDOM_PROFILE_HEADING_URL);
    setHeading(response.data.content)
  }

  const handleGoogleLogin = () => {
    setLoginLoading(true)
    signInWithPopup(firestoreAuth, googleProvider)
      .then(async (result) => {
        if (result.user.emailVerified) {
          const documentRef = doc(OmnifoodServer, result.user.uid, 'User-Data')
          const docSnap = await getDoc(documentRef);
          if (docSnap.exists()) {
            handleUserInfo(docSnap.data())
            await updateDoc(documentRef, {
              accessToken: result.user.accessToken,
            }, { capital: true }, { merge: true });
          } else {
            await setDoc(documentRef, {
              userName: result.user.displayName,
              firstName: result._tokenResponse.firstName,
              lastName: result._tokenResponse.lastName,
              profileHeading: heading,
              userEmail: result.user.email,
              userProfilePhoto: result.user.photoURL,
              accessToken: result.user.accessToken,
              providerData: result.user.providerData,
              emailVerified: result.user.emailVerified,
              isAnonymous: result.user.isAnonymous,
              uid: result.user.uid,
              providerData: result.user.providerData,
              reloadUserInfo: result.user.reloadUserInfo,
            }, { capital: true }, { merge: true });
            handleUserInfo({
              userName: result.user.displayName,
              firstName: result._tokenResponse.firstName,
              lastName: result._tokenResponse.lastName,
              profileHeading: heading,
              userEmail: result.user.email,
              userProfilePhoto: result.user.photoURL,
              accessToken: result.user.accessToken,
              providerData: result.user.providerData,
              emailVerified: result.user.emailVerified,
              isAnonymous: result.user.isAnonymous,
              uid: result.user.uid,
              providerData: result.user.providerData,
              reloadUserInfo: result.user.reloadUserInfo,
            })
          }
          toast.success(`Logged in as ${result.user.email}`, {
            theme: 'colored'
          });
          setLoginLoading(false)
          navigate('/dashboard')
        } else {
          toast.warn(`Email not verified`, {
            theme: 'colored'
          });
        }
        setLoginLoading(false)
      }).catch((error) => {
        toast.error(`${error.message}`, {
          theme: 'colored'
        });
        setLoginLoading(false)
      });
  }

  const handleFacebookLogin = () => {
    setLoginLoading(true)
    signInWithPopup(firestoreAuth, facebookProvider)
      .then(async (result) => {
        if (result.user.emailVerified) {
          const documentRef = doc(OmnifoodServer, result.user.uid, 'User-Data')
          const docSnap = await getDoc(documentRef);
          if (docSnap.exists()) {
            handleUserInfo(docSnap.data())
            await updateDoc(documentRef, {
              accessToken: result.user.accessToken,
            }, { capital: true }, { merge: true });
          } else {
            await setDoc(documentRef, {
              userName: result.user.displayName,
              firstName: result._tokenResponse.firstName,
              lastName: result._tokenResponse.lastName,
              profileHeading: heading,
              userEmail: result.user.email,
              userProfilePhoto: result.user.photoURL,
              accessToken: result.user.accessToken,
              providerData: result.user.providerData,
              emailVerified: result.user.emailVerified,
              isAnonymous: result.user.isAnonymous,
              uid: result.user.uid,
              providerData: result.user.providerData,
              reloadUserInfo: result.user.reloadUserInfo,
            }, { capital: true }, { merge: true });
            handleUserInfo({
              userName: result.user.displayName,
              firstName: result._tokenResponse.firstName,
              lastName: result._tokenResponse.lastName,
              profileHeading: heading,
              userEmail: result.user.email,
              userProfilePhoto: result.user.photoURL,
              accessToken: result.user.accessToken,
              providerData: result.user.providerData,
              emailVerified: result.user.emailVerified,
              isAnonymous: result.user.isAnonymous,
              uid: result.user.uid,
              providerData: result.user.providerData,
              reloadUserInfo: result.user.reloadUserInfo,
            })
          }
          toast.success(`Logged in as ${result.user.email}`, {
            theme: 'colored'
          });
          navigate('/dashboard')
          setLoginLoading(false)
        } else {
          sendEmailVerification(firestoreAuth.currentUser).then(() => {
            toast.info(`Please verify your email. Verification link has been sent to your email`, {
              theme: 'colored'
            });
            setLoginLoading(false)
          }).catch((err) => {
            toast.error(`${err.message}`, {
              theme: 'colored'
            });
            setLoginLoading(false)
          })
        }
      }).catch((error) => {
        toast.error(`${error.message}`, {
          theme: 'colored'
        });
        setLoginLoading(false)
      });
  }

  return (
    <Form.Group className="mb-0">
      <Row>
        <Col sm={6} className="pe-sm-1">
          <Button
            variant=""
            size="sm"
            disabled={loginLoading}
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
            disabled={loginLoading}
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
