import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import RenderHtml from "react-native-render-html";
import styles from "./sitecard.style";

function stripHtmlTags(str) {
  if (str === null || str === "") return false;
  else str = str.toString();
  return str.replace(/<[^>]*>/g, ""); // Regular expression to remove HTML tags
}

export default function SiteCard({ image, title, content, handleNavigate }) {
  const { width } = useWindowDimensions(); // To get the width of the device screen
  const correctedImgUrl = image.replace("localhost", "10.0.2.2");
  const plainContent = stripHtmlTags(content);
  const source = {
    html: content,
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <View contentContainerStyle={styles.container}>
        <Image
          source={
            image
              ? { uri: correctedImgUrl }
              : require("../../../../assets/images/default-museum.jpg")
          }
          style={styles.image}
        />
        <Text style={styles.siteName}>{title}</Text>
        {/* Render HTML content */}
        {/*
        <RenderHtml
          contentWidth={width}
          source={source}
          style={styles.siteText}
        />
        */}
        <Text style={styles.siteText}>{plainContent}</Text>
      </View>
    </TouchableOpacity>
  );
}
