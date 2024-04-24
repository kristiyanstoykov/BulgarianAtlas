import React from "react";
import { StyleSheet } from "react-native";
import { SIZES, FONT } from "../constants";
import Login from "../components/login/Login";

export default function Home() {
  return <Login />;
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
