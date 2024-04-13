import React, { useEffect, useState } from "react";
import { decode as atob, encode as btoa } from "base-64";
import axios from "axios";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Site } from "../components";

export default function Home() {
  const [betterData, setBetterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchAndProcessPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://10.0.2.2/bulgarian-atlas/wp-json/wp/v2/posts?per_page=10&_embed"
        );
        const prettierData = response.data.map((post) => ({
          postId: post.id,
          postLink: post.link,
          postTitle: post.title.rendered, // Assuming title is an object with a rendered property
          postExcerpt: post.excerpt.rendered, // Same assumption as above
          image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "", // Safe access to possibly undefined properties
        }));
        setBetterData(prettierData);
      } catch (err) {
        console.error("Failed to fetch posts", err);
        setError("Failed to fetch posts. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcessPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Posts</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={betterData}
          keyExtractor={(item) => item.postId.toString()}
          renderItem={({ item }) => (
            <Site
              image={item.image}
              title={item.postTitle}
              content={item.postExcerpt}
            />
          )}
          ListEmptyComponent={<Text>No posts found.</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
  },
  error: {
    color: "red",
  },
});
