import { Stack } from "expo-router";
import Theme from "@/assets/theme";

export default function PantryLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Theme.colors.backgroundPrimary },
        headerTintColor: Theme.colors.textPrimary,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Pantry",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
