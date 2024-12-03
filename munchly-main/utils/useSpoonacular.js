import { useState } from "react";
import getEnv from "./env";
//import axios from "axios";

const {
  SPOONACULAR_API: { BASE_URL, SEARCH_RECIPES_API },
} = getEnv();

// Generic fetch function
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
    //setError(err.message);
    console.error("Spoonacular API Error:", err);
    return null;
  } finally {
    //setLoading(false);
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

  const getRecipeDetails = async (id) => fetchData(RECIPE_DETAILS_API(id));

  return { getRandomRecipes, searchRecipes, getRecipeDetails, loading, error };
};

export default useSpoonacularApi;
