import React, { createContext, useState } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profileLoading, setprofileLoading] = useState(false)

    const handleProfileLoading = (value) => setprofileLoading(value);

    const contextValue = {
        profileLoading,
        handleProfileLoading,
    };

    return <ProfileContext.Provider value={contextValue}>{children}</ProfileContext.Provider>;
};