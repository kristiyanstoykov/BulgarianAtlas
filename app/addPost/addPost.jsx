import React, { useState, useEffect } from "react";
import {
  Alert,
  TextInput,
  Button,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  ScrollView,
} from "react-native";
import { Stack, useRouter } from "expo-router";

//Images
import * as ImagePicker from "expo-image-picker";

// Components
import { ScreenHeaderBtn } from "../../components";
import { FONT, COLORS, icons, SIZES } from "../../constants";
import { useAuth } from "../../context/AuthContext";

// Requests
import axios from "axios";

// Utilities
import { getMimeType, getFileNameFromUri, checkFile } from "../../utils";

// Maps
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

export default function AddPost() {
  const { authState } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mapsLink, setMapsLink] = useState("");
  const [image, setImage] = useState(null);
  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
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
    setMapsLink(
      `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`
    );
  };

  const onPoiClick = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarker({
      latitude: latitude,
      longitude: longitude,
    });
    setMapsLink(`https://www.google.com/maps?q=${latitude},${longitude}`);
    Alert.alert("POI Selected", `You have selected: ${e.nativeEvent.name}`);
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
      const response = await fetch(
        "https://bulgarian-atlas.nst.bg/wp-json/wp/v2/media",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      const responseJson = await response.json();
      return responseJson.id; // Or other relevant response detail
    } catch (error) {
      console.error("Fetch upload error:", error);
      Alert.alert("Failed to upload image. Please try again.");
    }
  };

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
      const response = await axios.post(
        "https://bulgarian-atlas.nst.bg/wp-json/wp/v2/posts",
        postData,
        {
          headers,
        }
      );
      // TODO remove
      //console.log("Post created successfully with ID:", response.data.id);
      Alert.alert("Success", "Post successfully created", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Failed to upload post. Please try again.");
    }
  };

  const handleCreatePost = async (title, content, imageUri) => {
    //checkToken();
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
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
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
            <Image
              source={require("../../assets/images/image_placeholder.jpg")}
              style={styles.image}
            />
          )}
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Content"
            value={content}
            onChangeText={setContent}
            multiline={true}
            numberOfLines={10} // Adjust the number of lines accordingly
            textAlignVertical="top"
          />
          <TextInput
            style={styles.input}
            placeholder="Google Link to site"
            value={mapsLink}
            onChangeText={setMapsLink}
          />
          <Button title="Add Post" onPress={uploadPost} />
          <View style={{ marginTop: 20 }}>
            {marker && (
              <MapView
                style={{ width: "100%", height: 400 }}
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
