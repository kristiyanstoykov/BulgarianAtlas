import axios from "axios";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScreenHeaderBtn } from "../../components";
import { COLORS, FONT, SIZES, icons } from "../../constants";
import { stripHtmlTags } from "../../utils";
import styles from "./site-details.style";

const SiteDetails = () => {
  const [betterData, setBetterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const params = useLocalSearchParams();

  useEffect(() => {
    const fetchAndProcessPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://bulgarian-atlas.nst.bg/wp-json/wp/v2/posts/${params.id}?_embed`
        );

        const prettierData = {
          postId: params.id,
          postTitle: response.data["title"]["rendered"],
          postExcerpt: stripHtmlTags(response.data["excerpt"]["rendered"]),
          postContent: stripHtmlTags(response.data["content"]["rendered"]),
          google_maps_link: response.data["acf"]
            ? response.data["acf"]["google-link-field"] ?? ""
            : "",
          image: response.data._embedded["wp:featuredmedia"]
            ? response.data._embedded["wp:featuredmedia"][0].source_url
            : "",
        };
        setBetterData(prettierData);
      } catch (err) {
        setError("Неуспешно извличане на обекти. Моля, опитайте отново.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcessPosts();
  }, []);

  const handleMapLinkPress = () => {
    if (betterData.google_maps_link) {
      Linking.openURL(betterData.google_maps_link).catch((err) => {
        Alert.alert("Неуспешно отваряне на линк", err.message);
      });
    } else {
      Alert.alert("Няма наличен линк");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: true,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.bulgarianAtlas} dimension="80%" />
          ),
          headerTitle: `${betterData.postTitle}`,
          headerTitleAlign: "center",
        }}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : betterData ? (
        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.infoContainer}>
            <Image
              source={
                betterData.image
                  ? { uri: betterData.image }
                  : require("../../assets/images/default-museum.jpg")
              }
              style={styles.image}
            />

            {betterData.google_maps_link && (
              <TouchableOpacity
                style={styles.btnMaps}
                onPress={handleMapLinkPress}
              >
                <Text style={styles.btnMapsText}>Линк към Google Maps </Text>
              </TouchableOpacity>
            )}
            <Text style={styles.postTitle}>{betterData.postTitle}</Text>
            <Text style={styles.contentText}>{betterData.postContent}</Text>
          </View>
        </ScrollView>
      ) : (
        <Text>No post found.</Text>
      )}
    </SafeAreaView>
  );
};

export default SiteDetails;
