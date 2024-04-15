import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";
import SiteCard from "../../common/cards/site/SiteCard";
import styles from "./sites.style";

export default function Sites() {
  const [betterData, setBetterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // const router = useRouter();
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
        // console.error("Failed to fetch posts", err);
        setError("Failed to fetch posts. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcessPosts();
  }, []);

  return (
    <View style={styles.postContainer}>
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
            />
          ))}
        </>
      ) : (
        <Text>No posts found.</Text>
      )}
    </View>
  );
}
