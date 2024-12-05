import { Stack } from "expo-router";
import { View, Text, Platform } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Theme from "@/assets/theme";
import { useNavigation } from "@react-navigation/native";

export default function SearchLayout() {
  const navigation = useNavigation();
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Theme.colors.backgroundPrimary },
        headerTintColor: Theme.colors.textPrimary,
        //headerBackTitleVisible: false,
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="carrot"
                size={32}
                color={Theme.colors.iconHighlighted}
              />
              <Text
                style={{
                  fontSize: 18,
                  color: Theme.colors.textPrimary,
                  marginLeft: 3,
                }}
              >
                Munchly
              </Text>
            </View>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="results"
        options={{
          headerTitle: "Results",
          headerShown: true,
          //tabBarButton: () => null, // Hide tab bar for this screen
        }}
        //headerShown={false}
      />
    </Stack>
  );
}
