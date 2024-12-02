import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  SectionList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FOOD_CATEGORIES } from "@/utils/constants";
import theme from "@/assets/theme"; // Import the theme

const STORAGE_KEY = "@pantryData";

const PantryScreen = () => {
  const [pantry, setPantry] = useState(
    FOOD_CATEGORIES.reduce((acc, category) => {
      acc[category] = [];
      return acc;
    }, {})
  );
  const [currentCategory, setCurrentCategory] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Load pantry data from AsyncStorage on mount
  useEffect(() => {
    const loadPantryData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          const parsedData = JSON.parse(storedData);

          // Ensure all categories are present
          const fullData = { ...pantry, ...parsedData };
          setPantry(fullData);
        }
      } catch (error) {
        console.error("Failed to load pantry data:", error);
      }
    };
    loadPantryData();
  }, []);

  // Save pantry data to AsyncStorage
  const savePantryData = async (updatedPantry) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPantry));
    } catch (error) {
      console.error("Failed to save pantry data:", error);
    }
  };

  const handleAddItem = () => {
    if (newItemName && newItemQuantity) {
      const updatedPantry = { ...pantry };
      updatedPantry[currentCategory].push({
        name: newItemName,
        quantity: newItemQuantity,
      });
      setPantry(updatedPantry);
      savePantryData(updatedPantry); // Persist the updated pantry to AsyncStorage
      setNewItemName("");
      setNewItemQuantity("");
      setIsAdding(false);
    } else {
      Alert.alert("Error", "Please enter a valid item name and quantity.");
    }
  };

  const handleDeleteItem = (category, index) => {
    const updatedPantry = { ...pantry };
    updatedPantry[category].splice(index, 1);
    setPantry(updatedPantry);
    savePantryData(updatedPantry); // Persist the updated pantry to AsyncStorage
  };

  const sections = FOOD_CATEGORIES.map((category) => ({
    title: category,
    data: pantry[category] || [], // Ensure all categories are displayed, even if empty
  }));

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundPrimary },
      ]}
    >
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item, section, index }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.name} - {item.quantity}
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteItem(section.title, index)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Button
              title="Add Item"
              onPress={() => {
                setCurrentCategory(section.title);
                setIsAdding(true);
              }}
              color={theme.colors.iconHighlighted}
            />
          </View>
        )}
        contentContainerStyle={styles.list}
      />
      {isAdding && (
        <View style={styles.addItemModal}>
          <Text style={styles.modalTitle}>Add Item to {currentCategory}</Text>
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={newItemName}
            onChangeText={setNewItemName}
            placeholderTextColor={theme.colors.textPrimary}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={newItemQuantity}
            onChangeText={setNewItemQuantity}
            keyboardType="numeric"
            placeholderTextColor={theme.colors.textPrimary}
          />
          <Button
            title="Add"
            onPress={handleAddItem}
            color={theme.colors.iconHighlighted}
          />
          <Button
            title="Cancel"
            onPress={() => {
              setIsAdding(false);
              setNewItemName("");
              setNewItemQuantity("");
            }}
            color="red"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.iconPrimary,
    padding: 10,
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: theme.sizes.textLarge,
    fontWeight: "bold",
    fontFamily: theme.fonts.fontPrimary,
    color: theme.colors.textPrimary,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: theme.sizes.textMedium,
    fontFamily: theme.fonts.fontPrimary,
    color: theme.colors.textPrimary,
  },
  deleteButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: theme.colors.iconHighlighted,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: theme.fonts.fontPrimary,
  },
  addItemModal: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: theme.sizes.textLarge,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: theme.fonts.fontPrimary,
    color: theme.colors.textPrimary,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.iconPrimary,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontFamily: theme.fonts.fontPrimary,
    color: theme.colors.textPrimary,
  },
  list: {
    paddingBottom: 50,
  },
});

export default PantryScreen;
