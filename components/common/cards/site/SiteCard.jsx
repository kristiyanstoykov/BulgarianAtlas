import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./sitecard.style";

function stripHtmlTags(str) {
  if (str === null || str === "") return false;
  else str = str.toString();
  return str.replace(/<[^>]*>/g, ""); // Regular expression to remove HTML tags
}

export default function SiteCard({ image, title, content, handleNavigate }) {
  const correctedImgUrl = image.replace("localhost", "10.0.2.2");
  const plainContent = stripHtmlTags(content);
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
        <Text style={styles.siteText}>{plainContent}</Text>
      </View>
    </TouchableOpacity>
  );
}
