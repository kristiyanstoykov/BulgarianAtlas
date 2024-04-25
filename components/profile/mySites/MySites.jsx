import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Animated, Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import SiteCard from "../../common/cards/site/SiteCard";
import EditButtons from "./EditButtons";
import styles from "./mySites.style";

export default function MySites({ data, isLoading, error, onRefresh }) {
  const router = useRouter();

  const renderRightActions = (postId) => (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [0, 0, 0, 1],
    });

    return <EditButtons trans={trans} postId={postId} onRefresh={onRefresh} />;
  };

  return (
    <View style={styles.postContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : data && data.length > 0 ? (
        data.map((item) => (
          <Swipeable key={item.postId.toString()} renderRightActions={renderRightActions(item.postId)}>
            <SiteCard
              key={item.postId.toString()}
              image={item.image}
              title={item.postTitle}
              content={item.postExcerpt}
              google_maps_link={item.google_maps_link}
              distance={item.distance}
              handleNavigate={() => router.push(`/site-details/${item.postId}`)}
            />
          </Swipeable>
        ))
      ) : (
        <Text>Нямате качени постове</Text>
      )}
    </View>
  );
}
