import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  ShoeBoxContainer: {
    alignContent: "center",
  },
  headingBackground: {
    backgroundColor: "#FFD166",
    height: 200,
    width: "100%",
    borderRadius: 20,
    top: -20,
  },
  headingText: {
    fontWeight: 900,
    fontFamily: "Monda",
    fontSize: 20,
    textAlign: "left",
    left: 20,
    top: 40,
  },
  topNavBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    top: 60,
  },

  shoeColorCode: {
    flexDirection: "row",
    gap: 10,
    top: 10,
    left: 300,
  },
  color: {
    width: 18,
    height: 18,
    borderRadius: 50,
    backgroundColor: "#930921",
  },
  headingBrandImageContainer: {
    height: 44,
    width: 226,
    backgroundColor: "rgba(76,6,6,0.1)",
    overflow: "hidden",
    borderRadius: 10,
  },
  headingBrandImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  headingIcons: {
    height: 35,
    width: 35,
  },
  shoeImage: {
    height: 250,
    width: 250,
    transform: "rotate(-40deg)",
    justifyContent: "center",
    alignItems: "center",
    left: 50,
  },
  ShoeImageSlider: {
    flexDirection: "row",
    left: 270,
    gap: 5,
  },
  shoeSliderView: {
    height: 3.5,
    width: 30,
    borderRadius: 3,
    backgroundColor: "black",
  },
  shoeDetails: {
    height: "auto",
    width: 300,
    left: 60,
    top: 20,
  },
  shoeHeadings: {
    fontWeight: 700,
  },
  shoeDescription: {
    textAlign: "justify",
  },
  sizeSelectionBox: {
    flexDirection: "row",
    top: 50,
    alignItems: "center",
    left: 70,
  },
  textOne: {
    fontWeight: 800,
    right: 10,
  },
  sizeBox: {
    flexDirection: "row",
    gap: 10,
  },
  size: {
    height: 30,
    width: 30,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    textAlign: "center",
  },
  cartButton: {
    left:210,
    backgroundColor: "#FFD269",
    flexDirection:'row',
    top:70,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    width:160,
    borderRadius:10,
    elevation:20
  },
  footer:{
    top:100
  }
});
