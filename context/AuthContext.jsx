import axios from "axios";
import { encode as btoa } from "base-64";
import { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import { WORDPRESS_API_KEY, WORDPRESS_API_USERNAME } from "../env";
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
        "https://bulgarian-atlas.nst.bg/wp-json/jwt-auth/v1/token",
        {
          username,
          password,
        }
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

  const register = async (name, lastname, email, password) => {
    try {
      const username = email.split("@")[0];
      const token = btoa(`${WORDPRESS_API_USERNAME}:${WORDPRESS_API_KEY}`);

      const response = await axios.post(
        "https://bulgarian-atlas.nst.bg/wp-json/wp/v2/users",
        {
          username: username,
          first_name: name,
          last_name: lastname,
          email: email,
          password: password,
        },
        {
          headers: {
            Authorization: `Basic ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        Alert.alert(
          "Registration Successful",
          "You have registered successfully! Now you need to Login."
        );
      } else {
        throw new Error(
          "Registration failed with status code: " + response.status
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert(
        "Registration Failed",
        error.response
          ? error.response.data.message
          : "An error occurred during registration"
      );
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
    onRegister: register,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
