import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  headingContainer: {
    flexDirection: "row",
  },
  topBackgroundImageContainer: {
    position: "relative",
  },
  headingImage: {},
  headingItems: {
    position: "absolute",
  },

  headingText: {
    top: 30,
    fontSize: 20,
    fontWeight: 600,
    left: 20,
  },

  headingSectionOne: {
    flexDirection: "row",
    top: 40,
    left: 20,
    alignItems: "center",
    gap: 10,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    width:300,
    paddingLeft: 10,
    paddingRight: 0,
    backgroundColor: "#EAEAEA",
    borderRadius: 5,
  },

  textInput: {
    height: "auto",
    width: 200,
  },

  ImageSize: {
    height: 50,
    width: 50,
    backgroundColor: "rgba(142,154,175,0.15)",
    padding: 5,
    borderRadius: 12,
  },

  headingSectionTwo: {
    position: "relative",
    top: -80,
    justifyContent: "center",
  },
  headingTextTwo: {
    color: "#D00000",
    fontWeight: 800,
    left: 20,
    fontSize:14,
    bottom:2,
  },

  headingTopBrandImageSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  headingSectionThree: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    top: -70,
  },

  FilterItems: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "black",
    fontWeight: 800,
    backgroundColor: "#ddd",
    borderRadius: 20,
  },

  bodySection: {
    justifyContent: "center",
  },
  shoeDisplayBox: {
    top:-60,
    justifyContent:'center',
    gap:20
  },
  shoeView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  footerSection:{
    top:-15,
  }
});
