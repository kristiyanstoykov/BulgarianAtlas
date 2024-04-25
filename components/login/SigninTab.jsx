// SignIn.js
import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useEmailValidation, usePasswordValidation, useRequiredFieldsValidation } from "./FormValidation";
import styles from "./login.style";

const SigninTab = ({ onSuccessfulSignin }) => {
  const { validateEmail, emailError } = useEmailValidation();
  const { validateFields, fieldErrors } = useRequiredFieldsValidation();
  const { validatePasswords, passwordError } = usePasswordValidation();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const { onRegister } = useAuth();

  const handleSignupPress = async () => {
    setIsLoading(true);
    const fields = { name, lastname, email, password, confirmPassword };

    // Check all required fields
    if (!validateFields(fields)) {
      Alert.alert("Грешка", "Всички полета са задължителни!");
      return;
    }

    // Validate email
    if (!validateEmail(email)) {
      Alert.alert("Моля, въведете валиден имейл адрес!", emailError);
      return;
    }

    // Check if passwords match
    if (!validatePasswords(password, confirmPassword)) {
      Alert.alert("Моля, сверете паролите!", passwordError);
      return;
    }

    // If all checks pass, proceed with the signup
    try {
      await onRegister(name, lastname, email, password);
      onSuccessfulSignin();
    } catch (error) {
      console.error("Регистрацията е неуспешна:", error);
      Alert.alert("Грешка", "Регистрацията е неуспешна. Моля, опитайте отново.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        autoCapitalize="none"
        value={name}
        onChangeText={setName}
        placeholder="Име"
        placeholderTextColor="black"
        style={styles.input}
      />
      <TextInput
        autoCapitalize="none"
        value={lastname}
        onChangeText={setLastname}
        style={styles.input}
        placeholder="Фамилия"
        placeholderTextColor="black"
      />
      <TextInput
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="Имейл"
        placeholderTextColor="black"
      />
      <TextInput
        autoCapitalize="none"
        secureTextEntry={true}
        value={password}
        placeholder="Парола"
        onChangeText={setPassword}
        placeholderTextColor="black"
        style={styles.input}
      />
      <TextInput
        autoCapitalize="none"
        secureTextEntry={true}
        value={confirmPassword}
        placeholder="Потвърдете паролата"
        onChangeText={setConfirmPassword}
        placeholderTextColor="black"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignupPress} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>РЕГИСТРАЦИЯ</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SigninTab;
