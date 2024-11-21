// app/tabs/profile/_layout.js
import { Stack } from "expo-router";
import { Platform } from "react-native";
import Theme from "@/assets/theme";

export default function SavedLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Theme.colors.backgroundPrimary },
        headerTintColor: Theme.colors.textPrimary,
      }}
    >
      <Stack.Screen
        name="index" // This corresponds to 'index.js' in the profile folder
        options={{
          headerTitle: "Saved Recipes",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
