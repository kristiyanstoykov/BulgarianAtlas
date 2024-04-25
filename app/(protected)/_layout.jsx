import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import React, { useContext } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuth } from "../../context/AuthContext"; // Make sure to have this context set up

const DrawerLayout = () => {
  const { authState } = useAuth();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            headerTitle: "Начало",
            drawerLabel: "Начало",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="profileScreen/profileScreen"
          options={{
            headerTitle: "Моят профил",
            drawerLabel: "Моят профил",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="newspaper-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
