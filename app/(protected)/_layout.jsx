import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import React, { useContext } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuth } from "../../context/AuthContext"; // Make sure to have this context set up
import { icons } from "../../constants";
import { ScreenHeaderBtn } from "../../components";

const DrawerLayout = () => {
  const { authState } = useAuth();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            headerTitle: "Начало",
            headerTitleAlign: "center",
            drawerLabel: "Начало",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
            headerRight: () => (
              <ScreenHeaderBtn iconUrl={icons.bulgarianAtlas} dimension="80%" />
            ),
          }}
        />
        <Drawer.Screen
          name="profileScreen/profileScreen"
          options={{
            headerTitle: "Моят профил",
            headerTitleAlign: "center",
            drawerLabel: "Моят профил",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="newspaper-outline" size={size} color={color} />
            ),
            headerRight: () => (
              <ScreenHeaderBtn iconUrl={icons.bulgarianAtlas} dimension="80%" />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
