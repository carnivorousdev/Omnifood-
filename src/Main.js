import React, { useReducer, useState } from 'react';
import AppContext from 'context/Context';
import { settings } from './config';
import { getColor, getItemFromStore } from 'helpers/utils';
import { configReducer } from './reducers/configReducer';
import useToggleStyle from './hooks/useToggleStyle';

const Main = ({ children }) => {
  const [showBookMarks, setShowBookMarks] = useState([]);

  const [showCreatedRecipes, setShowCreatedRecipes] = useState([]);
  const [createdRecipesLoading, setCreatedRecipesLoading] = useState(false);

  const [recipeInfoData, setRecipeInfoData] = useState({});

  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const configState = {
    isRTL: getItemFromStore('isRTL', settings.isRTL),
    isDark: getItemFromStore('isDark', settings.isDark),
    navbarPosition: getItemFromStore('navbarPosition', settings.navbarPosition),
    isNavbarVerticalCollapsed: getItemFromStore(
      'isNavbarVerticalCollapsed',
      settings.isNavbarVerticalCollapsed
    ),
    showBurgerMenu: settings.showBurgerMenu,
    navbarCollapsed: false
  };

  const [config, configDispatch] = useReducer(configReducer, configState);

  const { isLoaded } = useToggleStyle(
    config.isRTL,
    config.isDark,
    configDispatch
  );

  const setConfig = (key, value) => {
    configDispatch({
      type: 'SET_CONFIG',
      payload: {
        key,
        value,
        setInStore: [
          'isRTL',
          'isDark',
          'navbarPosition',
          'isNavbarVerticalCollapsed',
        ].includes(key)
      }
    });
  };

  if (!isLoaded) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: config.isDark ? getColor('dark') : getColor('light')
        }}
      />
    );
  }
  const handleBookMarksData = (bookMarksData) => setShowBookMarks(bookMarksData);

  const handleCreatedRecipesData = (data) => setShowCreatedRecipes(data);
  const handleCreatedRecipesLoading = (data) => setCreatedRecipesLoading(data);


  const handleRecipeInfoData = (data) => setRecipeInfoData(data);

  const handleLoading = (loading) => setLoading(loading);

  const handleUserInfo = (userInfo) => setUserInfo(userInfo);

  const contextValue = {
    config,
    setConfig,
    configDispatch,
    showBookMarks,
    handleBookMarksData,
    handleLoading,
    loading,
    handleUserInfo,
    userInfo,
    handleRecipeInfoData,
    recipeInfoData,
    showCreatedRecipes,
    handleCreatedRecipesData,
    createdRecipesLoading,
    handleCreatedRecipesLoading
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};


export default Main;
