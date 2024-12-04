import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  checkOutContainer: {
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
  totalCheckOutCount: {
    width: 95,
    height: 30,
    backgroundColor: "#fff",
    top: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    left: 20,
  },
  totalCountText: {
    fontWeight: 600,
  },
  checkOutDetailsBox: {
    alignItems: "center",
  },
  contactDetails: {
    justifyContent: "center",
  },
  shoeOrderDetails: {
    flexDirection: "row",
    alignItems: "center",
    top: 10,
  },
  shoeImage: {
    height: 100,
    width: 100,
  },
  shoeOrderItems: {
    borderWidth: 1,
    borderColor: "#ddd",
    height: 250,
    width: "100%",
    top: 20,
  },

  shoeOrderContainer: {
    alignItems: "center",
  },
  orderItemText: {
    fontWeight: 700,
    fontSize: 15,
    top: 12,
  },
  horizontalLine: {
    height: 1,
    width: "100%",
    backgroundColor: "#ddd",
    top: 10,
  },
  itemQuantity: {
    left: 50,
    fontSize: 15,
    fontWeight: 900,
  },
  orderSummaryBox: {
    height: 180,
    left: 0,
    top: 70,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  footerSection: {
    top: 82,
  },
  orderSummaryHeadingText: {
    fontSize: 20,
    fontWeight: 800,
    top: 7,
  },
  orderSummaryHorizontalLine: {
    height: 3,
    width: "100%",
    backgroundColor: "black",
    top:15,
  },
  orderSummary: {
    top: 20,
  },

  paymentBtn: {
    top: -10,
    left: 140,
    width: 100,
    height: 40,
    backgroundColor: "#FFD269",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    elevation:4
  },
  totalPrice: {
    fontWeight: 600,
  },
  paymentBtnText:{
    fontWeight:700,

  },
  paymentModeText:{
    top:30,
    right:90,
    fontWeight:600,

  }
});
