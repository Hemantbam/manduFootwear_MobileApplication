import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  shoeCartBox: {
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
  headingBrandImageContainer: {
    backgroundColor: "#ffffff",
    width: 280,
    paddingHorizontal: 10,
    height: 40,
    justifyContent: "center",
    borderRadius: 10,
  },
  shoeCartHeadingText: {
    fontWeight: 600,
    fontSize: 18,
  },
  headingIcons: {
    height: 35,
    width: 35,
  },
  cartBox: {
    alignItems: "center",
    width: "100%",
    height: "auto",
  },
  shoeImage: {
    height: 120,
    width: 120,
  },
  cartItemBox: {
    flexDirection: "row",
    height: 100,
    width: 350,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  shoeDetails: {
    left: 10,
  },

  shoeDetailsText: {
    fontWeight: 700,
  },
  quantityBox: {
    left: 10,
    alignItems: "center",
  },
  quantityActionButton: {
    borderWidth: 1,
    borderBlockColor: "black",
    width: 25,
    alignItems: "center",
  },
  quantityText: {
    fontWeight: 900,
    fontSize: 15,
  },
  deleteIcon: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "red",
    right: -8,
  },
  delIconImage: {
    height: 20,
    width: 20,
  },
  checkOutTotal: {
    flexDirection: "row",
    width:350,
    height:80,
    alignItems:'center',
    justifyContent:'space-evenly',
    borderWidth:0.5,
    borderColor:'black',
    top:390,
  },
  checkOutBtn:{
    left:30,
    backgroundColor: "#FFD269",
    flexDirection:'row',
    height:40,
    alignItems:'center',
    justifyContent:'center',
    width:120,
    borderRadius:10,
    elevation:2
  },
  footerSection:{
    top:430,
  },
  checkOutDetails:{
    fontWeight:700,
  },
  btnText:{
    fontWeight:600,

  }
});
