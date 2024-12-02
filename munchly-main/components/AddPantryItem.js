import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
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
      <Button
        title="Add"
        onPress={onAdd}
        color={theme.colors.iconHighlighted}
      />
      <Button title="Cancel" onPress={onCancel} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
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
});

export default AddPantryItem;
