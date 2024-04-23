import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import { useAuth, ROLES } from "../../../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES } from "../../../constants";
import axios from "axios";
import { useRouter } from "expo-router";
import { WithRole, Tabs, Details, MySites } from "../../../components";

export default function ProfileScreen() {
  const { authState, onLogout } = useAuth();
  const [betterData, setBetterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const tabs = ["My sites", "About"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const displayTabContent = () => {
    switch (activeTab) {
      case "About":
        return <Details />;
      case "My sites":
        return (
          <MySites
            betterData={betterData}
            isLoading={isLoading}
            error={error}
          />
        );
    }
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
      } catch (err) {
        setError("Failed to fetch posts. Please try again.");
        // TODO remove this console.log before production
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
          <Button
            title="Logout"
            color="red" // You can style this as you like
            onPress={() => {
              onLogout(); // Call the logout function
            }}
          />
          <WithRole role={[ROLES.ADMIN, ROLES.EDITOR]}>
            <Button
              title="Add Post"
              onPress={() => router.push("/addPost/addPost")}
            />
          </WithRole>
          <WithRole role={[ROLES.ADMIN, ROLES.EDITOR]}>
            <Button
              title="Add image"
              onPress={() => router.push("/addPost/imagePicker")}
            />
          </WithRole>

          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          {displayTabContent()}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
