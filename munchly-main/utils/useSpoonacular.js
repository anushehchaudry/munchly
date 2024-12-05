import { useState } from "react";
import getEnv from "./env";

const {
  SPOONACULAR_API: { BASE_URL, SEARCH_RECIPES_API, RECIPE_DETAILS_API },
} = getEnv();

// Generic fetch function for search results
export const fetchData = async (query, offset) => {
  try {
    const endpoint = SEARCH_RECIPES_API(query, offset + 20);
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Spoonacular API Error:", err);
    return null;
  }
};

// Fetch function for recipe details
export const fetchRecipeDetails = async (id) => {
  try {
    const endpoint = RECIPE_DETAILS_API(id);
    const url = `${BASE_URL}${endpoint}`;
    console.log("Fetching recipe details from URL:", url); // Add logging for debugging
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Spoonacular API Error:", err);
    return null;
  }
};

const useSpoonacularApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API-specific functions
  const getRandomRecipes = async (number = 1) =>
    fetchData(RANDOM_RECIPES_API(number));

  const searchRecipes = async (query, number = 10) =>
    fetchData(SEARCH_RECIPES_API(query, number));

  const getRecipeDetails = async (id) => fetchRecipeDetails(id);

  return { getRandomRecipes, searchRecipes, getRecipeDetails, loading, error };
};

export default useSpoonacularApi;
