import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import useSpoonacular from "../utils/useSpoonacular";

const Recipe = ({ navigation }) => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const { searchRecipes, loading, error } = useSpoonacular();

  const fetchRecipes = async () => {
    const data = await searchRecipes(ingredients);
    if (data?.results) setRecipes((prev) => [...prev, ...data.results]);
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter ingredients (e.g., apple, flour, sugar)"
        value={ingredients}
        onChangeText={setIngredients}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />
      <Button title="Find Recipes" onPress={fetchRecipes} />
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={fetchRecipes} // Infinite scroll
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Vault", {
                recipe: item,
              })
            }
            style={{
              borderBottomWidth: 1,
              padding: 10,
              flexDirection: "row",
            }}
          >
            <Image
              source={{
                uri: `https://spoonacular.com/recipeImages/${item.id}-312x231.jpg`,
              }}
              style={{ width: 50, height: 50, marginRight: 10 }}
            />
            <View>
              <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
              <Text>Used ingredients: {item.usedIngredientCount}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Recipe;
