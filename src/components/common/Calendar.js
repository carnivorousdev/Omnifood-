import React from 'react';
import defaultBanner from 'assets/img/illustrations/meal-1.jpg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Calendar = ({ strMealThumb }) => (
  <LazyLoadImage
    src={strMealThumb ? strMealThumb : defaultBanner}
    effect='blur'
    alt="..." className="fit-cover rounded-2"
    height={80}
    width={80}
  />
);

export default Calendar;
