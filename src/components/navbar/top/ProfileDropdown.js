import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Avatar from 'components/common/Avatar';
import { signOut } from "firebase/auth"
import { firestoreAuth } from 'config'
import { toast } from 'react-toastify';
import AppContext from 'context/Context';

const ProfileDropdown = () => {
  const loadingGif = 'https://i.ibb.co/pymdzwD/7.webp'
  const navigate = useNavigate()
  const {
    setConfig,
    userInfo,
    handleUserInfo,
    loading
  } = useContext(AppContext);

  const handleLogOut = () => {
    signOut(firestoreAuth).then(() => {
      toast.success(`Logged out successfully`, {
        theme: 'colored'
      });
      handleUserInfo({})
      setConfig('isDark', false)
      navigate('/login')
    }).catch((error) => {
      toast.error(`${error.message}`, {
        theme: 'colored'
      });
    });
  }


  return (
    <>
      {loading ? '' : <Dropdown navbar={true} as="li">
        <Dropdown.Toggle
          bsPrefix="toggle"
          as={Link} to="#!"
          className="pe-0 ps-2 nav-link"
        >
          <Avatar src={userInfo.userProfilePhoto ? userInfo.userProfilePhoto : loadingGif} size="xl" className={userInfo.userProfilePhoto ? "status-online" : ''} />
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-caret dropdown-menu-card  dropdown-menu-end">
          <div className="bg-white rounded-2 py-2 dark__bg-1000">
            <Dropdown.Item as={Link} to={`profile/${userInfo.userName ? userInfo.userName : userInfo.userEmail}`}>
              {userInfo.userName ? userInfo.userName : userInfo.userEmail}
            </Dropdown.Item>
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
      </Dropdown>}
    </>

  );
};

export default ProfileDropdown;
