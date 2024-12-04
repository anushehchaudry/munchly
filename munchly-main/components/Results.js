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
import { getSavedItems } from "../utils/asyncStorageUtils";

const windowWidth = Dimensions.get("window").width;

// tessssting minor change
const Results = (props) => {
  const [recipes, setRecipes] = useState([]); // list of recipes that will be shown
  const [offset, setOffset] = useState(0); // offset
  const { query } = useLocalSearchParams();
  const [fetching, setFetching] = useState(false);
  // const [totalResults, setTotalResults] = useState(0); // Total results from the API
  const [hasMore, setHasMore] = useState(true); // Track if more results are available

  const SEARCH_ENDPOINT = "https://api.spoonacular.com/recipes/complexSearch";
  let contentDisplayed = null; // this will be the flatlist
  let loading = null; // this is the loading button
  const limit = 20; // temporary limit

  // to fetch the search results. based off Spotify search bar extension
  const searchResult = async (newSearch) => {
    // if it's a new search, reset the "list" to empty
    if (newSearch) {
      setRecipes([]);
      setOffset(0);
      setHasMore(true); // Reset hasMore for a new search
    }

    let types = "&includeIngredients"; // currently, just want to include ingredients

    try {
      // fetch data and get 20 results at a time
      const savedItems = await getSavedItems();
      const results = await fetchData(query, offset);
      console.log("look", offset);
      const newRecipes = results.results.map((recipe) => ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        imageType: recipe.imageType,
        isSaved: savedItems.some((savedItem) => savedItem.id === recipe.id), // Check if saved
      }));
      setRecipes((existent) => {
        const uniqueRecipes = new Map(
          [...existent, ...newRecipes].map((recipe) => [recipe.id, recipe])
        );
        return Array.from(uniqueRecipes.values());
      });

      // Update state for pagination
      setOffset((prevOffset) => prevOffset + limit);
    } catch (error) {
      console.log("Unable to fetch.", error);
    }
  };
  const refreshRecipes = async () => {
    const savedItems = await getSavedItems(); // Get updated saved items
    setRecipes((currentRecipes) =>
      currentRecipes.map((recipe) => ({
        ...recipe,
        isSaved: savedItems.some((savedItem) => savedItem.id === recipe.id), // Recalculate saved state
      }))
    );
  };
  // implementation for infinite scroll
  const fetchNextPage = async () => {
    setFetching(true);
    try {
      // Increment the offset and fetch new results
      const nextOffset = offset + limit; // Calculate the next offset
      setOffset(nextOffset); // update offset
      const results = await fetchData(query, offset); // Fetch with the updated offset
      const savedItems = await getSavedItems();
      const newRecipes = results.results.map((recipe) => ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        imageType: recipe.imageType,
        isSaved: savedItems.some((savedItem) => savedItem.id === recipe.id),
      }));
      // Append unique results
      setRecipes((existent) => {
        const uniqueRecipes = new Map(
          [...existent, ...newRecipes].map((recipe) => [recipe.id, recipe])
        );
        return Array.from(uniqueRecipes.values());
      });
    } catch (error) {
      console.error("Error fetching next page:", error);
    } finally {
      setFetching(false); // Ensure fetching state is reset
    }
  };

  useEffect(() => {
    if (query) {
      searchResult(true); // Pass `true` for a new search
    }

    return () => {
      // Cleanup function to reset states when exiting
      setRecipes([]);
      setOffset(0);
      setHasMore(true);
      setFetching(false);
    };
  }, [query]);

  if (fetching) {
    loading = (
      <View>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  contentDisplayed = (
    <FlatList
      data={recipes}
      renderItem={({ item, index }) => (
        <SearchResults
          id={item.id}
          index={index}
          title={item.title}
          image={item.image}
          imageType={item.imageType}
          isSaved={item.isSaved}
          refreshRecipes={refreshRecipes}
        />
      )}
      keyExtractor={(item) => `${item.id}`}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading}
    />
  );

  //searchRecipes(query, 20);

  return (
    <SafeAreaView style={styles.container}>{contentDisplayed}</SafeAreaView>
  );
};

export default Results;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.backgroundPrimary,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: windowWidth,
    flex: 1,
  },
});
