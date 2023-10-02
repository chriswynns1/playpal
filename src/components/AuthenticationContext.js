// AuthenticationContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthenticationContext = createContext();

export const useAuth = () => {
  return useContext(AuthenticationContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Set the user data received from the server
    setUser(userData);
  };

  const logout = () => {
    // Clear user data (sign out)
    setUser(null);
  };

  return (
    <AuthenticationContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
