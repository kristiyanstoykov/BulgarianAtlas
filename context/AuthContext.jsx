import { createContext, useContext, useState } from "react";
import axios from "axios";
import { Alert } from "react-native";
import { stripHtmlTags } from "../utils";

export const ROLES = {
  ADMIN: "administrator",
  EDITOR: "editor",
  USER: "subscriber",
};

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user_id: null,
    authenticated: null,
    userEmail: null,
    username: null,
    userFirstName: null,
    userLastName: null,
    role: null,
  });

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        "http://10.0.2.2/bulgarian-atlas/wp-json/jwt-auth/v1/token",
        { username, password }
      );
      const data = response.data;
      if (response.status === 200) {
        const { token, profile } = response.data;
        const {
          user_nicename,
          roles,
          user_first_name,
          user_last_name,
          user_email,
          id,
        } = profile;

        const userRole =
          roles.find((role) => Object.values(ROLES).includes(role)) ||
          ROLES.USER;

        setAuthState({
          authenticated: true,
          username: user_nicename,
          role: userRole,
          userFirstName: user_first_name,
          userLastName: user_last_name,
          userEmail: user_email,
          user_id: id,
          token: token,
        });
      } else {
        throw new Error(
          "Failed to log in with status code: " + response.status
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert(
        "Login Failed",
        error.response
          ? stripHtmlTags(error.response.data.message)
          : "Login failed due to network error"
      );

      setAuthState({
        user_id: null,
        authenticated: null,
        userEmail: null,
        username: null,
        userFirstName: null,
        userLastName: null,
        role: null,
      });
    }
  };

  const logout = () => {
    setAuthState({
      authenticated: false,
      username: null,
      role: null,
    });
  };

  const value = {
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
