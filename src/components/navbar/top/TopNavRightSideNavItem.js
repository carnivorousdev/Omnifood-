import React, { useEffect, useContext } from 'react';
import { Nav } from 'react-bootstrap';
import ProfileDropdown from 'components/navbar/top/ProfileDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppContext from 'context/Context';
import BookMarksNotification from './BookMarksNotification';
import { doc, getDoc } from 'firebase/firestore';
import { OmnifoodServer } from 'config';

const TopNavRightSideNavItem = () => {
  const { handleBookMarksData, loading, handleLoading, showBookMarks, userInfo } = useContext(AppContext);

  const {
    config: { isDark },
    setConfig
  } = useContext(AppContext);

  useEffect(() => {
    if (Object.keys(userInfo).length > 0) {
      getDocument()
    } else return
  }, [userInfo])

  const getDocument = async () => {
    handleLoading(true)
    const documentRef = doc(OmnifoodServer, userInfo.uid, 'Bookmarks-Data')
    const docSnap = await getDoc(documentRef);
    if (docSnap.exists()) {
      const sortedData = Object.values(docSnap.data()).sort((a, b) => {
        const aTimestamp = new Date(a.dateModified.toDate());
        const bTimestamp = new Date(b.dateModified.toDate());
        return bTimestamp - aTimestamp;
      });
      handleBookMarksData(sortedData)
      handleLoading(false)
    } else {
      handleBookMarksData([])
      handleLoading(false)
    }
  }


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
          <div className="theme-control-toggle-label">
            <FontAwesomeIcon
              icon={isDark ? 'sun' : 'moon'}
              className="fs-0"
            />
          </div>
        </Nav.Link>
      </Nav.Item>
      {loading ? '' : showBookMarks.length > 0 ? <BookMarksNotification /> : ''}
      <ProfileDropdown />
    </Nav>
  );
};

export default TopNavRightSideNavItem;
