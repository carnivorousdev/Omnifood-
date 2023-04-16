import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import logo from 'assets/img/illustrations/omnifood-logo.png';
import { firestoreAuth } from 'config'
import { onAuthStateChanged } from 'firebase/auth';

const Logo = ({ at, width, className, textClass, ...rest }) => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    onAuthStateChanged(firestoreAuth, (user) => {
      if (user) {
        setUserData(user)
      } else {
        setUserData(null)
      }
    });
  }, [])

  return (
    <>
      {userData ? <Link
        to='/dashboard'
        className={classNames(
          'text-decoration-none',
          { 'navbar-brand text-left': at === 'navbar-vertical' },
          { 'navbar-brand text-left': at === 'navbar-top' }
        )}
        {...rest}
      >
        <div
          className={classNames(
            'd-flex',
            {
              'align-items-center py-4': at === 'navbar-vertical',
              'align-items-center': at === 'navbar-top',
              'flex-center fw-bolder fs-5 mb-4': at === 'auth'
            },
            className
          )}
        >
          <img className="me-2 font-sans-serif" src={logo} alt="Logo" width={width ? width : 300} />
        </div>
      </Link> : <Link
        to='/'
        className={classNames(
          'text-decoration-none',
          { 'navbar-brand text-left': at === 'navbar-vertical' },
          { 'navbar-brand text-left': at === 'navbar-top' }
        )}
        {...rest}
      >
        <div
          className={classNames(
            'd-flex',
            {
              'align-items-center py-4': at === 'navbar-vertical',
              'flex-center fw-bolder fs-5 mb-4': at === 'auth'
            },
            className
          )}
        >
          <img className="me-2 font-sans-serif" src={logo} alt="Logo" width={width ? width : 300} />
        </div>
      </Link>}
    </>

  );
};

Logo.propTypes = {
  at: PropTypes.oneOf(['navbar-vertical', 'navbar-top', 'auth']),
  width: PropTypes.number,
  className: PropTypes.string,
  textClass: PropTypes.string
};

Logo.defaultProps = { at: 'auth', width: 58 };

export default Logo;
