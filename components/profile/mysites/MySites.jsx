import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useAuth, ROLES } from "../../../context/AuthContext";
import { FONT, SIZES, COLORS } from "../../../constants";
import SiteCard from "../../common/cards/site/SiteCard";
import { useRouter } from "expo-router";

export default function MySites({ betterData, isLoading, error }) {
  const { authState } = useAuth();
  const router = useRouter();
  return (
    <>
      <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.large }}>
        Моите обекти:
      </Text>
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : betterData.length > 0 ? (
          <>
            {betterData.map((item) => (
              <SiteCard
                key={item.postId.toString()}
                image={item.image}
                title={item.postTitle}
                content={item.postExcerpt}
                google_maps_link={item.google_maps_link}
                handleNavigate={() =>
                  router.push(`/site-details/${item.postId}`)
                }
              />
            ))}
          </>
        ) : (
          <Text>Нямате качени обекти.</Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.small,
    margin: SIZES.large,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    overflow: "hidden", // You might not need overflow hidden here
    padding: 50,
  },
  image: {
    width: "100%",
    height: 200, // Fixed height for images
    resizeMode: "cover",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
});
