import React from "react";
import {
  SectionList,
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import theme from "@/assets/theme";

const PantryList = ({ sections, onAddItem, onDeleteItem }) => {
  return (
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
            onPress={() => onDeleteItem(section.title, index)}
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
            onPress={() => onAddItem(section.title)}
            color={theme.colors.iconHighlighted}
          />
        </View>
      )}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
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
  list: {
    paddingBottom: 50,
  },
});

export default PantryList;
