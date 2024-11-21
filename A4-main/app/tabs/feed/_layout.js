import { Stack } from "expo-router";
import { View, Text, Platform } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Theme from "@/assets/theme";
import { useNavigation } from "@react-navigation/native";

export default function FeedLayout() {
  const navigation = useNavigation();
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Theme.colors.backgroundPrimary },
        headerTintColor: Theme.colors.textPrimary,
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="bee"
                size={32}
                color={Theme.colors.iconHighlighted}
              />
              <Text
                style={{
                  fontSize: 18,
                  color: Theme.colors.textPrimary,
                  marginLeft: 8,
                }}
              >
                Buzz
              </Text>
            </View>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          headerTitle: "Comments", // Show only "Comments" as the title
          headerTitleAlign: "center",
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color={Theme.colors.textPrimary}
                onPress={() => navigation.goBack()}
              />
            ) : null,
          headerBackTitle: Platform.OS === "ios" ? "Back" : null,
        }}
      />
      <Stack.Screen
        name="newpost"
        options={{
          presentation: "modal", // Show as a modal
          headerTitle: "New Post",
          headerTitleAlign: "center",
          headerShown: true,
          headerStyle: { backgroundColor: Theme.colors.backgroundPrimary },
          headerTintColor: Theme.colors.textPrimary,
        }}
      />
    </Stack>
  );
}
