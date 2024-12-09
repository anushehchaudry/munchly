// app/tabs/profile/_layout.js
import { Stack } from "expo-router";
import { Platform } from "react-native";
import Theme from "@/assets/theme";

export default function SavedLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Theme.colors.iconPrimary },
        headerTintColor: "white",
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index" // This corresponds to 'index.js' in the profile folder
        options={{
          headerShown: false,
          // headerTitle: "Saved Recipes",
          // headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="RecipeDetails"
        options={{
          headerTitle: "Recipe Details",
        }}
      />
    </Stack>
  );
}
