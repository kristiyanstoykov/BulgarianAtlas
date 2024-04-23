// LoginTab.js
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useEmailValidation, useRequiredFieldsValidation } from "./FormValidation";
import styles from "./login.style";

const LoginTab = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = useAuth();

  const { validateFields, fieldErrors } = useRequiredFieldsValidation();

  const handleLoginPress = async () => {
    const fields = { email, password };
    if (!validateFields(fields)) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      await onLogin(email, password);
    } catch (error) {
      Alert.alert("Login Error", "Login failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        autoCapitalize="none"
        placeholder="Username / Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="black"
        style={styles.input}
      />
      <TextInput
        secureTextEntry={true}
        value={password}
        placeholder="Password"
        onChangeText={setPassword}
        placeholderTextColor="black"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginTab;
