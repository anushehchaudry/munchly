import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import {
  getSavedItems,
  removeItem,
  saveItem,
} from "../../../utils/asyncStorageUtils";
import { useFocusEffect } from "@react-navigation/native"; // Hook to detect focus
import Theme from "../../../assets/theme";

export default function Saved() {
  const [savedItems, setSavedItems] = useState([]);
  const [flatListKey, setFlatListKey] = useState("grid"); // Unique key to force re-render
  const [activeTab, setActiveTab] = useState("TODO"); // Current tab: TODO or COMPLETED

  // Fetch saved items whenever the tab gains focus
  useFocusEffect(
    React.useCallback(() => {
      const fetchSavedItems = async () => {
        const items = await getSavedItems();
        //console.log("Saved Items:", items); 
        setSavedItems(
          items.map((item) => ({ ...item, completed: item.completed || false }))
        ); 
        setFlatListKey((prevKey) => (prevKey === "grid" ? "list" : "grid"));
      };
      fetchSavedItems();
    }, [])
  );

  const markAsCompleted = async (item) => {
    const updatedItem = { ...item, completed: true }; // Mark as completed
    await saveItem(updatedItem);
    const updatedItems = savedItems.map((i) =>
      i.id === item.id ? updatedItem : i
    );
    setSavedItems(updatedItems);
  };

  const moveToTodo = async (item) => {
    const updatedItem = { ...item, completed: false }; // Move back to TODO
    await saveItem(updatedItem);
    const updatedItems = savedItems.map((i) =>
      i.id === item.id ? updatedItem : i
    );
    setSavedItems(updatedItems);
  };

  const unsaveItem = async (itemId) => {
    await removeItem(itemId); // Remove item
    const updatedItems = savedItems.filter((item) => item.id !== itemId);
    setSavedItems(updatedItems);
  };

  const renderGridItem = ({ item }) => (
    <View style={styles.gridItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
      <View style={styles.buttonRow}>
        {!item.completed && (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => markAsCompleted(item)}
          >
            <Text style={styles.buttonText}>Mark Completed</Text>
          </TouchableOpacity>
        )}
        {item.completed && (
          <TouchableOpacity
            style={styles.todoButton}
            onPress={() => moveToTodo(item)}
          >
            <Text style={styles.buttonText}>Make Again!</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.unsaveButton}
          onPress={() => unsaveItem(item.id)}
        >
          <Text style={styles.buttonText}>Unsave</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const filteredItems =
    activeTab === "TODO"
      ? savedItems.filter((item) => !item.completed)
      : savedItems.filter((item) => item.completed);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={Theme.colors.iconPrimary}
        barStyle="light-content"
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Recipes</Text>
      </View>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "TODO" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("TODO")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "TODO" && styles.activeTabText,
            ]}
          >
            TODO
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "COMPLETED" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("COMPLETED")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "COMPLETED" && styles.activeTabText,
            ]}
          >
            COMPLETED
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {filteredItems.length === 0 ? (
          <Text style={styles.emptyText}>
            {activeTab === "TODO"
              ? "Save your first recipe!"
              : "Complete your first recipe!"}
          </Text>
        ) : (
          <FlatList
            key={flatListKey} // Force re-render if needed
            data={filteredItems}
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : index.toString()
            } 
            numColumns={2} // Keep this value constant for a grid
            renderItem={renderGridItem}
            columnWrapperStyle={styles.row} 
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.iconPrimary, 
  },
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundPrimary, 
    padding: 16,
    marginTop: -20,
  },
  header: {
    backgroundColor: Theme.colors.iconPrimary, 
    paddingVertical: 30,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: Theme.colors.cardBackground,
    paddingVertical: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: Theme.colors.iconPrimary,
  },
  tabText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
  activeTabText: {
    color: "white",
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
  row: {
    justifyContent: "space-between", 
    marginBottom: 16,
  },
  gridItem: {
    width: "48%",
    alignItems: "center",
    backgroundColor: Theme.colors.cardBackground,
    margin: 8,
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: 100, 
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    color: Theme.colors.textPrimary,
    textAlign: "center",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
  },
  completeButton: {
    backgroundColor: Theme.colors.iconPrimary,
    padding: 8,
    borderRadius: 8,
    marginRight: 5,
  },
  todoButton: {
    backgroundColor: Theme.colors.iconPrimary,
    padding: 8,
    borderRadius: 8,
    marginRight: 5,
  },
  unsaveButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});
