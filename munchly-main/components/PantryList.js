import React from "react";
import { SectionList, View, Text, Button, StyleSheet } from "react-native";
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.iconPrimary,
    padding: 10,
    marginVertical: 5,
  },
  title: {
    fontSize: theme.sizes.textLarge,
    fontWeight: "bold",
    fontFamily: theme.fonts.fontPrimary,
    color: theme.colors.textPrimary,
  },
  list: {
    paddingBottom: 50,
  },
});

export default PantryList;
