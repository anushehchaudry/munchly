import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "savedItems";

export const saveItem = async (item) => {
  try {
    const savedItems = await getSavedItems();
    const updatedItems = savedItems.map((savedItem) =>
      savedItem.id === item.id ? { ...savedItem, ...item } : savedItem
    );
    if (!savedItems.some((savedItem) => savedItem.id === item.id)) {
      updatedItems.push(item); // Add new item if not already saved
    }
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
  } catch (error) {
    console.error("Error saving item:", error);
  }
};

// Update an item's status
export const updateItemStatus = async (itemId, newStatus) => {
  try {
    const savedItems = await getSavedItems();
    const updatedItems = savedItems.map((item) =>
      item.id === itemId ? { ...item, status: newStatus } : item
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
  } catch (error) {
    console.error("Error updating item status:", error);
  }
};

// Remove an item from AsyncStorage
export const removeItem = async (itemId) => {
  try {
    const savedItems = await getSavedItems();
    const updatedItems = savedItems.filter((item) => item.id !== itemId);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
    //console.log("Item removed:", updatedItems); 
  } catch (error) {
    console.error("Error removing item:", error);
  }
};

// Get all saved items from AsyncStorage
export const getSavedItems = async () => {
  try {
    const savedItems = await AsyncStorage.getItem(STORAGE_KEY);
    return savedItems ? JSON.parse(savedItems) : [];
  } catch (error) {
    console.error("Error retrieving saved items:", error);
    return [];
  }
};
