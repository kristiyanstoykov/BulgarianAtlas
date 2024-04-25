// TabSelector.js
import React from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import styles from "./login.style";

const Tab = ({ isActive, label, onPress, animatedStyle }) => (
  <Animated.View style={[styles.tab, animatedStyle]}>
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.tabText, isActive && styles.activeText]}>{label}</Text>
      {isActive && <View style={styles.underline} />}
    </TouchableOpacity>
  </Animated.View>
);

const TabSelector = ({ currentTab, setCurrentTab, scaleAnim, opacityAnim }) => {
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
    if (tab !== currentTab) {
      setCurrentTab(tab);
      animateTab(tab, tab === "login" ? "signup" : "login");
    }
  };

  return (
    <View style={styles.tabs}>
      <Tab
        isActive={currentTab === "login"}
        label="ВЛИЗАНЕ"
        onPress={() => handleTabChange("login")}
        animatedStyle={{
          transform: [{ scale: scaleAnim.login }],
          opacity: opacityAnim.login,
        }}
      />
      <Tab
        isActive={currentTab === "signup"}
        label="РЕГИСТРАЦИЯ"
        onPress={() => handleTabChange("signup")}
        animatedStyle={{
          transform: [{ scale: scaleAnim.signup }],
          opacity: opacityAnim.signup,
        }}
      />
    </View>
  );
};

export default TabSelector;
