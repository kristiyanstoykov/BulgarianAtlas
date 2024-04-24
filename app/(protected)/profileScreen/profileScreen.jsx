import { AntDesign } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";

import { useRouter } from "expo-router";
import { Button, RefreshControl, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Details, Sites, Tabs, WithRole } from "../../../components";
import { SIZES } from "../../../constants";
import { ROLES, useAuth } from "../../../context/AuthContext";
import { fetchMySites } from "../../../hooks/fetchMySites";
import styles from "../../../styles/profileScreen.style";

export default function ProfileScreen() {
  const { authState, onLogout } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
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
        return <Sites data={betterData} isLoading={isLoading} error={error} />;
    }
  };

  useEffect(() => {
    fetchMySites(authState.user_id, setBetterData, setIsLoading, setError);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchMySites(authState.user_id, setBetterData, setIsLoading, setError).finally(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <SafeAreaView style={{ padding: SIZES.medium }}>
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
