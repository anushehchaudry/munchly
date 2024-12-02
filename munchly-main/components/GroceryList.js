// components/GroceryList.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import theme from "@/assets/theme";

const GroceryList = ({ visible, onClose, pantry, setPantry }) => {
  const [groceryList, setGroceryList] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");

  const handleAddItem = () => {
    if (newItemName && newItemQuantity) {
      setGroceryList([
        ...groceryList,
        { name: newItemName, quantity: newItemQuantity },
      ]);
      setNewItemName("");
      setNewItemQuantity("");
    }
  };

  const handleCheckItem = (item) => {
    const updatedGroceryList = groceryList.filter(
      (groceryItem) => groceryItem.name !== item.name
    );
    setGroceryList(updatedGroceryList);

    const updatedPantry = { ...pantry };
    const category = Object.keys(updatedPantry).find((cat) =>
      updatedPantry[cat].some((pantryItem) => pantryItem.name === item.name)
    );

    if (category) {
      const pantryItem = updatedPantry[category].find(
        (pantryItem) => pantryItem.name === item.name
      );
      pantryItem.quantity =
        parseInt(pantryItem.quantity) + parseInt(item.quantity);
    } else {
      updatedPantry["Miscellaneous"] = updatedPantry["Miscellaneous"] || [];
      updatedPantry["Miscellaneous"].push(item);
    }

    setPantry(updatedPantry);
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
});

export default GroceryList;
