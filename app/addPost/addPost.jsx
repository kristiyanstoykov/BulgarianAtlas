import { AntDesign } from "@expo/vector-icons";

import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

//Images
import * as ImagePicker from "expo-image-picker";

// Components
import { ScreenHeaderBtn } from "../../components";
import { COLORS, FONT, SIZES, icons } from "../../constants";
import { useAuth } from "../../context/AuthContext";
import styles from "./addPost.style";

// Requests
import axios from "axios";

// Utilities
import { checkFile, getFileNameFromUri, getMimeType } from "../../utils";

// Maps
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default function AddPost() {
  const { authState } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mapsLink, setMapsLink] = useState("");
  const [image, setImage] = useState(null);
  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Разрешението за достъп до местоположението беше отказано");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const initialRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setRegion(initialRegion);
      setMapsLink(`https://www.google.com/maps?q=${latitude},${longitude}`);
    })();
  }, []);

  useEffect(() => {
    if (!region) return;
    setMarker({ latitude: region.latitude, longitude: region.longitude });
  }, [region]);

  const onMapPress = (e) => {
    const coords = e.nativeEvent.coordinate;
    setMarker(coords);
    setMapsLink(`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`);
  };

  const onPoiClick = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarker({
      latitude: latitude,
      longitude: longitude,
    });
    setMapsLink(`https://www.google.com/maps?q=${latitude},${longitude}`);
    Alert.alert("Избрана точка", `Вие сте избрали: ${e.nativeEvent.name}`);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

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
      type: `${getMimeType(imageUri)}`,
      name: getFileNameFromUri(imageUri),
    });

    try {
      const response = await fetch("https://bulgarian-atlas.nst.bg/wp-json/wp/v2/media", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });
      const responseJson = await response.json();
      return responseJson.id; // Or other relevant response detail
    } catch (error) {
      // console.error("Fetch upload error:", error);
      Alert.alert("Неуспешно качване на изображение. Моля, опитайте отново.");
    }
  };

  // Not needed
  checkToken = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${authState.token}`,
      };

      const response = await axios.post(
        "https://bulgarian-atlas.nst.bg/wp-json/jwt-auth/v1/token/validate",
        {},
        {
          headers,
        }
      );
    } catch (error) {}
  };

  const createPostWithFeaturedImage = async (title, content, mediaId) => {
    const postData = {
      title: title,
      content: content,
      status: "publish",
      featured_media: mediaId,
      acf: {
        "google-link-field": mapsLink,
      },
    };

    const headers = {
      Authorization: `Bearer ${authState.token}`,
    };

    try {
      const response = await axios.post("https://bulgarian-atlas.nst.bg/wp-json/wp/v2/posts", postData, {
        headers,
      });
      Alert.alert("Success", "Успешно създаден обект", [{ text: "OK", onPress: () => router.back() }]);
    } catch (error) {
      // console.error("Грешка при създаване на обект:", error);
      Alert.alert("Грешка при качване на обект. Моля, опитайте отново.");
    }
  };

  const handleCreatePost = async (title, content, imageUri) => {
    //checkToken();
    const mediaId = await uploadImage(imageUri);
    if (mediaId) {
      await createPostWithFeaturedImage(title, content, mediaId);
    } else {
      // console.log("Failed to upload image.");
    }
  };

  const uploadPost = async () => {
    setIsLoading(true);
    try {
      await handleCreatePost(title, content, image);
    } catch (error) {
      // console.error("Error uploading post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => <ScreenHeaderBtn iconUrl={icons.left} dimension="60%" handlePress={() => router.back()} />,
          headerTitle: "Добави обект",
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Image source={require("../../assets/images/image_placeholder.jpg")} style={styles.image} />
          )}
          <View style={styles.cameraBtnContainer}>
            <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
              <AntDesign name="picture" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.cameraButton} onPress={captureImage}>
              <AntDesign name="camerao" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          <TextInput style={styles.input} placeholder="Заглавие" value={title} onChangeText={setTitle} />
          <TextInput
            style={styles.input}
            placeholder="Съдържание"
            value={content}
            onChangeText={setContent}
            multiline={true}
            numberOfLines={10}
            textAlignVertical="top"
          />
          <View style={styles.mapsContainer}>
            {marker && (
              <MapView
                style={styles.mapView}
                initialRegion={region}
                onPress={onMapPress}
                onPoiClick={onPoiClick}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                showsMyLocationButton={true}
              >
                <Marker coordinate={marker} />
              </MapView>
            )}
          </View>
          <TouchableOpacity style={styles.addPost} title="Добави" onPress={uploadPost} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.addPostText}>Добави</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
