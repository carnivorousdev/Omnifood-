import React, { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [loginLoading, setLoginLoading] = useState(false)


    const handleLoginLoading = (value) => setLoginLoading(value);

    const contextValue = {
        loginLoading,
        handleLoginLoading,
    };

    return <LoginContext.Provider value={contextValue}>{children}</LoginContext.Provider>;
};