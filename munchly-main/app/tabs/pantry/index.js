// app/tabs/pantry/index.js
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button } from "react-native";
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
      <Button
        title="Open Grocery List"
        onPress={() => setIsGroceryListVisible(true)}
        color={theme.colors.iconHighlighted}
      />
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
});

export default PantryScreen;
