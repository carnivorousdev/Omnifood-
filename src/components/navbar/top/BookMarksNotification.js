import React, { useContext } from 'react';
import { Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsBookmarkStarFill } from 'react-icons/bs'
import AppContext from 'context/Context';

const BookMarksNotification = () => {
  const { showBookMarks } = useContext(AppContext);

  return (
    <OverlayTrigger
      key='bottom'
      placement='bottom'
      overlay={
        <Tooltip>
          BookMarks
        </Tooltip>
      }
    >
      <Nav.Item as="li">
        <Nav.Link
          as={Link}
          to="/all_bookmarks"
          className='px-0 icon-item notification-indicator notification-indicator-warning notification-indicator-fill'
        >
          <span className="notification-indicator-number">
            {showBookMarks.length}
          </span>
          <BsBookmarkStarFill
            className="fs-0 text-danger"
          />
        </Nav.Link>
      </Nav.Item>
    </OverlayTrigger>
  );
};

export default BookMarksNotification;
