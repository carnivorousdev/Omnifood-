import React from 'react';
import Flex from 'components/common/Flex';
import { Link } from 'react-router-dom';
import Calendar from 'components/common/Calendar';
import moment from 'moment';

const BookMark = ({ details, isLast }) => {
  const {
    dateModified,
    strMealThumb,
    strMeal,
    strCategory,
    strArea,
    idMeal,
    strTags,
  } = details;
  const uuidv4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[8|9|aA|bB][0-9a-f]{3}-[0-9a-f]{12}$/;

  const isUuidv4 = (id) => {
    return uuidv4Regex.test(id);
  }
  const truncateText = (text) => {
    const truncatedText = text.length > 25 ? `${text.slice(0, 25)}...` : text
    return truncatedText
  }

  return (
    <Flex>
      <Calendar strMealThumb={isUuidv4(idMeal) ? strMealThumb[0].preview : strMealThumb} />
      <div className="flex-1 position-relative ps-3">
        <h6 className="fs-0">
          <Link to={isUuidv4(idMeal) ? `/myRecipe/${strMeal}/${idMeal}` : `/mealdetails/${idMeal}`}>
            <span className="me-1">{strMeal}</span>
          </Link>
        </h6>
        <div className="mb-1">
          {strTags &&
            <span
              className="badge border text-secondary text-decoration-none me-1"
            >
              {truncateText(strTags)}
            </span>
          }
          {isUuidv4(idMeal) ? <>
            {strCategory &&
              <span
                className="badge border text-info text-decoration-none me-1"
              >
                {truncateText(strCategory)}
              </span>
            }
          </> : <Link
            to={`/category/${strCategory}`}
            className="badge border link-info text-decoration-none me-1"
          >
            {truncateText(strCategory)}
          </Link>}
          {isUuidv4(idMeal) ? <>
            {strArea &&
              <span
                className="badge border text-success text-decoration-none me-1"
              >
                {truncateText(strArea)}
              </span>
            }
          </> : <Link
            to={`/areas/${strArea}`}
            className="badge border link-success text-decoration-none me-1"
          >
            {truncateText(strArea)}
          </Link>}
        </div>

        <p className="badge border text-warning text-decoration-none mb-0">Created on: {moment(dateModified.toDate()).format('DD-MMM-YYYY')}</p>
        {!isLast && <div className="border-dashed-bottom my-3"></div>}
      </div>
    </Flex>
  );
};

export default BookMark;
