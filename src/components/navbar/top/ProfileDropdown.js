import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import team4 from 'assets/img/team/7.jpg';
import Avatar from 'components/common/Avatar';
import { signOut } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import { firestoreAuth } from 'config'
import { toast } from 'react-toastify';

const ProfileDropdown = () => {
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

  return (
    <Dropdown navbar={true} as="li">
      <Dropdown.Toggle
        bsPrefix="toggle"
        as={Link} to="#!"
        className="pe-0 ps-2 nav-link"
      >
        <Avatar src={firestoreAuth.currentUser.photoURL ? firestoreAuth.currentUser.photoURL : team4} />
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-caret dropdown-menu-card  dropdown-menu-end">
        <div className="bg-white rounded-2 py-2 dark__bg-1000">
          <Dropdown.Item>
            {firestoreAuth.currentUser.displayName ? firestoreAuth.currentUser.displayName : firestoreAuth.currentUser.email}
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
