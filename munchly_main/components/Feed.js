import { useState, useEffect } from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";

import Theme from "@/assets/theme";
import Post from "@/components/Post";
import Loading from "@/components/Loading";
import db from "@/database/db";

import timeAgo from "@/utils/timeAgo";

export default function Feed({
  fetchUsersPostsOnly = false,
  shouldNavigateOnPress = false,
}) {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const { data, error: userError } = await db.auth.getUser();

      if (userError || !data.user) {
        console.error("User not found.");
        return;
      }

      const userId = data.user.id;

      if (!userId) {
        console.error("User ID is undefined.");
        return;
      }

      // Base query for fetching posts
      let query = db
        .from("posts_with_counts")
        .select("*, user_id") // Include user_id in the select query
        .order("timestamp", { ascending: false });

      // If we are on the profile page, filter posts by the user's ID
      if (fetchUsersPostsOnly) {
        query = query.eq("user_id", userId);
      }

      const { data: posts, error: postsError } = await query;

      if (postsError) {
        console.error("Error fetching posts:", postsError);
        return;
      }

      let likes = [];
      // Fetch likes only if userId is defined
      const { data: likesData, error: likesError } = await db
        .from("likes")
        .select("post_id, vote")
        .eq("user_id", userId);

      if (likesError) {
        console.error("Error fetching likes:", likesError);
      } else {
        likes = likesData;
      }

      // Map likes to the posts
      const postsWithLikes = posts.map((post) => {
        const like = likes.find((like) => like.post_id === post.id);
        return {
          ...post,
          vote: like ? like.vote : 0, // Use like.vote if it exists, otherwise 0
        };
      });

      setPosts(postsWithLikes);
      console.log("User:", data.user);
      console.log("User ID:", userId);
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading && !isRefreshing) {
    return <Loading />;
  }

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <Post
          shouldNavigateOnPress={shouldNavigateOnPress}
          id={item.id}
          username={item.username}
          timestamp={timeAgo(item.timestamp)}
          text={item.text}
          score={item.like_count}
          vote={item.vote}
          commentCount={item.comment_count}
          userId={item.user_id}
        />
      )}
      contentContainerStyle={styles.posts}
      style={styles.postsContainer}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => {
            setIsRefreshing(true);
            fetchPosts();
          }}
          tintColor={Theme.colors.textPrimary} // only applies to iOS
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  postsContainer: {
    width: "100%",
  },
  posts: {
    gap: 8,
  },
});
