import React, { useState } from "react";
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
import { FOOD_CATEGORIES } from "@/utils/constants";

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

  const sections = Object.keys(pantry).map((category) => ({
    title: category,
    data: pantry[category],
  }));

  const handleAddItem = () => {
    if (newItemName && newItemQuantity) {
      const updatedPantry = { ...pantry };
      updatedPantry[currentCategory].push({
        name: newItemName,
        quantity: newItemQuantity,
      });
      setPantry(updatedPantry);
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
  };

  return (
    <View style={styles.container}>
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
          />
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={newItemQuantity}
            onChangeText={setNewItemQuantity}
            keyboardType="numeric"
          />
          <Button title="Add" onPress={handleAddItem} />
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
  container: { flex: 1, padding: 10 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginVertical: 5,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold" },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: { fontSize: 16 },
  deleteButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "red",
    borderRadius: 5,
  },
  deleteButtonText: { color: "#fff", fontWeight: "bold" },
  addItemModal: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  list: { paddingBottom: 50 },
});

export default PantryScreen;
