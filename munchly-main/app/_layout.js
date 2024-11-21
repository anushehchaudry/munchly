import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="pantry"
        options={{
          tabBarLabel: "Pantry",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          tabBarLabel: "Saved",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
