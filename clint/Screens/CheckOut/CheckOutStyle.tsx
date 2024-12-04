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
    alignItems:'center',
    top:10
  },
  shoeImage:{
    height:100,
    width:100,
  },
  shoeOrderItems: {
    borderWidth: 1,
    borderColor: '#ddd',
    height: 250, 
    width: '100%',
    top:20,
  },
  
  shoeOrderContainer: {
    alignItems: 'center',  // layout-specific styles moved here
  },
  orderItemText:{
    fontWeight:700,
    fontSize:15,
    top:12,

  },
  horizontalLine:{
    height:1,
    width:'100%',
    backgroundColor:'#ddd',
    top:10,
  },
  itemQuantity:{
    left:50,
    fontSize:15,
    fontWeight:900,
    
  }
});
