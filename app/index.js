import React from "react";
import { Text, View, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { SIZES, FONT, COLORS, icons, images } from "../constants";
import { Sites, ScreenHeaderBtn } from "../components";
import { useAuth } from "../context/AuthContext";
import Login from "../components/login/Login";

export default function Home() {
  return (
    <Login />
    // <SafeAreaView>
    //   <ScrollView showsHorizontalScrollIndicator={true}>
    //     <View style={styles.container}>
    //       <Text style={styles.header}>Bulgarian culture</Text>
    //       <Sites />
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    overflow: "hidden",
  },
  header: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.bold,
  },
  error: {
    color: "red",
  },
});
