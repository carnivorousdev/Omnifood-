import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import loadingGif from 'assets/img/illustrations/Spinner.gif';
import Avatar from 'components/common/Avatar';
import { signOut } from "firebase/auth"
import { firestoreAuth } from 'config'
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';
import { OmnifoodServer } from 'config';
import AppContext from 'context/Context';
import { LinkContainer } from "react-router-bootstrap";

const ProfileDropdown = () => {
  const {
    setConfig
  } = useContext(AppContext);

  const [userData, setUserData] = useState({
    userProfilePhoto: null,
    userName: null,
    userEmail: null
  })

  const handleLogOut = () => {
    signOut(firestoreAuth).then(() => {
      toast.success(`Logged out successfully`, {
        theme: 'colored'
      });
      location.replace('/login')
      setConfig('isDark', false)
      localStorage.removeItem('SignedInEmail')
    }).catch((error) => {
      toast.error(`${error.message}`, {
        theme: 'colored'
      });
    });
  }

  const getDocument = async () => {
    const SignedInEmail = JSON.parse(localStorage.getItem('SignedInEmail'))
    const UserRef = doc(OmnifoodServer, SignedInEmail, 'User-Data')
    const UserSnap = await getDoc(UserRef);
    setUserData(UserSnap.data())
  }

  useEffect(() => {
    getDocument()
  }, [])

  return (
    <Dropdown navbar={true} as="li">
      <Dropdown.Toggle
        bsPrefix="toggle"
        as={Link} to="#!"
        className="pe-0 ps-2 nav-link"
      >
        <Avatar src={userData.userProfilePhoto ? userData.userProfilePhoto : loadingGif} size="xl" className={userData.userProfilePhoto ? "status-online" : ''} />
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-caret dropdown-menu-card  dropdown-menu-end">
        <div className="bg-white rounded-2 py-2 dark__bg-1000">
          <LinkContainer to={`profile/${userData.userName ? userData.userName : userData.userEmail}`}>
            <Dropdown.Item>
              {userData.userName ? userData.userName : userData.userEmail}
            </Dropdown.Item>
          </LinkContainer>
          <Dropdown.Item as={Link} to="/settings">
            Settings
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/createRecipe">
            Create recipe
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleLogOut()}>
            Logout
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
