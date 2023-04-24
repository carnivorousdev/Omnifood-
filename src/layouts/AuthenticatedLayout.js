import React, { useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './MainLayout';
import ErrorLayout from './ErrorLayout';
import { toast, ToastContainer } from 'react-toastify';
import Error404 from 'components/errors/Error404';
import Landing from 'components/dashboard/Landing';
import MealDetail from 'components/app/MealDetails/MealDetail';
import Areas from 'components/dashboard/Areas';
import Categories from 'components/dashboard/Categories';
import Profile from 'components/app/profile/Profile';
import AllBookMarksList from 'components/app/BookMarks/AllBookMarksList';
import Settings from 'components/app/profile/Settings';
import AppContext from 'context/Context';
import is from 'is_js';
import Error401 from 'components/errors/Error401';


const AuthenticatedLayout = () => {
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
          <Route path="/404" element={<Error404 />} />
          <Route path="/401" element={<Error401 />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="dashboard" element={<Landing />} />
          <Route path="mealdetails/:detailedId" element={<MealDetail />} />
          <Route path="areas/:areas" element={<Areas />} />
          <Route path="all_bookmarks" element={<AllBookMarksList />} />
          <Route path="category/:category" element={<Categories />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile/:profileName" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/401" replace />} />
      </Routes>
      <ToastContainer
        position={toast.POSITION.TOP_CENTER}
        autoClose={3000}
      />
    </>
  );
};

export default AuthenticatedLayout;
