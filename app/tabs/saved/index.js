import { StyleSheet, Text, View } from "react-native";
import Theme from "@/assets/theme";

export default function Saved() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to your cookbook!</Text>
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
