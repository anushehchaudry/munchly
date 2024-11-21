import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation, useLocalSearchParams, useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import Theme from "@/assets/theme";
import db from "@/database/db";

export default function NewPost() {
  const {
    id,
    username: initialUsername,
    timestamp,
    text,
    score,
    vote,
    commentCount,
  } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();

  const [username, setUsername] = useState(initialUsername);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [shouldSubmit, setShouldSubmit] = useState(false);

  useEffect(() => {
    // Fetch the current session
    const getSession = async () => {
      const { data } = await db.auth.getSession();
      setSession(data.session);
    };
    getSession();
  }, []);

  useEffect(() => {
    if (shouldSubmit) {
      submitPost();
    }
  }, [shouldSubmit]);

  const submitPost = async () => {
    if (!session) {
      console.error("User not authenticated.");
      return;
    }

    console.log("inputText:", inputText);

    setIsLoading(true);
    try {
      await db.from("posts").insert({
        post_id: id,
        text: inputText,
        username: username || "Anonymous",
        user_id: session.user.id,
      });
      setIsLoading(false);
      router.back(); // Close the modal
    } catch (error) {
      console.error("Error submitting post:", error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (text) => {
    console.log("Input changed:", text);
    setInputText(text);
  };

  const handleSubmit = () => {
    setShouldSubmit(true);
  };

  const submitDisabled = isLoading || inputText.length === 0;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.headerButtonText}>Cancel</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit} disabled={submitDisabled}>
          <Text
            style={[
              styles.headerButtonText,
              submitDisabled && styles.headerButtonDisabled,
            ]}
          >
            Submit
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, submitDisabled]);

  return (
    <View style={styles.container}>
      <View style={styles.nameInputContainer}>
        <Text style={styles.nameInputPrompt}>Post as:</Text>
        <TextInput
          style={styles.nameInput}
          value={username}
          onChangeText={setUsername}
          placeholder={"Anonymous"}
          placeholderTextColor={Theme.colors.textTertiary}
        />
      </View>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={handleInputChange}
        placeholder={"What do you want to share?"}
        placeholderTextColor={Theme.colors.textSecondary}
        multiline
        textAlignVertical="top"
        autoFocus
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  nameInputContainer: {
    width: "100%",
    padding: 16,
    gap: 8,
  },
  nameInputPrompt: {
    color: Theme.colors.textPrimary,
  },
  nameInput: {
    color: Theme.colors.textSecondary,
  },
  headerButtonTextPrimary: {
    fontSize: 18,
    color: Theme.colors.textHighlighted,
  },
  input: {
    color: Theme.colors.textPrimary,
    backgroundColor: Theme.colors.backgroundSecondary,
    flex: 1,
    width: "100%",
    padding: 16,
  },
  headerButtonText: {
    fontSize: 18,
    color: Theme.colors.textHighlighted,
    marginHorizontal: 16,
  },
  headerButtonDisabled: {
    color: Theme.colors.textSecondary,
  },
});
