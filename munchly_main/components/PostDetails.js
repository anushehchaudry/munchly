import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Text,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation, useRouter } from "expo-router";
import Theme from "@/assets/theme";
import Post from "@/components/Post";
import CommentFeed from "@/components/CommentFeed";
import db from "@/database/db";

export default function PostDetails({
  id,
  username,
  timestamp,
  text,
  score,
  vote,
  commentCount,
}) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Comments",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: Theme.colors.backgroundPrimary,
      },
      headerTintColor: Theme.colors.textSecondary,
      headerTitleStyle: {
        color: Theme.colors.textPrimary,
        fontSize: Theme.sizes.textLarge,
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          {Platform.OS === "ios" ? (
            <>
              <MaterialCommunityIcons
                name="chevron-left"
                size={36}
                color={Theme.colors.textPrimary}
              />
              <Text
                style={{
                  color: Theme.colors.textPrimary,
                  fontSize: 16,
                }}
              >
                Back
              </Text>
            </>
          ) : (
            <MaterialCommunityIcons
              name="arrow-left"
              size={20}
              color={Theme.colors.textPrimary}
            />
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, router]);

  const submitComment = async () => {
    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await db.auth.getUser();
      if (!user) {
        console.log("User not logged in");
        setInputText("");
        setIsLoading(false);
        return;
      }
      const { error } = await db.from("comments").insert({
        post_id: id,
        username: "Anonymous",
        text: inputText,
        user_id: user.id,
      });

      if (error) {
        console.error("Error submitting comment:", error.message);
      } else {
        console.log("Comment submitted successfully");
      }
    } catch (error) {
      console.error("Unexpected error submitting comment:", error);
    } finally {
      setIsLoading(false);
      setInputText("");
      Keyboard.dismiss();
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
            placeholder="Write a comment..."
            placeholderTextColor={Theme.colors.textSecondary}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={submitComment}
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
  keyboardContainer: { flex: 1 },
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
  sendButton: { padding: 4 },
});
