import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import {
  getSavedItems,
  removeItem,
  saveItem,
} from "../../../utils/asyncStorageUtils";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Theme from "../../../assets/theme";
import getEnv from "@/utils/env";
import axios from "axios";

export default function Saved() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [flatListKey, setFlatListKey] = useState("grid");
  const [activeTab, setActiveTab] = useState("TODO");
  const navigation = useNavigation();
  const {
    SPOONACULAR_API: { BASE_URL, RECIPE_DETAILS_API },
  } = getEnv();

  // Fetch saved recipes whenever the saved tab gains focus
  useFocusEffect(
    React.useCallback(() => {
      const fetchSavedRecipes = async () => {
        const recipes = await getSavedItems();
        setSavedRecipes(
          recipes.map((recipe) => ({
            ...recipe,
            completed: recipe.completed || false,
          }))
        );
        setFlatListKey((prevKey) => (prevKey === "grid" ? "list" : "grid"));
      };
      fetchSavedRecipes();
    }, [])
  );

  const markAsCompleted = async (recipe) => {
    const updatedRecipe = { ...recipe, completed: true };
    await saveItem(updatedRecipe); // persist in asyncstorage
    setSavedRecipes((recipes) =>
      recipes.map((r) => (r.id === recipe.id ? updatedRecipe : r))
    );
  };

  // move back todo for 'make again!'
  const moveToTodo = async (recipe) => {
    const updatedRecipe = { ...recipe, completed: false };
    await saveItem(updatedRecipe);
    setSavedRecipes((recipes) =>
      recipes.map((r) => (r.id === recipe.id ? updatedRecipe : r))
    );
  };

  const unsaveRecipe = async (recipeId) => {
    await removeItem(recipeId);
    setSavedRecipes((recipes) => recipes.filter((r) => r.id !== recipeId));
  };

  // for clicking upon the recipe in the saved tab
  const handlePress = async (id) => {
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

  // grid format for layout
  const renderGridItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.id)}>
      <View style={styles.gridItem}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.buttonRow}>
          {!item.completed && (
            <TouchableOpacity
              style={styles.completeButton}
              onPress={() => markAsCompleted(item)}
            >
              <Text style={styles.buttonText}>Mark Completed</Text>
            </TouchableOpacity>
          )}
          {item.completed && (
            <TouchableOpacity
              style={styles.todoButton}
              onPress={() => moveToTodo(item)}
            >
              <Text style={styles.buttonText}>Make Again!</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.unsaveButton}
            onPress={() => unsaveRecipe(item.id)}
          >
            <Text style={styles.buttonText}>Unsave</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredRecipes =
    activeTab === "TODO"
      ? savedRecipes.filter((recipe) => !recipe.completed)
      : savedRecipes.filter((recipe) => recipe.completed);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={Theme.colors.iconPrimary}
        barStyle="light-content"
      />
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "TODO" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("TODO")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "TODO" && styles.activeTabText,
            ]}
          >
            TODO
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "COMPLETED" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("COMPLETED")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "COMPLETED" && styles.activeTabText,
            ]}
          >
            COMPLETED
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {filteredRecipes.length === 0 ? (
          <Text style={styles.emptyText}>
            {activeTab === "TODO"
              ? "Save your first recipe!"
              : "Complete your first recipe!"}
          </Text>
        ) : (
          <FlatList
            key={flatListKey}
            data={filteredRecipes}
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : index.toString()
            }
            numColumns={2}
            renderItem={renderGridItem}
            columnWrapperStyle={styles.row}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  headerWrapper: {
    backgroundColor: Theme.colors.iconPrimary,
    marginBottom: 10,
  },
  header: {
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: Theme.sizes.textLarge,
    fontWeight: "bold",
    color: "white",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: Theme.colors.iconPrimary,
    borderwidth: 1,
    borderRadius: 10,
    padding: 5,
    borderColor: Theme.colors.activeTab,
    width: "100%",
    alignSelf: "center",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Theme.colors.iconPrimary,
  },
  activeTabButton: {
    backgroundColor: Theme.colors.activeTab,
    height: "100%",
  },
  tabText: {
    fontSize: Theme.sizes.textMedium,
    color: "white",
    textAlign: "center",
  },
  activeTabText: {
    color: "white",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundPrimary,
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  gridItem: {
    width: "48%",
    alignItems: "center",
    backgroundColor: Theme.colors.cardBackground,
    margin: 8,
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    color: Theme.colors.textPrimary,
    textAlign: "center",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
  },
  completeButton: {
    backgroundColor: Theme.colors.backgroundPrimary,
    borderColor: Theme.colors.iconPrimary,
    borderWidth: 2,
    padding: 8,
    marginBottom: 5,
    borderRadius: 20,
  },
  todoButton: {
    backgroundColor: Theme.colors.backgroundPrimary,
    borderColor: Theme.colors.iconPrimary,
    borderWidth: 2,
    padding: 8,
    marginBottom: 5,
    borderRadius: 20,
  },
  unsaveButton: {
    backgroundColor: Theme.colors.backgroundPrimary,
    borderColor: Theme.colors.iconPrimary,
    borderWidth: 2,
    padding: 8,
    borderRadius: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});
