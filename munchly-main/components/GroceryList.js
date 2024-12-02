import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import theme from "@/assets/theme";
import { FOOD_CATEGORIES } from "@/utils/constants";

const STORAGE_KEY = "@groceryListData";

const GroceryList = ({ visible, onClose, pantry, setPantry }) => {
  const [groceryList, setGroceryList] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(FOOD_CATEGORIES[0]);

  useEffect(() => {
    const loadGroceryList = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          setGroceryList(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Failed to load grocery list data:", error);
      }
    };

    if (visible) {
      loadGroceryList();
    }
  }, [visible]);

  const saveGroceryList = async (list) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (error) {
      console.error("Failed to save grocery list data:", error);
    }
  };

  const handleAddItem = () => {
    if (newItemName && newItemQuantity) {
      const updatedGroceryList = [
        ...groceryList,
        {
          name: newItemName,
          quantity: newItemQuantity,
          category: selectedCategory,
        },
      ];
      setGroceryList(updatedGroceryList);
      saveGroceryList(updatedGroceryList);
      setNewItemName("");
      setNewItemQuantity("");
      setSelectedCategory(FOOD_CATEGORIES[0]);
    }
  };

  const handleCheckItem = (item) => {
    const updatedPantry = { ...pantry };
    const category = item.category;

    if (category) {
      const pantryItem = updatedPantry[category].find(
        (pantryItem) => pantryItem.name === item.name
      );
      if (pantryItem) {
        pantryItem.quantity =
          parseInt(pantryItem.quantity) + parseInt(item.quantity);
      } else {
        updatedPantry[category].push(item);
      }
    } else {
      updatedPantry["Miscellaneous"] = updatedPantry["Miscellaneous"] || [];
      updatedPantry["Miscellaneous"].push(item);
    }

    setPantry(updatedPantry);
    setGroceryList(
      groceryList.filter((groceryItem) => groceryItem.name !== item.name)
    );
    saveGroceryList(
      groceryList.filter((groceryItem) => groceryItem.name !== item.name)
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Grocery List</Text>
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
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.picker}
          >
            {FOOD_CATEGORIES.map((category) => (
              <Picker.Item key={category} label={category} value={category} />
            ))}
          </Picker>
          <Button
            title="Add"
            onPress={handleAddItem}
            color={theme.colors.iconHighlighted}
          />
          <FlatList
            data={groceryList}
            keyExtractor={(item, index) => item.name + index}
            renderItem={({ item }) => (
              <View style={styles.groceryItem}>
                <Text style={styles.groceryItemText}>
                  {item.name} - {item.quantity}
                </Text>
                <TouchableOpacity onPress={() => handleCheckItem(item)}>
                  <Text style={styles.checkButton}>✔</Text>
                </TouchableOpacity>
              </View>
            )}
            style={styles.list}
          />
          <Button title="Close" onPress={onClose} color="red" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
  },
  modal: {
    margin: 20,
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    maxHeight: "80%", // Ensure the modal doesn't overflow
  },
  title: {
    fontSize: theme.sizes.textLarge,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: theme.fonts.fontPrimary,
    color: theme.colors.textPrimary,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: theme.colors.iconPrimary,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontFamily: theme.fonts.fontPrimary,
    color: theme.colors.textPrimary,
  },
  picker: {
    width: "100%",
    borderWidth: 1,
    borderColor: theme.colors.iconPrimary,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  groceryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  groceryItemText: {
    fontSize: theme.sizes.textMedium,
    fontFamily: theme.fonts.fontPrimary,
    color: theme.colors.textPrimary,
  },
  checkButton: {
    fontSize: theme.sizes.textLarge,
    color: theme.colors.iconHighlighted,
  },
  list: {
    width: "100%",
  },
});

export default GroceryList;
