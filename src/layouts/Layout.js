import React, { useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthSimpleLayout from './AuthSimpleLayout';
import is from 'is_js';
import MainLayout from './MainLayout';
import ErrorLayout from './ErrorLayout';
import { toast, ToastContainer } from 'react-toastify';
import { CloseButton } from 'components/common/Toast';
import CreateEvent from 'components/app/events/create-an-event/CreateEvent';
import EventList from 'components/app/events/event-list/EventList';
import EventDetail from 'components/app/events/event-detail/EventDetail';
import Error404 from 'components/errors/Error404';
import Error500 from 'components/errors/Error500';
import SimpleLogin from 'components/authentication/simple/Login';
import SimpleLogout from 'components/authentication/simple/Logout';
import SimpleRegistration from 'components/authentication/simple/Registration';
import SimpleForgetPassword from 'components/authentication/simple/ForgetPassword';
import SimplePasswordReset from 'components/authentication/simple/PasswordReset';
import SimpleLockScreen from 'components/authentication/simple/LockScreen';
import CardLogin from 'components/authentication/card/Login';
import Logout from 'components/authentication/card/Logout';
import CardRegistration from 'components/authentication/card/Registration';
import CardForgetPassword from 'components/authentication/card/ForgetPassword';
import CardPasswordReset from 'components/authentication/card/PasswordReset';
import CardLockScreen from 'components/authentication/card/LockScreen';
import Dashboard from 'components/dashboards/default';
import AppContext from 'context/Context';

const Layout = () => {
  const HTMLClassList = document.getElementsByTagName('html')[0].classList;
  useContext(AppContext);

  useEffect(() => {
    if (is.windows()) {
      HTMLClassList.add('windows');
    }
    if (is.chrome()) {
      HTMLClassList.add('chrome');
    }
    if (is.firefox()) {
      HTMLClassList.add('firefox');
    }
  }, [HTMLClassList]);

  return (
    <>
      <Routes>
        <Route element={<ErrorLayout />}>
          <Route path="errors/404" element={<Error404 />} />
          <Route path="errors/500" element={<Error500 />} />
        </Route>
        {/*- ------------- Authentication ---------------------------  */}

        {/*- ------------- simple ---------------------------  */}
        <Route element={<AuthSimpleLayout />}>
          <Route path="authentication/simple/login" element={<SimpleLogin />} />
          <Route
            path="authentication/simple/register"
            element={<SimpleRegistration />}
          />
          <Route
            path="authentication/simple/logout"
            element={<SimpleLogout />}
          />
          <Route
            path="authentication/simple/forgot-password"
            element={<SimpleForgetPassword />}
          />
          <Route
            path="authentication/simple/reset-password"
            element={<SimplePasswordReset />}
          />

          <Route
            path="authentication/simple/lock-screen"
            element={<SimpleLockScreen />}
          />
        </Route>

        {/*- ------------- Card ---------------------------  */}
        <Route path="authentication/card/login" element={<CardLogin />} />
        <Route
          path="authentication/card/register"
          element={<CardRegistration />}
        />
        <Route path="authentication/card/logout" element={<Logout />} />
        <Route
          path="authentication/card/forgot-password"
          element={<CardForgetPassword />}
        />
        <Route
          path="authentication/card/reset-password"
          element={<CardPasswordReset />}
        />
        <Route
          path="authentication/card/lock-screen"
          element={<CardLockScreen />}
        />

        {/* //--- MainLayout Starts  */}

        <Route element={<MainLayout />}>
          {/*Dashboard*/}
          <Route path="/" element={<Dashboard />} />
          {/*App*/}
          <Route path="events/event-detail" element={<EventDetail />} />
          <Route path="events/create-an-event" element={<CreateEvent />} />
          <Route path="events/event-list" element={<EventList />} />
        </Route>

        {/* //--- MainLayout end  */}

        {/* <Navigate to="/errors/404" /> */}
        <Route path="*" element={<Navigate to="/errors/404" replace />} />
      </Routes>
      <ToastContainer
        closeButton={CloseButton}
        icon={false}
        position={toast.POSITION.BOTTOM_LEFT}
      />
    </>
  );
};

export default Layout;
