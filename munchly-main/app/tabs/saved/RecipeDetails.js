import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import useSpoonacularApi from "@/utils/useSpoonacular";
import Theme from "@/assets/theme";
import RenderHTML from "react-native-render-html";

const RecipeDetails = () => {
  const route = useRoute();
  const { id } = route.params;
  const { getRecipeDetails } = useSpoonacularApi();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const details = await getRecipeDetails(id);
        console.log("details", details);
        setRecipe(details);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.iconPrimary} />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading recipe details.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <Text style={styles.title}>{recipe.title}</Text>
      <RenderHTML
        contentWidth={windowWidth}
        source={{ html: `<p>${recipe.summary}</p>` }}
      />
      <Text style={styles.sectionTitle}>Ingredients</Text>
      {recipe.extendedIngredients.map((ingredient) => (
        <Text key={ingredient.id} style={styles.ingredient}>
          {ingredient.original}
        </Text>
      ))}
      <Text style={styles.sectionTitle}>Instructions</Text>
      {recipe.analyzedInstructions[0]?.steps.map((step) => (
        <Text key={step.number} style={styles.instruction}>
          {step.number}. {step.step}
        </Text>
      ))}
    </ScrollView>
  );
};

export default RecipeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundPrimary,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Theme.colors.textPrimary,
    marginBottom: 8,
  },
  summary: {
    fontSize: 16,
    color: Theme.colors.textPrimary,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Theme.colors.textPrimary,
    marginBottom: 8,
  },
  ingredient: {
    fontSize: 16,
    color: Theme.colors.textPrimary,
    marginBottom: 4,
  },
  instruction: {
    fontSize: 16,
    color: Theme.colors.textPrimary,
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  errorText: {
    fontSize: 18,
    color: Theme.colors.textPrimary,
  },
});
