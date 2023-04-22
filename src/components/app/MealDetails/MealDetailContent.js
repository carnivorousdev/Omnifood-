import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiFillYoutube } from 'react-icons/ai'
import ReactYoutubePlayer from 'react-player/youtube';

const MealDetailContent = ({ lookUpdata }) => {
  return (
    <Card>
      {lookUpdata && <Card.Body>
        <h5 className="fs-0">Instructions</h5>
        <hr />
        <p dangerouslySetInnerHTML={{ __html: lookUpdata.strInstructions }} />
        <h5 className="fs-0 mt-5 mb-2 ">Tags </h5>
        {lookUpdata.strTags && <span
          className="badge border link-secondary text-decoration-none me-1"
        >
          {lookUpdata.strTags.replace(/,/g, ', ')}
        </span>}
        <Link
          to={`/category/${lookUpdata.strCategory}`}
          className="badge border link-info text-decoration-none me-1"
        >
          {lookUpdata.strCategory}
        </Link>
        <Link
          to={`/areas/${lookUpdata.strArea}`}
          className="badge border link-success text-decoration-none me-1"
        >
          {lookUpdata.strArea}
        </Link>
          {lookUpdata.strYoutube && <ReactYoutubePlayer
            url={lookUpdata.strYoutube}
            controls={true}
            className="react-player mt-3 mb-2 shadow"
          />}
      </Card.Body>}
    </Card>
  );
};

export default MealDetailContent;
