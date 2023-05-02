import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthSimpleLayout from './AuthSimpleLayout';
import MainLayout from './MainLayout';
import ErrorLayout from './ErrorLayout';
import { toast, ToastContainer } from 'react-toastify';
import Error404 from 'components/errors/Error404';
import SimpleLogin from 'components/authentication/simple/Login';
import SimpleRegistration from 'components/authentication/simple/Registration';
import SimpleForgetPassword from 'components/authentication/simple/ForgetPassword';
import is from 'is_js';
import Landing from 'components/dashboard/Landing';
import MealDetail from 'components/app/MealDetails/MealDetail';
import Areas from 'components/dashboard/Areas';
import Categories from 'components/dashboard/Categories';
import Profile from 'components/app/profile/Profile';
import AllBookMarksList from 'components/app/BookMarks/AllBookMarksList';
import Settings from 'components/app/profile/Settings';
import WithoutAuthLanding from 'components/landing/Landing';
import Error401 from 'components/errors/Error401';
import CreateRecipe from 'components/app/CreateRecipe/CreateRecipe';
import Ingredients from 'components/dashboard/Ingredient';
import RecipeDetails from 'components/app/RecipeDetails/RecipeDetails';


const Layout = () => {
  const HTMLClassList = document.getElementsByTagName('html')[0].classList;
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
          <Route path="/dashboard" element={<Landing />} />
          <Route path="/mealdetails/:detailedId" element={<MealDetail />} />
          <Route path="/areas/:areas" element={<Areas />} />
          <Route path="/category/:category" element={<Categories />} />
          <Route path="/ingredient/:ingredient" element={<Ingredients />} />
          <Route path="/myRecipe/:recipeName/:recipeId" element={<RecipeDetails />} />
          <Route path="/all_bookmarks" element={<AllBookMarksList />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile/:profileName" element={<Profile />} />
          <Route path="/createRecipe" element={<CreateRecipe />} />
        </Route>

        <Route path="/" element={<WithoutAuthLanding />} />
        <Route element={<AuthSimpleLayout />}>
          <Route path="/login" element={<SimpleLogin />} />
          <Route
            path="/register"
            element={<SimpleRegistration />}
          />
          <Route
            path="/forgot-password"
            element={<SimpleForgetPassword />}
          />
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

export default Layout;
