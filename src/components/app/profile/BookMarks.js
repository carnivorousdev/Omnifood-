import React from 'react';
import FalconCardHeader from 'components/common/FalconCardHeader';
import { Card } from 'react-bootstrap';
import FalconCardFooterLink from 'components/common/FalconCardFooterLink';
import BookMark from '../BookMarks/BookMark';

const BookMarks = ({ cardTitle, events, allBookMarksData, ...rest }) => {
  return (
    <Card {...rest}>
      <FalconCardHeader title={cardTitle} light />
      <Card.Body className="fs--1 border-bottom">
        {events.map((event, index) => (
          <BookMark
            key={index}
            details={event}
            isLast={index === events.length - 1}
          />
        ))}
      </Card.Body>

      {allBookMarksData.length > 4 && <FalconCardFooterLink
        title="All Bookmarks"
        to="/all_bookmarks"
        size="sm"
      />}
    </Card>
  );
};


export default BookMarks;
