import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@pantryData";

export const loadPantryData = async (defaultPantry) => {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : defaultPantry;
  } catch (error) {
    console.error("Failed to load pantry data:", error);
    return defaultPantry;
  }
};

export const savePantryData = async (pantry) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pantry));
  } catch (error) {
    console.error("Failed to save pantry data:", error);
  }
};
