import {
  Dimensions,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  ListItem,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  saveItem,
  removeItem,
  getSavedItems,
} from "../utils/asyncStorageUtils";
import getEnv from "../utils/env";
import Theme from "@/assets/theme";
const windowWidth = Dimensions.get("window").width;

const SearchResults = ({ id, title, image, isSaved, refreshRecipes }) => {
  const handleToggleSave = async () => {
    if (!isSaved) {
      await saveItem({ id, title, image }); // Save item
    } else {
      await removeItem(id); // Remove item
    }
    // Trigger the parent refresh function
    refreshRecipes();
  };

  return (
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
    //resizeMode: "cover",
  },
  rowContainer: {
    flexDirection: "row", // Ensures items are aligned in a row
    alignItems: "center", // Vertically aligns items
  },
  recipeName: {
    flex: 1,
    //paddingTop: 20,
    paddingLeft: 10,
    color: "black",
    // alignItems: "flex-end",
    textAlign: "left",
    flexShrink: 1,
  },
  recipeSave: {
    // container for recipe title and save button
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    paddingTop: 10,
    paddingBottom: 10,
  },
  saveButton: {
    alignSelf: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 2, // Border to make unsaved state visually clear
  },
  savedState: {
    backgroundColor: Theme.colors.iconPrimary, // Current green background for toggled state
    borderColor: Theme.colors.iconPrimary, // Match border to background
  },
  unsavedState: {
    backgroundColor: "transparent", // No background for untoggled state
    borderColor: "green", // Green border for untoggled state
  },
  savedText: {
    color: "white", // White text when toggled
  },
  unsavedText: {
    color: "black", // Black text when untoggled
  },
  indexText: {
    color: "white",
    backgroundColor: Theme.colors.iconPrimary,
    fontSize: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: "center",
    lineHeight: 24,
    marginRight: 10,
    // paddingTop: 10,
    // paddingRight: 20,
    // fontSize: 10,
    // width: 10,
  },
  image: {
    width: windowWidth * 0.25,
    aspectRatio: 1,
    borderRadius: 10,
  },
  mainText: {
    color: "white",
  },
  subText: {
    color: "gray",
    padding: 20,
  },
  songArtistBlock: {
    flexDirection: "column",
    marginLeft: 10,
    justifyContent: "flex-start",
    //flex: 1,
    //width: 20,
  },

  songArtistText: {
    paddingLeft: 5,
    color: "black",
  },
  leftSide: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: windowWidth * 0.35,
    paddingRight: 30,
    flex: 1,
  },
  rightSide: {
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 50,
    marginRight: 30,
    width: windowWidth * 0.15,
  },
  durationText: {
    paddingLeft: 20,
    color: "white",
  },
  albumNameMod: {
    paddingLeft: 50,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: windowWidth * 0.4,
  },
});
