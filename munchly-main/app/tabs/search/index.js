import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

import Theme from "@/assets/theme";
import Results from "@/components/Results";

const windowWidth = Dimensions.get("window").width;

export default function Home() {
  const [search, setSearch] = useState("");
  const router = useRouter(); // Hook for navigation

  const handleSearch = () => {
    if (search.trim()) {
      //<Link href="/tabs/search/results" />; // Navigate to results page with search query
      <Results query={search} />;
    } else {
      alert("Please enter a search term.");
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* <Text style={styles.text}>Find a recipe!</Text> */}
      <View style={styles.searchBarBox}>
        <TextInput
          style={styles.textInput}
          value={search}
          onChangeText={(text) => setSearch(text)}
          placeholder={"Find a recipe!"}
        />
        <Pressable style={styles.goButton}>
          <Link
            href={`/tabs/search/results?query=${encodeURIComponent(search)}`}
            style={styles.buttonText}
          >
            GO
          </Link>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  text: {
    color: Theme.colors.textPrimary,
    fontSize: Theme.sizes.textLarge,
  },
  postButtonContainer: {
    position: "absolute",
    right: 8,
    bottom: 8,
  },
  postButton: {
    backgroundColor: Theme.colors.iconHighlighted,
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    // FontAwesome 'plus' icon is a bit off-center, so we manually center it by
    // tweaking the padding
    paddingTop: 2,
    paddingLeft: 1,
  },
  // my code
  textInput: {
    opacity: 0.8,
    borderRadius: 5,
    backgroundColor: "light gray",
    padding: 8,
    flex: 1,
    color: Theme.colors.textPrimary,
    fontSize: Theme.sizes.textLarge,
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  searchBarBox: {
    flexDirection: "row",
    alignItems: "center",
    width: windowWidth * 0.65,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Theme.colors.textSecondary,
  },
  goButton: {
    backgroundColor: Theme.colors.iconHighlighted,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
