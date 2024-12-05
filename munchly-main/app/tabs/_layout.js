import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Theme from "@/assets/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Theme.colors.iconHighlighted,
        tabBarInactiveTintColor: Theme.colors.iconPrimary,
        tabBarStyle: { backgroundColor: Theme.colors.backgroundPrimary },
      }}
    >
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" size={24} color={color} />
          ),
          tabBarLabel: "Search",
          headerShown: false, // Disable header at the Tabs level for search stack
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
        name="saved"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book" size={24} color={color} />
          ),
          tabBarLabel: "Saved Recipes",
          headerShown: false, // Disable header at the Tabs level for profile stack
        }}
      />
    </Tabs>
  );
}
