import { useLocalSearchParams, useRouter, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { fetchData } from "../utils/useSpoonacular";
import SearchResults from "./SearchResults";
import Theme from "@/assets/theme";
import Results from "./Results";

const NoRecipesFound = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No recipes found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary, // Assuming you have a background color in Theme
  },
  text: {
    fontSize: 18,
    color: Theme.colors.textPrimary, // Assuming you have a text color in Theme
    textAlign: "center",
  },
});

export default NoRecipesFound;
