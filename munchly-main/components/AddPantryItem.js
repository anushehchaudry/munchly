import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "@/assets/theme";

const AddPantryItem = ({
  visible,
  category,
  itemName,
  itemQuantity,
  onNameChange,
  onQuantityChange,
  onAdd,
  onCancel,
}) => {
  if (!visible) return null;

  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Overlay */}
      <View style={styles.overlay} />

      {/* Modal */}
      <View style={styles.modal}>
        <Text style={styles.title}>Add Item to {category}</Text>
        <TextInput
          style={styles.input}
          placeholder="Item Name"
          value={itemName}
          onChangeText={onNameChange}
          placeholderTextColor={theme.colors.textPrimary}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={itemQuantity}
          onChangeText={onQuantityChange}
          keyboardType="numeric"
          placeholderTextColor={theme.colors.textPrimary}
        />
        <View style={styles.buttonRow}>
          {/* Styled Add Button */}
          <TouchableOpacity style={styles.addButton} onPress={onAdd}>
            <MaterialIcons
              name="add"
              size={18}
              color={theme.colors.backgroundPrimary}
            />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>

          {/* Styled Cancel Button */}
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    zIndex: 1, // Ensure overlay is below the modal
  },
  modal: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.iconPrimary,
    zIndex: 2, // Ensure modal is above the overlay
  },
  title: {
    fontSize: theme.sizes.textLarge,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: theme.fonts.fontPrimary,
    color: theme.colors.textPrimary,
    textAlign: "center",
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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.iconHighlighted,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonText: {
    color: theme.colors.backgroundPrimary,
    fontSize: theme.sizes.textMedium,
    fontWeight: "bold",
    marginLeft: 5,
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.backgroundPrimary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderColor: theme.colors.textPrimary,
    borderWidth: 0.8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  cancelButtonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.sizes.textMedium,
    fontWeight: "bold",
  },
});

export default AddPantryItem;
