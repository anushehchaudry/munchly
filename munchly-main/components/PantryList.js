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
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item, section, index }) => (
          <View style={styles.itemContainer}>
            <PantryItem
              item={item}
              onDelete={() => onDeleteItem(section.title, index)}
              onEdit={(newName, newQuantity) =>
                onEditItem(section.title, index, newName, newQuantity)
              }
            />
            <View style={styles.separator} />
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => onAddItem(section.title)}
            >
              <MaterialIcons
                name="add"
                size={18}
                color={theme.colors.backgroundPrimary}
              />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary, // Green background for the pantry list
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 25,
    borderWidth: 0.8,
    borderColor: theme.colors.textPrimary,
    backgroundColor: theme.colors.iconPrimary, // Green border for consistency
  },
  sectionTitle: {
    fontSize: theme.sizes.textLarge, // Match header font size
    fontWeight: "bold",
    fontFamily: theme.fonts.fontPrimary,
    color: theme.colors.backgroundPrimary, // Match header text color
    textAlign: "left",
    paddingLeft: 10,
  },
  list: {
    paddingBottom: 60,
  },
  itemContainer: {
    paddingBottom: 5,
    paddingTop: 5,
  },
  separator: {
    height: 0.4, // Thin line
    backgroundColor: theme.colors.textPrimary, // Use a slightly darker green
    alignSelf: "center", // Center the line
    width: "90%", // Make the line 80% of the screen width
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.iconHighlighted, // Orange for contrast
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  addButtonText: {
    fontSize: theme.sizes.textMedium - 2,
    color: theme.colors.backgroundPrimary, // Match text color
    fontWeight: "bold",
    marginLeft: 4,
  },
});

export default PantryList;
