import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactYoutubePlayer from 'react-player/youtube';
import { useMediaQuery, useTheme } from '@mui/material';

const MealDetailContent = ({ lookUpdata }) => {
  const config = {
    youtube: {
      playerVars: {
        modestbranding: 1,
        disableAds: 1,
        origin: window.location.origin
      },
    },
  };

  const opts = {
    playerVars: {
      origin: window.location.origin
    }
  };
  const truncateText = (text) => {
    const truncatedText = text.length > 25 ? `${text.slice(0, 50)}...` : text
    return truncatedText
  }


  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Card className='mt-3'>
      {lookUpdata && <Card.Body>
        <h5 className="fs-0">Instructions</h5>
        <hr />
        <p dangerouslySetInnerHTML={{ __html: lookUpdata.strInstructions }} />
        <h5 className="fs-0 mt-5 mb-2 ">Tags </h5>
        {lookUpdata.strTags && <span
          className="badge border link-secondary text-decoration-none me-1"
        >
          {isMatch ? truncateText(lookUpdata.strTags) : lookUpdata.strTags.replace(/,/g, ', ')}
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
          opts={opts}
          config={config}
          controls={true}
          className="react-player mt-3"
        />}
      </Card.Body>}
    </Card>
  );
};

export default MealDetailContent;
