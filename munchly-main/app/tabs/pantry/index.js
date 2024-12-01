import { StyleSheet, Text, View } from "react-native";
import Theme from "@/assets/theme";

export default function Pantry() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Pantry!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  text: {
    color: Theme.colors.textPrimary,
    fontSize: Theme.sizes.textLarge,
  },
});
