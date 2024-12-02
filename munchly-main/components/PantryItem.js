import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import theme from "@/assets/theme";

const PantryItem = ({ item, onDelete }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>
        {item.name} - {item.quantity}
      </Text>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: {
    fontSize: theme.sizes.textMedium,
    fontFamily: theme.fonts.fontPrimary,
    color: theme.colors.textPrimary,
  },
  deleteButton: {
    backgroundColor: theme.colors.iconHighlighted,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: theme.fonts.fontPrimary,
  },
});

export default PantryItem;
