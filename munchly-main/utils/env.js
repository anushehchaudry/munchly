// Set EXPO_PUBLIC_SPOONACULAR_API_KEY in munchly-main/.env (see .env.example).
const API_KEY = process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY;
const ENV = {
  SPOONACULAR_API: {
    BASE_URL: "https://api.spoonacular.com",
    RANDOM_RECIPES_API: (number = 1) =>
      `/recipes/random?number=${number}&apiKey=${API_KEY}`,
    SEARCH_RECIPES_API: (query, number = 10) =>
      `/recipes/complexSearch?includeIngredients=${query}&number=${number}&apiKey=${API_KEY}`,
    RECIPE_DETAILS_API: (id) => `/recipes/${id}/information?apiKey=${API_KEY}`,
  },
};

const getEnv = () => ENV;
export default getEnv;
// ^ use this type of exporting to ensure compliance with webpack and expo-web
