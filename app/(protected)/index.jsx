import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Sites } from "../../components";
import { COLORS, FONT, SIZES, icons, images } from "../../constants";
import { fetchSites } from "../../hooks/fetchSites";

export default function HomeScreen() {
  const [betterData, setBetterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchSites(setBetterData, setIsLoading, setError);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchSites(setBetterData, setIsLoading, setError).finally(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.header}>Исторически обекти</Text>
          <Sites data={betterData} isLoading={isLoading} error={error} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    overflow: "hidden",
  },
  header: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.bold,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  error: {
    color: "red",
  },
});
