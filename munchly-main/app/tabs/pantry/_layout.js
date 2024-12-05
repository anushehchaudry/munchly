import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import Theme from "@/assets/theme";

export default function PantryLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Theme.colors.backgroundPrimary },
        headerTintColor: Theme.colors.textPrimary,
        headerTitleAlign: "center",
        header: (props) => <CustomHeader {...props} />, // Use custom header
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Pantry", // Retain the Pantry title
        }}
      />
    </Stack>
  );
}

const CustomHeader = ({ options }) => {
  return (
    <ImageBackground
      source={require("@/assets/food.png")}
      style={styles.headerBackground}
      imageStyle={styles.headerImage}
    >
      {/* Dark green rounded rectangle */}
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>{options.headerTitle}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    height: 120, // Adjust height based on design
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.iconPrimary,
  },
  headerImage: {
    resizeMode: "cover",
  },
  titleContainer: {
    backgroundColor: Theme.colors.iconPrimary, // Dark green background
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20, // Rounded rectangle
    borderColor: "black",
    borderWidth: 0.8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  headerTitle: {
    fontSize: Theme.sizes.textLarge, // Slightly larger font
    fontWeight: "bold",
    fontFamily: Theme.fonts.fontPrimary,
    color: Theme.colors.backgroundPrimary, // Theme background color for text
    textAlign: "center",
  },
});
