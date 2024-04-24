import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./sitecard.style";
import { stripHtmlTags } from "../../../../utils";

export default function SiteCard({
  image,
  title,
  content,
  google_maps_link,
  distance,
  handleNavigate,
}) {
  const plainContent = stripHtmlTags(content);
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <View contentContainerStyle={styles.container}>
        <Image
          source={
            image
              ? { uri: image }
              : require("../../../../assets/images/default-museum.jpg")
          }
          style={styles.image}
        />
        <Text style={styles.siteName}>{title}</Text>
        <Text style={styles.siteText}>{plainContent}</Text>
        {distance !== Infinity && distance != null && (
          <Text style={styles.siteText}>Distance: {distance} km</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
