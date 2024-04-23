import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Button, Image, SafeAreaView, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { ScreenHeaderBtn } from "../../components";
import { COLORS, FONT, SIZES, icons } from "../../constants";
import { useAuth } from "../../context/AuthContext";
import { getMimeType } from "../../utils";

export default function AddPost() {
  const { authState } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const captureImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (imageUri) => {
    let formData = new FormData();

    formData.append("file", {
      uri: imageUri,
      type: `image/${getMimeType(imageUri)}`,
    });

    try {
      const response = await axios.post("https://bulgarian-atlas.nst.bg/wp-json/wp/v2/media", formData, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image uploaded successfully with ID:", response);
      return response.data.id; // Returns the ID of the uploaded media
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const createPostWithFeaturedImage = async (title, content, mediaId) => {
    const postData = {
      title: title,
      content: content,
      status: "publish",
      featured_media: mediaId,
    };

    console.log("auth", authState);
    try {
      const response = await axios.post("https://bulgarian-atlas.nst.bg/wp-json/wp/v2/posts", postData, {
        headers: {
          Authorization: `Bearer ${authState.token}`, // Again, use your actual access token
        },
      });
      console.log("Post created successfully with ID:", response.data.id);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleCreatePost = async (title, content, imageUri) => {
    const mediaId = await uploadImage(imageUri);
    if (mediaId) {
      await createPostWithFeaturedImage(title, content, mediaId);
    } else {
      console.log("Failed to upload image.");
    }
  };

  const uploadPost = () => {
    handleCreatePost(title, content, image);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => <ScreenHeaderBtn iconUrl={icons.left} dimension="60%" handlePress={() => router.back()} />,
          headerTitle: "Add post",
        }}
      />
      <ScrollView>
        <View style={styles.imageContainer}>
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          <Button title="Capture an image from camera" onPress={captureImage} />
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Image source={require("../../assets/images/image_placeholder.jpg")} style={styles.image} />
          )}
        </View>
        <View style={styles.container}>
          <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
          <TextInput
            style={styles.input}
            placeholder="Content"
            value={content}
            onChangeText={setContent}
            multiline={true}
            numberOfLines={10} // Adjust the number of lines accordingly
            textAlignVertical="top"
          />
          <Button title="Add Post" onPress={uploadPost} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ccc",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 225,
  },
});
