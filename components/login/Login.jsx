import React, { useState } from "react";
import { Animated, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";
import styles from "./login.style";

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
          <TouchableOpacity onPress={() => handleTabChange("login")}>
            <Text style={styles.tabText}>LOGIN</Text>
          </TouchableOpacity>
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
          <TouchableOpacity onPress={() => handleTabChange("signup")}>
            <Text style={styles.tabText}>SIGN UP</Text>
          </TouchableOpacity>
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
          <View style={styles.forget}>
            <TouchableOpacity onPress={() => setCurrentTab("forget")}>
              <Text style={styles.linkText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
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

      {currentTab === "forget" && (
        <View style={styles.form}>
          <Text style={styles.normalText}>
            To reset your password enter your email we'll send you a link to reset your password.
          </Text>
          <TextInput style={styles.input} placeholder="EMAIL ADDRESS" placeholderTextColor="#708B75" />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>RESET PASSWORD</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Login;
