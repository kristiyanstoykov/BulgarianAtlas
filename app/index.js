import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { NearbySites, ScreenHeaderBtn, Welcome } from "../components";
import { COLORS, SIZES, images, icons } from "../constants";

// import { useFetch } from "../hooks";

export default function Home() {
  const router = useRouter();

  // const { data, isLoading, error } = useFetch("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{ headerStyle: { backgroundColor: COLORS.lightWhite } }}
      />
    </SafeAreaView>
  );
}
