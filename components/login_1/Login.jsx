import React, { useState } from "react";
import {
  Animated,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";
import { useAuth } from "../../context/AuthContext";
import LoginTab from "./LoginTab";
import SigninTab from "./SigninTab";
import TabSelector from "./TabSelector";
import styles from "./login.style";

const Tab = ({ isActive, label, onPress }) => (
  <TouchableOpacity style={styles.tab} onPress={onPress}>
    <Text style={[styles.tabText, isActive && styles.activeText]}>{label}</Text>
    {isActive && <View style={[styles.underline]} />}
  </TouchableOpacity>
);

const Login = () => {
  const [currentTab, setCurrentTab] = useState("login");
  const { onLogin, authState } = useAuth();

  const [scaleAnim] = useState({
    login: new Animated.Value(1.1),
    signup: new Animated.Value(1),
  });
  const [opacityAnim] = useState({
    login: new Animated.Value(1),
    signup: new Animated.Value(0.7),
  });

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Text style={styles.header}>Bulgarian Atlas</Text>
      <TabSelector
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        scaleAnim={scaleAnim}
        opacityAnim={opacityAnim}
      />
      {currentTab === "login" && <LoginTab />}

      {currentTab === "signup" && <SigninTab />}
    </KeyboardAvoidingView>
  );
};

export default Login;
