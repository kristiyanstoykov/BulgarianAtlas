import React from "react";
import { SafeAreaView, Text, Image, StyleSheet } from "react-native";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import { FONT, SIZES } from "../../../constants";

export default function Post({ image, title, content }) {
  const { width } = useWindowDimensions(); // To get the width of the device screen

  const source = {
    html: content,
  };

  return (
    <SafeAreaView style={styles.postContainer}>
      <Image
        source={
          image ? { uri: image } : require("../../../assets/images/kemal.jpg")
        }
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
      {/* Render HTML content */}
      <RenderHtml contentWidth={width} source={source} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200, // Fixed height for images
    resizeMode: "cover",
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
  },
});
