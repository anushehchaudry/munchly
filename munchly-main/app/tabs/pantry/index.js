import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import PantryList from "@/components/PantryList";
import AddPantryItem from "@/components/AddPantryItem";
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

  const sections = FOOD_CATEGORIES.map((category) => ({
    title: category,
    data: pantry[category] || [],
  }));

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundPrimary },
      ]}
    >
      <PantryList
        sections={sections}
        onAddItem={handleAddItem}
        onDeleteItem={handleDeleteItem}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PantryScreen;
