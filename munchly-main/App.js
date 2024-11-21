// IMPORTING things we need!
// View, Text, Image, and StyleSheet are core building blocks for React Native apps.
// SafeAreaView is used to ensure the app positions content appropriately around notches and other OS interface elements.
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import { useEffect } from "react";

export default function App() {
  const welcomeMessage = "Hi my name is Anusheh!";

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{welcomeMessage}</Text>
    </SafeAreaView>
  );
}

// STYLING for our app!
// Here, we define all the styling that we use in our app. The format is always "const styles = StyleSheet.create({...})". The "styles" object contains style objects. We can access a style X with "styles.X". We will learn more about styles and the "StyleSheet" component next Tuesday:-)
const styles = StyleSheet.create({
  container: {
    flex: 1, // We'll learn about "flex" and other flexbox properties in class!
    flexDirection: "column", // Try: 'row' or 'column'
    alignItems: "center", // Try: 'flex-start' or 'center' or 'flex-end'
    justifyContent: "center", // Try: 'flex-start' or 'flex-end' or 'space-between' or 'space-around' or 'space evenly'
    backgroundColor: "#a5d6a7", // Try different color hex codes!
    padding: 16, // Try changing this value!
  },
  title: {
    fontSize: 28, // Try changing this value!
    fontWeight: "bold", // Try: 'light' or 'normal' or 'bold'
    textAlign: "center",
    fontFamily: "Georgia",
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});
