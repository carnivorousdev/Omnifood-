import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import team4 from 'assets/img/team/7.jpg';
import Avatar from 'components/common/Avatar';
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import { firestoreAuth } from 'config'
import { toast } from 'react-toastify';

const ProfileDropdown = () => {
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()
  const handleLogOut = () => {
    signOut(firestoreAuth).then(() => {
      toast.success(`Logged out successfully`, {
        theme: 'colored'
      });
      navigate('/')
    }).catch((error) => {
      toast.error(`${error.message}`, {
        theme: 'colored'
      });
    });
  }

  useEffect(() => {
    onAuthStateChanged(firestoreAuth, (user) => {
      if (user) {
        setUserData(user)
      } else {
        setUserData(null)
      }
    });
  }, [])
  return (
    <Dropdown navbar={true} as="li">
      {userData ? <Dropdown.Toggle
        bsPrefix="toggle"
        as={Link} to="#!"
        className="pe-0 ps-2 nav-link"
      >
        <Avatar src={userData.photoURL ? userData.photoURL : team4} size="xl" className="status-online" />
      </Dropdown.Toggle> : null}

      <Dropdown.Menu className="dropdown-caret dropdown-menu-card  dropdown-menu-end">
        <div className="bg-white rounded-2 py-2 dark__bg-1000">
          {userData ? <Dropdown.Item as={Link} to={`profile/${userData.displayName ? userData.displayName : userData.email}`}>
            {userData.displayName ? userData.displayName : userData.email}
          </Dropdown.Item> : null}
          <Dropdown.Item as={Link} to="#!">
            Settings
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
