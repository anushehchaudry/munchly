import {
  Dimensions,
  StyleSheet,
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import axios from "axios";
import {
  saveItem,
  removeItem,
  getSavedItems,
} from "../utils/asyncStorageUtils";
import getEnv from "@/utils/env";
import Theme from "@/assets/theme";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const SearchResults = ({ id, title, image, isSaved, refreshRecipes }) => {
  const navigation = useNavigation();
  const {
    SPOONACULAR_API: { BASE_URL, RECIPE_DETAILS_API },
  } = getEnv();

  const handleToggleSave = async () => {
    if (!isSaved) {
      await saveItem({ id, title, image });
    } else {
      await removeItem(id);
    }
    refreshRecipes();
  };

  const handlePress = async () => {
    try {
      const url = `${BASE_URL}${RECIPE_DETAILS_API(id)}`;
      console.log("Fetching recipe details from URL:", url);
      const response = await axios.get(url);
      const recipeUrl = response.data.sourceUrl;
      navigation.navigate("RecipeDetails", { id }); // Pass the id correctly
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <SafeAreaView style={styles.container}>
        <View style={styles.rowContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.recipeSave}>
            <Text style={styles.recipeName} numberOfLines={3}>
              {title}
            </Text>
            <TouchableOpacity
              style={[
                styles.saveButton,
                isSaved ? styles.savedState : styles.unsavedState,
              ]}
              onPress={handleToggleSave}
            >
              <Text style={isSaved ? styles.savedText : styles.unsavedText}>
                {isSaved ? "Saved!" : "Save"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableOpacity>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.9,
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
    flexDirection: "row",
    justifyContent: "flex-start",
    flex: 1,
    margin: 10,
    padding: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  recipeName: {
    flex: 1,
    paddingLeft: 10,
    color: "black",
    textAlign: "left",
    flexShrink: 1,
    flexGrow: 1
  },
  recipeSave: {
    flex: 1, 
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    marginLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  saveButton: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 40,
    borderRadius: 20,
    borderWidth: 2,
    marginLeft: 10
  },
  savedState: {
    backgroundColor: Theme.colors.iconPrimary,
    borderColor: Theme.colors.iconPrimary,
  },
  unsavedState: {
    backgroundColor: "transparent",
    borderColor: Theme.colors.iconPrimary,
  },
  savedText: {
    color: "white",
  },
  unsavedText: {
    color: "black",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
