import { createContext, useContext, useState } from "react";

import {
  login as loginService,
  logout as logoutService,
  signup as signupService,
  forgotPassword as forgotPasswordService,
  resetPassword as resetPasswordService,
  getCurrentUser,
  updateProfile as updateProfileService,
} from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getCurrentUser());
  const isAuthenticated = !!user;

  const login = (email, password) => {
    try {
      const loggedInUser = loginService(email, password);

      setUser(loggedInUser);

      return loggedInUser;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  const signup = (data) => {
    try {
      return signupService(data);
    } catch (error) {
      throw error;
    }
  };

  const forgotPassword = (email) => {
    try {
      return forgotPasswordService(email);
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = (email, currentPassword, newPassword) => {
    try {
      return resetPasswordService(email, currentPassword, newPassword);
    } catch (error) {
      throw error;
    }
  };
  const updateProfile = (data) => {
    const updatedUser = updateProfileService(data);

    setUser(updatedUser);

    return updatedUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        signup,
        forgotPassword,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
