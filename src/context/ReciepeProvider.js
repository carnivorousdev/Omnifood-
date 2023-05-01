import React, { createContext, useState } from "react";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);


    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const contextValue = {
        showModal,
        handleClose,
        handleShow,
    };

    return <RecipeContext.Provider value={contextValue}>{children}</RecipeContext.Provider>;
};