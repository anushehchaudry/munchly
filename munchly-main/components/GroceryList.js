import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "@/assets/theme";
import { FOOD_CATEGORIES } from "@/utils/constants";

const STORAGE_KEY = "@groceryListData";

const GroceryList = ({ visible, onClose, pantry, setPantry }) => {
  const [groceryList, setGroceryList] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(FOOD_CATEGORIES[0]);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState(
    FOOD_CATEGORIES.map((category) => ({ label: category, value: category }))
  );

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

  const handleDeleteItem = (item) => {
    const updatedGroceryList = groceryList.filter(
      (groceryItem) => groceryItem.name !== item.name
    );
    setGroceryList(updatedGroceryList);
    saveGroceryList(updatedGroceryList);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✖</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Grocery List</Text>
          {/* Input Section */}
          <View style={styles.inputContainer}>
            <DropDownPicker
              open={open}
              value={selectedCategory}
              items={categories}
              setOpen={setOpen}
              setValue={setSelectedCategory}
              setItems={setCategories}
              placeholder="Select Category"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={styles.dropdownText}
            />
            <TextInput
              style={styles.input}
              placeholder="Item Name"
              value={newItemName}
              onChangeText={setNewItemName}
              placeholderTextColor={theme.colors.textPrimary}
            />
            <View style={styles.quantityAndButtonRow}>
              <TextInput
                style={styles.quantityInput}
                placeholder="Quantity"
                value={newItemQuantity}
                onChangeText={setNewItemQuantity}
                keyboardType="numeric"
                placeholderTextColor={theme.colors.textPrimary}
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddItem}
              >
                <MaterialIcons
                  name="add"
                  size={18}
                  color={theme.colors.backgroundPrimary}
                />
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Grocery List Section */}
          <FlatList
            data={groceryList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.groceryItem}>
                <Text style={styles.groceryItemText}>
                  {item.name} - {item.quantity}
                </Text>
                <View style={styles.itemActions}>
                  <TouchableOpacity onPress={() => handleCheckItem(item)}>
                    <Text style={styles.checkButton}>✔</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteItem(item)}>
                    <MaterialIcons
                      name="delete"
                      size={theme.sizes.iconMedium}
                      color={theme.colors.iconHighlighted}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
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
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: "red",
  },
  title: {
    fontSize: 24, // Larger font size
    color: theme.colors.textPrimary, // Use primary text color
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: theme.fonts.fontPrimary,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderColor: theme.colors.iconPrimary,
    borderRadius: 5,
    height: 50,
    marginBottom: 10,
  },
  dropdownContainer: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderColor: theme.colors.iconPrimary,
  },
  dropdownText: {
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
    height: 40,
  },
  quantityAndButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityInput: {
    flex: 1.0,
    borderWidth: 1,
    borderColor: theme.colors.iconPrimary,
    padding: 10,
    borderRadius: 5,
    fontFamily: theme.fonts.fontPrimary,
    color: theme.colors.textPrimary,
    marginRight: 10,
    height: 40,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.iconHighlighted,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    height: 40,
  },
  addButtonText: {
    fontSize: theme.sizes.textMedium - 2,
    color: theme.colors.backgroundPrimary,
    fontWeight: "bold",
    marginLeft: 4,
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
  itemActions: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default GroceryList;
