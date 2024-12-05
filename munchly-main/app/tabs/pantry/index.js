import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import PantryList from "@/components/PantryList";
import AddPantryItem from "@/components/AddPantryItem";
import GroceryList from "@/components/GroceryList";
import { loadPantryData, savePantryData } from "@/components/PantryStorage";
import { FOOD_CATEGORIES } from "@/utils/constants";
import theme from "@/assets/theme";

const PantryScreen = () => {
  const defaultPantry = FOOD_CATEGORIES.reduce((acc, category) => {
    acc[category] = [];
    return acc;
  }, {});

  const [pantry, setPantry] = useState(defaultPantry);
  const [currentCategory, setCurrentCategory] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isGroceryListVisible, setIsGroceryListVisible] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const data = await loadPantryData(defaultPantry);
      setPantry(data);
    };
    loadData();
  }, []);

  const handleAddItem = (category) => {
    setCurrentCategory(category);
    setIsAdding(true);
  };

  const handleSaveItem = () => {
    if (newItemName && newItemQuantity) {
      const updatedPantry = { ...pantry };
      updatedPantry[currentCategory].push({
        name: newItemName,
        quantity: newItemQuantity,
      });
      setPantry(updatedPantry);
      savePantryData(updatedPantry);
      setNewItemName("");
      setNewItemQuantity("");
      setIsAdding(false);
    }
  };

  const handleDeleteItem = (category, index) => {
    const updatedPantry = { ...pantry };
    updatedPantry[category].splice(index, 1);
    setPantry(updatedPantry);
    savePantryData(updatedPantry);
  };

  const handleEditItem = (category, index, newName, newQuantity) => {
    const updatedPantry = { ...pantry };
    updatedPantry[category][index] = { name: newName, quantity: newQuantity };
    setPantry(updatedPantry);
    savePantryData(updatedPantry);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundPrimary },
      ]}
    >
      <PantryList
        sections={FOOD_CATEGORIES.map((category) => ({
          title: category,
          data: pantry[category] || [],
        }))}
        onAddItem={handleAddItem}
        onDeleteItem={handleDeleteItem}
        onEditItem={handleEditItem}
      />
      <AddPantryItem
        visible={isAdding}
        category={currentCategory}
        itemName={newItemName}
        itemQuantity={newItemQuantity}
        onNameChange={setNewItemName}
        onQuantityChange={setNewItemQuantity}
        onAdd={handleSaveItem}
        onCancel={() => setIsAdding(false)}
      />
      {!isAdding && (
        <TouchableOpacity
          style={styles.groceryListButton}
          onPress={() => setIsGroceryListVisible(true)}
        >
          <Text style={styles.groceryListText}>Open Grocery List</Text>
        </TouchableOpacity>
      )}
      <GroceryList
        visible={isGroceryListVisible}
        onClose={() => setIsGroceryListVisible(false)}
        pantry={pantry}
        setPantry={setPantry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groceryListButton: {
    position: "absolute",
    bottom: 10, // Position near the bottom
    right: 10, // Align to the right
    width: 150, // Adjust width for the tab style
    height: 40, // Height for the tab
    backgroundColor: theme.colors.backgroundPrimary, // Match theme
    borderRadius: 20, // Rounded edges to look like a tab
    borderWidth: 1,
    borderColor: theme.colors.textPrimary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3, // Elevation for Android shadow
  },
  groceryListText: {
    color: theme.colors.textPrimary, // Text color matches theme
    fontSize: theme.sizes.textSmall,
    fontWeight: "bold",
    fontFamily: theme.fonts.fontPrimary,
  },
});

export default PantryScreen;
