import { useCallback } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

const Layout = () => {
  const [fontsLoaded] = useFonts({
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsMediumItalic: require("../assets/fonts/Poppins-MediumItalic.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    // DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    // DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    // DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  const OnLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" />
    </Stack>
  );
};

// const Layout = () => {
//   return <Stack />;
// };

export default Layout;
