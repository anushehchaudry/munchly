import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Import icons from Expo
import theme from "@/assets/theme";

const PantryItem = ({ item, onDelete, onEdit }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(item.name);
  const [editedQuantity, setEditedQuantity] = useState(item.quantity);

  const handleSaveEdit = () => {
    onEdit(editedName, editedQuantity);
    setIsEditing(false);
  };

  return (
    <View style={styles.item}>
      <Text style={styles.text}>
        {item.name} - {item.quantity}
      </Text>
      <TouchableOpacity
        onPress={() => setMenuVisible(true)}
        style={styles.optionsButton}
      >
        <MaterialIcons
          name="more-vert"
          size={theme.sizes.iconMedium}
          color={theme.colors.textPrimary}
        />
      </TouchableOpacity>

      {/* Options Menu */}
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              onDelete();
            }}
          >
            <Text style={styles.menuText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              setIsEditing(true);
            }}
          >
            <Text style={styles.menuText}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <Modal transparent={true} animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Edit Item</Text>
              <TextInput
                style={styles.input}
                value={editedName}
                onChangeText={setEditedName}
                placeholder="Item Name"
                placeholderTextColor={theme.colors.textPrimary}
              />
              <TextInput
                style={styles.input}
                value={editedQuantity}
                onChangeText={setEditedQuantity}
                placeholder="Quantity"
                keyboardType="numeric"
                placeholderTextColor={theme.colors.textPrimary}
              />
              <Button
                title="Save"
                onPress={handleSaveEdit}
                color={theme.colors.iconHighlighted}
              />
              <Button
                title="Cancel"
                onPress={() => setIsEditing(false)}
                color="red"
              />
            </View>
          </View>
        </Modal>
      )}
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
    position: "relative",
  },
  text: {
    fontSize: theme.sizes.textMedium,
    fontFamily: theme.fonts.fontPrimary,
    color: theme.colors.textPrimary,
  },
  optionsButton: {
    padding: 5,
  },
  menu: {
    position: "absolute",
    top: 30,
    right: 10,
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 100,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuText: {
    fontSize: theme.sizes.textMedium,
    fontFamily: theme.fonts.fontPrimary,
    color: theme.colors.textPrimary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: theme.sizes.textLarge,
    fontWeight: "bold",
    fontFamily: theme.fonts.fontPrimary,
    color: theme.colors.textPrimary,
    marginBottom: 10,
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
});

export default PantryItem;
