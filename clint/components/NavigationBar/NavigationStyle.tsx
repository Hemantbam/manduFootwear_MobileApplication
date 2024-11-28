import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 59,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    position: "relative",
  },
  shadowBox: {
    width: "100%",
    height: 7,
    position: "absolute",
    zIndex: -5,
    top: -1,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
  pressedIcon: {
    backgroundColor: "#ddd", 
    width: 60, 
    height: 60,
    borderRadius: 50, 
    justifyContent: "center",
    alignItems: "center",
    top:-10,
    elevation:10,

  },
});
