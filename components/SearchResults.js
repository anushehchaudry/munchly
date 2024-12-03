import {
  Dimensions,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  ListItem,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
//import millisToMinutesAndSeconds from "./utils/millisToMinutesAndSeconds";
import Theme from "@/assets/theme";

const windowWidth = Dimensions.get("window").width;

const SearchResults = (props) => {
  const foodIndex = props.index + 1;
  const title = props.title;
  const image = props.image;
  //console.log("tot url", props.image)
  const imageType = props.imageType;
  // let duration = props.duration;
  // duration = millisToMinutesAndSeconds(duration);
  // const externalUrl = props.externalUrl;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.indexText}>{foodIndex}</Text>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.recipeSave}>
          <Text style={styles.recipeName} numberOfLines={3}>
            {title}
          </Text>
          <Text style={styles.save}>Save</Text>
        </View>
        {/* <Text style={styles.recipeName} numberOfLines={3}>
          {title}
        </Text> */}
      </View>
    </SafeAreaView>
  );
};
// save button, flex col under recipename

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.9,
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
    flexDirection: "row",
    justifyContent: "flex-start",
    flex: 1,
    margin: 10,
    padding: 10,
    //resizeMode: "cover",
  },
  rowContainer: {
    flexDirection: "row", // Ensures items are aligned in a row
    alignItems: "center", // Vertically aligns items
  },
  recipeName: {
    flex: 1,
    paddingLeft: 10,
    color: "black",
    // alignItems: "flex-end",
    textAlign: "left",
  },
  recipeSave: {
    flex: 1,
    flexDirection: "column",
    // alignItems: "center"
  },
  save: {
    backgroundColor: Theme.colors.iconPrimary,
    color: "white",
    padding: 10,
    alignSelf: "center", 
    paddingHorizontal: 40,
    borderRadius: 20

  },
  indexText: {
    color: "gray",
    paddingTop: 10,
    paddingRight: 20,
    fontSize: 10,
    width: 10,
  },
  image: {
    width: windowWidth * 0.25,
    aspectRatio: 1,
    borderRadius: 10,
  },
  mainText: {
    color: "white",
  },
  subText: {
    color: "gray",
    padding: 20,
  },
  songArtistBlock: {
    flexDirection: "column",
    marginLeft: 10,
    justifyContent: "flex-start",
    //flex: 1,
    //width: 20,
  },

  songArtistText: {
    paddingLeft: 5,
    color: "black",
  },
  leftSide: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: windowWidth * 0.35,
    paddingRight: 30,
    flex: 1,
  },
  rightSide: {
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 50,
    marginRight: 30,
    width: windowWidth * 0.15,
  },
  durationText: {
    paddingLeft: 20,
    color: "white",
  },
  albumNameMod: {
    paddingLeft: 50,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: windowWidth * 0.4,
  },
});
