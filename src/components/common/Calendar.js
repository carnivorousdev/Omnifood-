import React from 'react';
import { Image } from 'react-bootstrap';
import defaultBanner from 'assets/img/illustrations/meal-1.jpg';

const Calendar = ({ strMealThumb }) => (
  <div className="calendar">
    <Image src={strMealThumb ? strMealThumb : defaultBanner} alt="..." className="card-img-top rounded fluid" />
  </div>
);

export default Calendar;
