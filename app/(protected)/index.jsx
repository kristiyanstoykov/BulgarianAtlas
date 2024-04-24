import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { Sites } from "../../components";
import { SIZES, FONT, COLORS, icons, images } from "../../constants";
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
    fetchSites(setBetterData, setIsLoading, setError).finally(() =>
      setRefreshing(false)
    );
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.header}>Bulgarian culture</Text>
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
  },
  error: {
    color: "red",
  },
});
