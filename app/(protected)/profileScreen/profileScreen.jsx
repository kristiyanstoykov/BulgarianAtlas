import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES, FONT, COLORS, icons, images } from "../../../constants";
import axios from "axios";
import { useRouter } from "expo-router";
import { SiteCard } from "../../../components";

export default function ProfileScreen() {
  const { authState, onLogout } = useAuth();
  const [betterData, setBetterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const handlePress = () => {
    router.push("/addPost/addPost");
  };

  useEffect(() => {
    const fetchAndProcessPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://10.0.2.2/bulgarian-atlas/wp-json/wp/v2/posts?author=${authState.user_id}&_embed`
        );
        const prettierData = response.data.map((post) => ({
          postId: post.id,
          postLink: post.link,
          postTitle: post.title.rendered, // Assuming title is an object with a rendered property
          postExcerpt: post.excerpt.rendered, // Same assumption as above
          image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "", // Safe access to possibly undefined properties
        }));
        setBetterData(prettierData);
        console.log("authState", authState);
      } catch (err) {
        setError("Failed to fetch posts. Please try again.");
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcessPosts();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView style={{ padding: SIZES.medium }}>
        <View>
          <Text style={{ fontFamily: FONT.medium, fontSize: SIZES.large }}>
            Здравейте, {authState.userFirstName} {authState.userLastName}.
          </Text>
          <Text style={{ fontFamily: FONT.regular, fontSize: SIZES.large }}>
            Име: {authState.userFirstName}
          </Text>

          <Text style={{ fontFamily: FONT.regular, fontSize: SIZES.large }}>
            Фамилия: {authState.userLastName}
          </Text>

          <Text style={{ fontFamily: FONT.regular, fontSize: SIZES.large }}>
            Имейл: {authState.userEmail}
          </Text>
          <Button
            title="Logout"
            color="red" // You can style this as you like
            onPress={() => {
              onLogout(); // Call the logout function
            }}
          />

          {(authState.role === "administrator" ||
            authState.role === "editor") && (
            <Button title="Add Post" onPress={handlePress} />
          )}
        </View>
        {authState.role !== "subscriber" && (
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
                      handleNavigate={() =>
                        router.push(`/site-details/${item.postId}`)
                      }
                    />
                  ))}
                </>
              ) : (
                <Text>No posts found.</Text>
              )}
            </View>
          </>
        )}
      </SafeAreaView>
    </ScrollView>
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
