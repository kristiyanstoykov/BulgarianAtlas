import { encode as btoa } from "base-64";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants";
import { useAuth } from "../../../context/AuthContext";
import onDelete from "../../../hooks/deletePost";
import SiteCard from "../../common/cards/site/SiteCard";

export default function DeleteButton({ trans, postId, onRefresh }) {
  const { authState } = useAuth();

  const confirmAndDeletePost = async () => {
    try {
      const success = await onDelete(postId, authState.token);
      if (success) {
        Alert.alert("Success", "Post deleted successfully", [{ text: "OK", onPress: onRefresh }]);
      } else {
        Alert.alert("Error", "The post could not be deleted.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while deleting the post.");
    }
  };

  const confirmDelete = async () => {
    Alert.alert("Confirm Deletion", "Are you sure you want to delete this post?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: confirmAndDeletePost,
      },
    ]);
  };

  return (
    <Animated.View style={{ transform: [{ translateX: trans }] }}>
      <TouchableOpacity onPress={() => confirmDelete(postId)} style={styles.deleteButton}>
        <AntDesign name="delete" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.editButton}>
        <AntDesign name="edit" size={24} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: COLORS.warning.light,
    ...SHADOWS.medium,
    shadowColor: COLORS.primary.dark,
  },
  editButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.success.default,
    ...SHADOWS.medium,
    shadowColor: COLORS.primary.dark,
  },
});
