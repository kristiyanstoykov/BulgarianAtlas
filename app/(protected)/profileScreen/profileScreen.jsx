import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Details, MySites, Tabs, WithRole } from "../../../components";
import { ROLES, useAuth } from "../../../context/AuthContext";
import styles from "../../../styles/profileScreen.style";

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
        return <MySites betterData={betterData} isLoading={isLoading} error={error} />;
    }
  };

  useEffect(() => {
    const fetchAndProcessPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://bulgarian-atlas.nst.bg/wp-json/wp/v2/posts?author=${authState.user_id}&_embed`
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
      <SafeAreaView style={styles.container}>
        <View>
          {/* TODO: Fix button to be on right side when not admin */}
          <View style={[styles.btnContainer, (!ROLES.ADMIN || !ROLES.EDITOR) && styles.alignRight]}>
            <WithRole role={[ROLES.ADMIN, ROLES.EDITOR]}>
              <TouchableOpacity onPress={() => router.push("/addPost/addPost")} style={styles.btnAddPost}>
                <AntDesign name="pluscircleo" size={24} color="white" />
              </TouchableOpacity>
            </WithRole>
            <TouchableOpacity
              style={styles.btnLogout}
              onPress={() => {
                onLogout();
              }}
            >
              <AntDesign name="logout" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          {displayTabContent()}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
