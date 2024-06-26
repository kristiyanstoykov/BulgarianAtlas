// LoginTab.js
import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useEmailValidation, useRequiredFieldsValidation } from "./FormValidation";
import styles from "./login.style";

const LoginTab = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { onLogin } = useAuth();

  const { validateFields, fieldErrors } = useRequiredFieldsValidation();

  const handleLoginPress = async () => {
    setIsLoading(true);
    const fields = { email, password };
    if (!validateFields(fields)) {
      Alert.alert("Грешка", "Всички полета са задължителни!");
      setIsLoading(false);
      return;
    }

    try {
      await onLogin(email, password);
    } catch (error) {
      Alert.alert("Грешка при влизане", "Неуспешно влизане. Моля, опитайте отново.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        autoCapitalize="none"
        placeholder="Потребителско име / Имейл"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="black"
        style={styles.input}
      />
      <TextInput
        secureTextEntry={true}
        autoCapitalize="none"
        value={password}
        placeholder="Парола"
        onChangeText={setPassword}
        placeholderTextColor="black"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLoginPress} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>ВЛИЗАНЕ</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginTab;
