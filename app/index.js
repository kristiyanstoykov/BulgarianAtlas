import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Login, ScreenHeaderBtn, Sites } from "../components";
import { COLORS, FONT, SIZES, icons, images } from "../constants";

export default function Home() {
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />,
          headerRight: () => <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />,
          headerTitle: "Home",
          headerTitleAlign: "center",
        }}
      />
      <ScrollView showsHorizontalScrollIndicator={true}>
        <View style={styles.container}>
          <Text style={styles.header}>Bulgarian culture</Text>
          {/* <Sites /> */}
          <Login />
        </View>
      </ScrollView>
    </SafeAreaView>
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
