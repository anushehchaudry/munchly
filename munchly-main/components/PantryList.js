import React from "react";
import {
  SectionList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import PantryItem from "./PantryItem";
import theme from "@/assets/theme";

const PantryList = ({ sections, onAddItem, onDeleteItem, onEditItem }) => {
  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => item.name + index}
      renderItem={({ item, section, index }) => (
        <PantryItem
          item={item}
          onDelete={() => onDeleteItem(section.title, index)}
          onEdit={(newName, newQuantity) =>
            onEditItem(section.title, index, newName, newQuantity)
          }
        />
      )}
      renderSectionHeader={({ section }) => (
        <View style={styles.header}>
          <Text style={styles.title}>{section.title}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onAddItem(section.title)}
          >
            <MaterialIcons name="add" size={18} color="#fff" />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      )}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.iconPrimary,
    padding: 10, // Reduced padding for a smaller look
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 8, // Slightly less rounded corners
    borderWidth: 1,
    borderColor: theme.colors.textPrimary, // Green border for subtle emphasis
  },
  title: {
    fontSize: theme.sizes.textMedium + 2, // Slightly larger than normal text
    fontWeight: "600", // Semi-bold for emphasis without being too big
    fontFamily: theme.fonts.fontPrimary,
    color: theme.colors.textPrimary,
    textTransform: "uppercase",
  },
  list: {
    paddingBottom: 60,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.iconHighlighted,
    paddingVertical: 6, // Reduced padding
    paddingHorizontal: 12,
    borderRadius: 15, // Smaller, rounded button
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  addButtonText: {
    fontSize: theme.sizes.textMedium - 2, // Smaller text size
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 4,
  },
});

export default PantryList;
