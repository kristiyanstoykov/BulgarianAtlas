import React from "react";
import { Text, View, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { SIZES, FONT, COLORS, icons, images } from "../constants";
import { Sites, ScreenHeaderBtn } from "../components";

export default function Home() {
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: "Home",
          headerTitleAlign: "center",
        }}
      />
      <ScrollView showsHorizontalScrollIndicator={true}>
        <View style={styles.container}>
          <Text style={styles.header}>Bulgarian culture</Text>
          <Sites />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
