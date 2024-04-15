import React from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";
import RenderHtml from "react-native-render-html";
import styles from "./sitecard.style";

export default function SiteCard({ image, title, content }) {
  const { width } = useWindowDimensions(); // To get the width of the device screen
  const correctedImgUrl = image.replace("localhost", "10.0.2.2");
  const source = {
    html: content,
  };

  return (
    <View contentContainerStyle={styles.container}>
      <Image
        source={
          image
            ? { uri: correctedImgUrl }
            : require("../../../../assets/images/kemal.jpg")
        }
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
      {/* Render HTML content */}
      <RenderHtml contentWidth={width} source={source} />
    </View>
  );
}
