import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Theme from "@/assets/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Theme.colors.iconHighlighted,
        tabBarInactiveTintColor: Theme.colors.iconSecondary,
        tabBarStyle: { backgroundColor: Theme.colors.backgroundPrimary },
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={24} color={color} />
          ),
          tabBarLabel: "Feed",
          headerShown: false, // Disable header at the Tabs level for feed stack
        }}
      />
      <Tabs.Screen
        name="pantry"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="food" size={24} color={color} />
          ),
          tabBarLabel: "Pantry",
          headerShown: false, // Disable header at the Tabs level for pantry stack
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),
          tabBarLabel: "Profile",
          headerShown: false, // Disable header at the Tabs level for profile stack
        }}
      />
    </Tabs>
  );
}
