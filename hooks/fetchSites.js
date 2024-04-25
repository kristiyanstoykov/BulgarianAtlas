import axios from "axios";
import * as Location from "expo-location";
import { getCoordinatesFromUrl } from "../utils";
import { getDistance } from "geolib";

function calculateDistance(currentCoords, postCoords) {
  const distanceInMeters = getDistance(
    { latitude: currentCoords.latitude, longitude: currentCoords.longitude },
    { latitude: postCoords[0], longitude: postCoords[1] }
  );
  const km = distanceInMeters / 1000;
  return Math.round(km * 10) / 10;
}

export async function fetchSites(setBetterData, setIsLoading, setError) {
  setIsLoading(true);

  // Get current location first
  let currentLocation;
  try {
    currentLocation = await getCurrentLocation();
  } catch (error) {
    setError("Failed to get location. Please try again.");
    setIsLoading(false);
    return;
  }

  // Fetch posts
  try {
    const response = await axios.get(
      "https://bulgarian-atlas.nst.bg/wp-json/wp/v2/posts?per_page=10&_embed"
    );
    const prettierData = processPostsData(
      response.data,
      currentLocation.coords
    );
    setBetterData(prettierData.sort((a, b) => a.distance - b.distance));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    setError("Failed to fetch posts. Please try again.");
  } finally {
    setIsLoading(false);
  }
}

async function getCurrentLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permission to access location was denied");
  }
  return await Location.getCurrentPositionAsync({});
}

function processPostsData(posts, currentCoords) {
  return posts.map((post) => {
    const postCoords = getCoordinatesFromUrl(
      post.acf ? post.acf["google-link-field"] ?? "" : ""
    );
    return {
      postId: post.id,
      postLink: post.link,
      postTitle: post.title.rendered,
      postExcerpt: post.excerpt.rendered,
      image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "",
      google_maps_link: post.acf ? post.acf["google-link-field"] ?? "" : "",
      distance: postCoords
        ? calculateDistance(currentCoords, postCoords)
        : Infinity,
    };
  });
}
