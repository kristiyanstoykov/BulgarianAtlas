import React, { useState } from "react";
import { Animated, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";
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

  const animateTab = (active, inactive) => {
    Animated.parallel([
      Animated.timing(scaleAnim[active], {
        toValue: 1.1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim[active], {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim[inactive], {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim[inactive], {
        toValue: 0.7,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    if (tab === "login") {
      animateTab("login", "signup");
    } else {
      animateTab("signup", "login");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <Animated.View
          style={[
            styles.tab,
            {
              transform: [{ scale: scaleAnim.login }],
              opacity: opacityAnim.login,
            },
          ]}
        >
          <Tab isActive={currentTab === "login"} label="LOGIN" onPress={() => handleTabChange("login")} />
        </Animated.View>
        <Animated.View
          style={[
            styles.tab,
            {
              transform: [{ scale: scaleAnim.signup }],
              opacity: opacityAnim.signup,
            },
          ]}
        >
          <Tab isActive={currentTab === "signup"} label="SIGN UP" onPress={() => handleTabChange("signup")} />
        </Animated.View>
      </View>
      {currentTab === "login" && (
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="EMAIL ADDRESS" placeholderTextColor="black" />
          <TextInput style={styles.input} placeholder="PASSWORD" placeholderTextColor="black" secureTextEntry={true} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log("Logging in...");
            }}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentTab === "signup" && (
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="NAME" placeholderTextColor="black" />
          <TextInput style={styles.input} placeholder="EMAIL ADDRESS" placeholderTextColor="black" />
          <TextInput style={styles.input} placeholder="PASSWORD" placeholderTextColor="black" secureTextEntry={true} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log("Signing up...");
            }}
          >
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Login;
