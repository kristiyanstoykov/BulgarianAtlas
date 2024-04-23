// SignIn.js
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEmailValidation, usePasswordValidation, useRequiredFieldsValidation } from "./FormValidation";
import styles from "./login.style";

const SigninTab = ({ onLogin }) => {
  const { validateEmail, emailError } = useEmailValidation();
  const { validateFields, fieldErrors } = useRequiredFieldsValidation();
  const { validatePasswords, passwordError } = usePasswordValidation();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignupPress = async () => {
    const fields = { name, lastname, email, password, confirmPassword };

    // Check all required fields
    if (!validateFields(fields)) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    // Validate email
    if (!validateEmail(email)) {
      Alert.alert("Please, enter a valid email address!", emailError);
      return;
    }

    // Check if passwords match
    if (!validatePasswords(password, confirmPassword)) {
      Alert.alert("Please, match the password!", passwordError);
      return;
    }

    // If all checks pass, proceed with the signup
    try {
      await onSignup(email, password); // Assuming `onSignup` is your signup function
      console.log("Signup successful!");
    } catch (error) {
      console.error("Signup failed:", error);
      Alert.alert("Error", "Signup failed. Please try again.");
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        placeholderTextColor="black"
        style={styles.input}
      />
      <TextInput
        value={lastname}
        onChangeText={setLastname}
        style={styles.input}
        placeholder="Lastname"
        placeholderTextColor="black"
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="black"
      />
      <TextInput
        secureTextEntry={true}
        value={password}
        placeholder="Password"
        onChangeText={setPassword}
        placeholderTextColor="black"
        style={styles.input}
      />
      <TextInput
        secureTextEntry={true}
        value={confirmPassword}
        placeholder="Confirm Password"
        onChangeText={setConfirmPassword}
        placeholderTextColor="black"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignupPress}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SigninTab;
