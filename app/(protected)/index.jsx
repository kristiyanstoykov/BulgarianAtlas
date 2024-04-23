import React from "react";
import { View, SafeAreaView, Text, ScrollView, StyleSheet } from "react-native";
import { Sites } from "../../components";
import { SIZES, FONT, COLORS, icons, images } from "../../constants";

export default function HomeScreen() {
  return (
    <SafeAreaView>
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
