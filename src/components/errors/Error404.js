import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { OmnifoodServer } from 'config';

const Error404 = () => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    getDocument()
  }, [])

  const getDocument = async () => {
    const SignedInEmail = JSON.parse(localStorage.getItem('SignedInEmail'))
    const documentRef = doc(OmnifoodServer, SignedInEmail, 'User-Data')
    const docSnap = await getDoc(documentRef);
    setUserData(docSnap.data())
  }
  return (
    <Card className="text-center">
      <Card.Body className="p-5">
        <div className="display-1 text-300 fs-error">404</div>
        <p className="lead mt-4 text-800 font-sans-serif fw-semi-bold">
          The page you're looking for is not found.
        </p>
        <hr />
        <p>
          Make sure the address is correct and that the page hasn't moved. If
          you think this is a mistake,
          <a href="mailto:info@exmaple.com" className="ms-1">
            contact us
          </a>
          .
        </p>
        <Link className="btn btn-primary btn-sm mt-3" to={userData ? '/dashboard' : '/'}>
          <FontAwesomeIcon icon={faHome} className="me-2" />
          Take me home
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Error404;
