import React, { useContext, useEffect } from 'react';
import { useNavigate, Navigate, Route, Routes } from 'react-router-dom';
import AuthSimpleLayout from './AuthSimpleLayout';
import is from 'is_js';
import MainLayout from './MainLayout';
import ErrorLayout from './ErrorLayout';
import { toast, ToastContainer } from 'react-toastify';
import Error404 from 'components/errors/Error404';
import Error500 from 'components/errors/Error500';
import SimpleLogin from 'components/authentication/simple/Login';
import SimpleRegistration from 'components/authentication/simple/Registration';
import SimpleForgetPassword from 'components/authentication/simple/ForgetPassword';
import AppContext from 'context/Context';
import { onAuthStateChanged } from "firebase/auth";
import { firestoreAuth } from 'config'
import Logo from '../assets/img/illustrations/Bg-lg.png'
import Landing from 'components/dashboard/Landing';
import MealDetail from 'components/app/MealDetails/MealDetail';
import Areas from 'components/dashboard/Areas';
import Categories from 'components/dashboard/Categories';
import Profile from 'components/app/profile/Profile';
import AllBookMarksList from 'components/app/BookMarks/AllBookMarksList';


const Layout = () => {
  const navigate = useNavigate()
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

  // useEffect(() => {
  //   onAuthStateChanged(firestoreAuth, (user) => {
  //     if (window.location.href.includes('register') || window.location.href.includes('forgot-password')) {
  //       return
  //     } else {
  //       if (user) {
  //         navigate("/dashboard")
  //         document.body.style = 'none'
  //       } else {
  //         navigate("/")
  //         document.body.style = `background: url(${Logo}) no-repeat center;
  //         background-size: cover;
  //         `
  //       }
  //     }
  //   });
  // }, [])

  return (
    <>
      <Routes>
        <Route element={<ErrorLayout />}>
          <Route path="errors/404" element={<Error404 />} />
          <Route path="errors/500" element={<Error500 />} />
        </Route>

        <Route element={<AuthSimpleLayout />}>
          <Route path="/" element={<SimpleLogin />} />
          <Route
            path="register"
            element={<SimpleRegistration />}
          />
          <Route
            path="forgot-password"
            element={<SimpleForgetPassword />}
          />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="dashboard" element={<Landing />} />
          <Route path="mealdetails/:detailedId" element={<MealDetail />} />
          <Route path="areas/:areas" element={<Areas />} />
          <Route path="all_bookmarks" element={<AllBookMarksList />} />
          <Route path="category/:category" element={<Categories />} />
          <Route path="profile/:profileName" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/errors/404" replace />} />
      </Routes>
      <ToastContainer
        position={toast.POSITION.TOP_CENTER}
        autoClose={3000}
      />
    </>
  );
};

export default Layout;
