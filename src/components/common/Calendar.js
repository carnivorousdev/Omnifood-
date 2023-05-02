import React from 'react';
import defaultBanner from 'assets/img/illustrations/meal-1.jpg';
import { Image } from 'react-bootstrap';

const Calendar = ({ strMealThumb }) => (
  <Image src={strMealThumb ? strMealThumb : defaultBanner} alt="..." className="fit-cover rounded-2" 
  height={80} width={80}/>
);

export default Calendar;
