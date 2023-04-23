import React from 'react';
import { Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { BsBookmarkStarFill } from 'react-icons/bs'
const BookMarksNotification = ({ bookMarksData }) => {

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
      <Nav.Item as="li" className="d-none d-sm-block">
        <Nav.Link
          as={Link}
          to="/all_bookmarks"
          className={classNames('px-0 icon-item', {
            'notification-indicator notification-indicator-warning notification-indicator-fill':
              bookMarksData.length > 0
          })}
        >
          <span className="notification-indicator-number">
            {bookMarksData.length}
          </span>
          <BsBookmarkStarFill
            className="fs-0 text-800"
          />
        </Nav.Link>
      </Nav.Item>
    </OverlayTrigger>
  );
};

export default BookMarksNotification;
