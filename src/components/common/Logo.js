import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from 'context/Context';
import { LoginContext } from 'context/LoginProvider';

const Logo = ({ at, width, className, textClass, ...rest }) => {
  const {
    config: { isDark },
    loading,
    userInfo
  } = useContext(AppContext);

  const { loginLoading } = useContext(LoginContext)

  const logo = 'https://i.ibb.co/Qk4F3rb/omnifood-logo.webp'
  const logoWt = 'https://i.ibb.co/NNLgxcD/omnifood-logo-wt.webp'

  return (
    <>
      {loading ? <Link
        to='#!'
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
          <img className="me-2 font-sans-serif" src={!isDark ? logo : logoWt} alt="Logo" width={width ? width : 300} />
        </div>
      </Link> : <>
        {Object.keys(userInfo).length > 0 ? <Link
          to={loginLoading ? '#!' : '/dashboard'}
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
            <img className="me-2 font-sans-serif" src={!isDark ? logo : logoWt} alt="Logo" width={width ? width : 300} />
          </div>
        </Link> : <Link
          to={loginLoading ? '#!' : '/login'}
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
            <img className="me-2 font-sans-serif" src={logoWt} alt="Logo" width={width ? width : 300} />
          </div>
        </Link>}
      </>}
    </>
  );
};

Logo.propTypes = {
  at: PropTypes.oneOf(['navbar-vertical', 'navbar-top', 'auth']),
  width: PropTypes.number,
  className: PropTypes.string,
  textClass: PropTypes.string
};

export default Logo;
