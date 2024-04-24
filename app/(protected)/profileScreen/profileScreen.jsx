import React, { useState, useEffect, useCallback } from "react";
import { View, RefreshControl, ScrollView, Button } from "react-native";
import { useAuth, ROLES } from "../../../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES } from "../../../constants";
import { useRouter } from "expo-router";
import { WithRole, Tabs, Details, Sites } from "../../../components";
import { fetchMySites } from "../../../hooks/fetchMySites";

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
    fetchMySites(
      authState.user_id,
      setBetterData,
      setIsLoading,
      setError
    ).finally(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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

          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          {displayTabContent()}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
