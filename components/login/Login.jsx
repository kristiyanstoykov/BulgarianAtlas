import React, { useState } from "react";
import {
  Animated,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONT, SIZES, icons } from "../../constants";
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

  const [scaleAnim] = useState({
    login: new Animated.Value(1.1),
    signup: new Animated.Value(1),
  });
  const [opacityAnim] = useState({
    login: new Animated.Value(1),
    signup: new Animated.Value(0.7),
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          source={icons.bulgarianAtlas}
          style={{ width: 75, height: 75 }} // Adjust size as necessary
          resizeMode="contain"
        />
        <Text style={styles.header}>Bulgarian Atlas</Text>
      </View>
      <TabSelector
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        scaleAnim={scaleAnim}
        opacityAnim={opacityAnim}
      />
      {currentTab === "login" && <LoginTab />}

      {currentTab === "signup" && (
        <SigninTab onSuccessfulSignin={() => setCurrentTab("login")} />
      )}
    </KeyboardAvoidingView>
  );
};

export default Login;
