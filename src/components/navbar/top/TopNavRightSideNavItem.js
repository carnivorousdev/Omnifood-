import React, { useContext, useEffect, useState } from 'react';
import { Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ProfileDropdown from 'components/navbar/top/ProfileDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppContext from 'context/Context';
import BookMarksNotification from './BookMarksNotification';
import { doc, getDoc } from "firebase/firestore";
import { OmnifoodServer } from 'config';

const TopNavRightSideNavItem = () => {
  const [bookMarksData, setBookMarksData] = useState([])
  const [getBookMarksLoading, setBookMarksLoading] = useState(false)
  const {
    config: { isDark },
    setConfig
  } = useContext(AppContext);

  const getData = async () => {
    setBookMarksLoading(true)
    const SignedInEmail = JSON.parse(localStorage.getItem('SignedInEmail'))
    const docRef = doc(OmnifoodServer, SignedInEmail, 'Bookmarks-Data');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      var result = docSnap.data()
      setBookMarksData(Object.values(result))
      setBookMarksLoading(false)
    } else {
      setBookMarksLoading(false)
      setBookMarksData([])
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Nav
      navbar
      className="navbar-nav-icons ms-auto flex-row align-items-center"
      as="ul"
    >
      <Nav.Item as={'li'}>
        <Nav.Link
          className="px-2 theme-control-toggle"
          onClick={() => setConfig('isDark', !isDark)}
        >
          <OverlayTrigger
            key="bottom"
            placement='bottom'
            overlay={
              <Tooltip id="ThemeColor">
                {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              </Tooltip>
            }
          >
            <div className="theme-control-toggle-label">
              <FontAwesomeIcon
                icon={isDark ? 'sun' : 'moon'}
                className="fs-0"
              />
            </div>
          </OverlayTrigger>
        </Nav.Link>
      </Nav.Item>
      {getBookMarksLoading ? '' : <BookMarksNotification bookMarksData={bookMarksData} />}
      <ProfileDropdown />
    </Nav>
  );
};

export default TopNavRightSideNavItem;
