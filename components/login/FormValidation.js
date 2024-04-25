import { useState } from "react";

// Custom hook for validating email format
export const useEmailValidation = () => {
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return false;
    }
    setEmailError("");
    return true;
  };

  return { validateEmail, emailError };
};

// Custom hook for checking required fields
export const useRequiredFieldsValidation = () => {
  const [fieldErrors, setFieldErrors] = useState({});

  const validateFields = (fields) => {
    let isValid = true;
    const errors = {};
    Object.keys(fields).forEach((key) => {
      if (fields[key].trim() === "") {
        errors[key] = "This field is required";
        isValid = false;
      }
    });
    setFieldErrors(errors);
    return isValid;
  };

  return { validateFields, fieldErrors };
};

// Custom hook for validating passwords
export const usePasswordValidation = () => {
  const [passwordError, setPasswordError] = useState("");

  const validatePasswords = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    setPasswordError("");
    return true;
  };

  return { validatePasswords, passwordError };
};
