import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import {
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Text,
} from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import Theme from "@/assets/theme";
import Post from "@/components/Post";
import CommentFeed from "@/components/CommentFeed";
import db from "@/database/db";

export default function Details() {
  const { id, username, timestamp, text, score, vote, commentCount } =
    useLocalSearchParams();
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Fetch the current session
    const getSession = async () => {
      const { data } = await db.auth.getSession();
      setSession(data.session);
    };
    getSession();
  }, []);

  const submitComment = async () => {
    if (!id) {
      console.error("Error: postId is undefined. Cannot submit comment.");
      return;
    }

    if (!session) {
      console.error("User not authenticated.");
      return;
    }

    setIsLoading(true);
    try {
      await db.from("comments").insert({
        post_id: id,
        text: inputText,
        username: username || "Anonymous", // or any default username
        user_id: session.user.id,
      });
      setInputText("");
      Keyboard.dismiss();
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitDisabled = isLoading || inputText.length === 0;

  return (
    <View style={styles.container}>
      <Post
        id={id}
        username={username}
        timestamp={timestamp}
        text={text}
        score={score}
        vote={vote}
        commentCount={commentCount}
      />
      {/* This component pushes up the view when the keyboard is open so that it's still visible. */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 65 : 0}
        style={styles.keyboardContainer}
      >
        <CommentFeed postId={id} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder={"Write a comment..."}
            placeholderTextColor={Theme.colors.textSecondary}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => submitComment()}
            disabled={submitDisabled}
          >
            <FontAwesome
              size={24}
              name="send"
              color={
                submitDisabled
                  ? Theme.colors.iconSecondary
                  : Theme.colors.iconHighlighted
              }
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  keyboardContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 8,
    alignItems: "center",
  },
  input: {
    paddingLeft: 12,
    marginRight: 8,
    height: 48,
    borderRadius: 24,
    color: Theme.colors.textPrimary,
    backgroundColor: Theme.colors.backgroundSecondary,
    flex: 1,
  },
  sendButton: {
    padding: 4,
  },
});
