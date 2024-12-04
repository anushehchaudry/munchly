import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "savedItems";

// Save an item to AsyncStorage
export const saveItem = async (item) => {
  try {
    const savedItems = await getSavedItems();
    // Prevent duplicates
    const alreadySaved = savedItems.some((savedItem) => savedItem.id === item.id);
    if (!alreadySaved) {
      const updatedItems = [...savedItems, item];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
    }
  } catch (error) {
    console.error("Error saving item:", error);
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
