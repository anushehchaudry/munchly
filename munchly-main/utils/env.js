// const API_KEY = "a89521b416b14651a73c955d6976174e";
const API_KEY = "0c9a5026590a4d25a1c811d8f67bb9db";
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
