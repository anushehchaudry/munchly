import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, useRouter, useSegments } from "expo-router";

import Theme from "@/assets/theme";
import db from "@/database/db";

export default function Post(props) {
  const {
    shouldNavigateOnPress = false,
    id,
    username,
    timestamp,
    text,
    score: initialScore,
    vote: initialVote,
    commentCount,
    userId,
  } = props;

  const segments = useSegments();
  const [vote, setVote] = useState(initialVote);
  const [score, setScore] = useState(initialScore);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [tab, setTab] = useState("feed");
  const router = useRouter();

  useEffect(() => {
    if (segments[1] === "profile") {
      setTab("profile");
    } else {
      setTab("feed");
    }
  }, [segments]);

  useEffect(() => {
    // Fetch the current session
    const getSession = async () => {
      const { data } = await db.auth.getSession();
      setSession(data.session);
    };
    getSession();
  }, []);

  useEffect(() => {
    setVote(initialVote);
    setScore(initialScore);
  }, [initialVote, initialScore]);

  const submitVote = async (newVote) => {
    if (!session) {
      console.error("User not authenticated.");
      return;
    }

    setIsLoading(true);
    try {
      await db.from("likes").upsert({
        post_id: id,
        user_id: session.user.id,
        vote: newVote,
      });

      // Adjust the score based on the change in vote
      const voteDifference = newVote - vote;
      setScore(score + voteDifference);
      setVote(newVote);
    } catch (error) {
      console.error("Error submitting vote:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePress = () => {
    if (shouldNavigateOnPress) {
      // Navigate to 'details' within the current stack
      router.push({
        pathname: "details",
        params: {
          id,
          username,
          timestamp,
          text,
          score,
          vote,
          commentCount,
        },
      });
    }
  };

  let post = (
    <TouchableOpacity
      style={styles.content}
      disabled={!shouldNavigateOnPress}
      onPress={handlePress}
    >
      <View style={styles.header}>
        <FontAwesome
          size={Theme.sizes.iconSmall}
          name="user"
          color={Theme.colors.iconSecondary}
        />
        <Text style={styles.username}>{username}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.timestamp}>{timestamp}</Text>
        <View style={styles.comment}>
          <FontAwesome
            size={Theme.sizes.iconSmall}
            name="comment"
            color={Theme.colors.iconSecondary}
          />
          <Text style={styles.commentCount}>{commentCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (shouldNavigateOnPress) {
    post = (
      <Link
        href={{
          pathname: `/tabs/${tab}/details`,
          params: {
            id,
            username,
            timestamp,
            text,
            score: initialScore,
            commentCount,
            vote: initialVote,
            userId,
          },
        }}
        asChild={true}
        style={styles.content}
      >
        {post}
      </Link>
    );
  }

  const upvoteButton = (
    <TouchableOpacity
      onPress={() => (vote > 0 ? submitVote(0) : submitVote(1))}
      style={styles.upvoteButton}
      disabled={isLoading}
    >
      <FontAwesome
        size={16}
        name="chevron-up"
        color={
          vote > 0 ? Theme.colors.iconHighlighted : Theme.colors.iconSecondary
        }
      />
    </TouchableOpacity>
  );

  const downvoteButton = (
    <TouchableOpacity
      onPress={() => (vote < 0 ? submitVote(0) : submitVote(-1))}
      style={styles.downvoteButton}
      disabled={isLoading}
    >
      <FontAwesome
        size={16}
        name="chevron-down"
        color={
          vote < 0 ? Theme.colors.iconHighlighted : Theme.colors.iconSecondary
        }
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {post}
      <View style={styles.scoreContainer}>
        {upvoteButton}
        <Text style={styles.score}>{score}</Text>
        {downvoteButton}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    // padding: 24,
    paddingVertical: 12,
    paddingLeft: 20,
    paddingRight: 8,
    backgroundColor: Theme.colors.backgroundSecondary,
    flexDirection: "row",
  },
  content: {
    flex: 1,
    gap: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  body: {
    width: "100%",
  },
  footer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  scoreContainer: {
    alignItems: "center",
    marginLeft: 16,
  },
  text: {
    color: Theme.colors.textPrimary,
    fontWeight: "bold",
    fontSize: Theme.sizes.textMedium,
  },
  username: {
    color: Theme.colors.textSecondary,
    fontWeight: "bold",
    marginLeft: 8,
  },
  timestamp: {
    color: Theme.colors.textSecondary,
    flex: 2,
  },
  comment: {
    flexDirection: "row",
    flex: 3,
  },
  commentCount: {
    color: Theme.colors.textSecondary,
    marginLeft: 8,
  },
  score: {
    color: Theme.colors.textHighlighted,
    fontWeight: "bold",
    fontSize: Theme.sizes.textLarge,
  },
  // Make sure the buttons have a lot of padding to increase the area of the touch target.
  upvoteButton: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 6,
  },
  downvoteButton: {
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 8,
  },
});
