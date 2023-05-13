import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Calendar = ({ strMealThumb }) => (
  <LazyLoadImage
    src={strMealThumb ? strMealThumb :
      'https://i.ibb.co/TMC9j4z/meal-1.webp'}
    effect='blur'
    alt="..." className="fit-cover rounded-2"
    height={80}
    width={80}
  />
);

export default Calendar;
