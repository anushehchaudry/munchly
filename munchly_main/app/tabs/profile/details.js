import { useLocalSearchParams } from "expo-router";
import PostDetails from "@/components/PostDetails";

export default function Details() {
  const { id, username, timestamp, text, score, vote, commentCount } =
    useLocalSearchParams();

  return (
    <PostDetails
      id={id}
      username={username}
      timestamp={timestamp}
      text={text}
      score={score}
      vote={vote}
      commentCount={commentCount}
    />
  );
}
