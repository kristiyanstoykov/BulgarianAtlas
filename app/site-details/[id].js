import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Button,
  ScrollView,
  Text,
  Image,
  ActivityIndicator,
  Linking,
} from "react-native";
import axios from "axios";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { ScreenHeaderBtn } from "../../components";
import { FONT, COLORS, icons, SIZES } from "../../constants";
import { stripHtmlTags } from "../../utils";

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
        setError("Failed to fetch posts. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcessPosts();
  }, []);

  const handleMapLinkPress = () => {
    if (betterData.google_maps_link) {
      Linking.openURL(betterData.google_maps_link).catch((err) => {
        Alert.alert("Failed to open the link", err.message);
      });
    } else {
      Alert.alert("No link available");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: `${betterData.postTitle}`,
          headerTitleAlign: "center",
        }}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : betterData ? ( // Check if betterData is not null or empty
        <ScrollView style={{ padding: 20 }}>
          <Image
            source={
              betterData.image
                ? { uri: betterData.image.replace("localhost", "10.0.2.2") }
                : require("../../assets/images/default-museum.jpg")
            }
            style={{ width: "100%", height: 200 }} // Set your desired image style
          />
          <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.large }}>
            {betterData.postTitle}
          </Text>
          {betterData.google_maps_link && (
            <Button title="Open Google Maps" onPress={handleMapLinkPress} />
          )}
          <Text style={{ fontFamily: FONT.regular }}>
            {betterData.postContent}
          </Text>
        </ScrollView>
      ) : (
        <Text>No post found.</Text>
      )}
    </SafeAreaView>
  );
};

export default SiteDetails;
