import React, { createContext, useState } from "react";

// Create a context with initial state
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  // State for user and authentication status
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const logout = () => {
    setIsLogin(false);
    setUser(null);
    // Add any other logout logic here
  };

  // Example context value
  const contextValue = {
    isLogin,
    setIsLogin,
    user,
    setUser,
    logout,
    loading,
    setLoading // Keep this if you plan to use it elsewhere
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
