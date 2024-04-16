import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { ScreenHeaderBtn } from "../../components";
import { FONT, COLORS, icons, SIZES } from "../../constants";
import stripHtmlTags from "../../utils";

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
          `http://10.0.2.2/bulgarian-atlas/wp-json/wp/v2/posts/${params.id}?_embed`
        );
        const prettierData = {
          postId: params.id,
          postTitle: response.data["title"]["rendered"], // Assuming title is an object with a rendered property
          postExcerpt: stripHtmlTags(response.data["excerpt"]["rendered"]), // Same assumption as above
          postContent: stripHtmlTags(response.data["content"]["rendered"]), // Same assumption as above
          image: response.data._embedded["wp:featuredmedia"]
            ? response.data._embedded["wp:featuredmedia"][0].source_url
            : "", // Safe access to possibly undefined properties
        };
        setBetterData(prettierData);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch posts. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcessPosts();
  }, []);

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
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "",
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
