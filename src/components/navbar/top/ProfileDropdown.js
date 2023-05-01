import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import loadingGif from 'assets/img/illustrations/Spinner.gif';
import Avatar from 'components/common/Avatar';
import { signOut } from "firebase/auth"
import { firestoreAuth } from 'config'
import { toast } from 'react-toastify';
import AppContext from 'context/Context';
import { LinkContainer } from "react-router-bootstrap";

const ProfileDropdown = () => {
  const navigate = useNavigate()
  const {
    setConfig,
    userInfo,
    handleUserInfo
  } = useContext(AppContext);

  const handleLogOut = () => {
    signOut(firestoreAuth).then(() => {
      toast.success(`Logged out successfully`, {
        theme: 'colored'
      });
      navigate('/login')
      setConfig('isDark', false)
      handleUserInfo({})
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
        <Avatar src={userInfo.userProfilePhoto ? userInfo.userProfilePhoto : loadingGif} size="xl" className={userInfo.userProfilePhoto ? "status-online" : ''} />
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-caret dropdown-menu-card  dropdown-menu-end">
        <div className="bg-white rounded-2 py-2 dark__bg-1000">
          <LinkContainer to={`profile/${userInfo.userName ? userInfo.userName : userInfo.userEmail}`}>
            <Dropdown.Item>
              {userInfo.userName ? userInfo.userName : userInfo.userEmail}
            </Dropdown.Item>
          </LinkContainer>
          <Dropdown.Item as={Link} to="/settings">
            Settings
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/createRecipe">
            Create Recipe
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
