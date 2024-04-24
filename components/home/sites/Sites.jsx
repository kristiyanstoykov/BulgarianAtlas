import React from "react";
import { useRouter } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import SiteCard from "../../common/cards/site/SiteCard";
import styles from "./sites.style";

export default function Sites({ data, isLoading, error }) {
  const router = useRouter();

  return (
    <View style={styles.postContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : data && data.length > 0 ? (
        data.map((item) => (
          <SiteCard
            key={item.postId.toString()}
            image={item.image}
            title={item.postTitle}
            content={item.postExcerpt}
            google_maps_link={item.google_maps_link}
            distance={item.distance}
            handleNavigate={() => router.push(`/site-details/${item.postId}`)}
          />
        ))
      ) : (
        <Text>No posts found.</Text>
      )}
    </View>
  );
}
