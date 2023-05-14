import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Flex from 'components/common/Flex';
import LoginForm from 'components/authentication/LoginForm';
import { LoginContext } from 'context/LoginProvider';

const Login = () => {
  const { loginLoading } = useContext(LoginContext)

  return (
    <>
      <Flex justifyContent="between" alignItems="center" className="mb-2">
        <h5>Log in</h5>
        {loginLoading ? '' : <p className="fs--1 text-600 mb-0">
          or <Link to="/register">Sign up</Link>
        </p>}
      </Flex>
      <LoginForm />
    </>
  )
}

export default Login;
