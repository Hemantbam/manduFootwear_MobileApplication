import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./CheckOutStyle";
import { useNavigation } from "@react-navigation/native";
import Navigation from "@/components/NavigationBar/Navigation";
import Toast from "react-native-toast-message";
function CheckOut() {
  const navigation = useNavigation();

  const handelPayment=()=>{
    Toast.show({
      type: "success",
      position: "top",
      text1: "Order Successfull",
      text2: "Your order has been placed successfully",
      visibilityTime:2000,
    })
    setTimeout(()=>{
      navigation.navigate('home')
    },2200)
  }
  return (
    <>
      <View style={styles.checkOutContainer}>
        <View style={styles.headingBackground}>
          <Text style={styles.headingText}>ManduFootwear</Text>
          <View style={styles.topNavBar}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("cart");
              }}
            >
              <Image
                style={styles.headingIcons}
                source={require("@/images/Icons/backIcon.png")}
              ></Image>
            </TouchableOpacity>

            <View style={styles.headingBrandImageContainer}>
              <Text style={styles.shoeCartHeadingText}>
                Check out order details
              </Text>
            </View>
          </View>
          <View style={styles.totalCheckOutCount}>
            <Text style={styles.totalCountText}>Total Count: 1</Text>
          </View>
        </View>
        <View style={styles.checkOutDetailsBox}>
          <View style={styles.contactDetails}>
            <Text>Delivery to : Hemant Bam</Text>
            <Text>Milanchok,Kapan,kathmandu</Text>
            <Text>9898787867</Text>
            <Text>hemantbam9865@gmail.com</Text>
          </View>

          <View style={styles.horizontalLine}></View>
          <Text style={styles.orderItemText}>Order Items</Text>

          <ScrollView
            style={styles.shoeOrderItems}
            contentContainerStyle={styles.shoeOrderContainer}
          >
            <View style={styles.shoeOrderDetails}>
              <Image
                style={styles.shoeImage}
                source={require("@/images/Uploads/nikeImage.png")}
              ></Image>
              <View>
                <Text>Nike Air Max 90</Text>
                <Text>Men's Shoes</Text>
                <Text>Rs 6,500/-</Text>
              </View>
              <Text style={styles.itemQuantity}> Qty: 1</Text>
            </View>

            <View style={styles.shoeOrderDetails}>
              <Image
                style={styles.shoeImage}
                source={require("@/images/Uploads/nikeImage.png")}
              ></Image>
              <View>
                <Text>Nike Air Max 90</Text>
                <Text>Men's Shoes</Text>
                <Text>Rs 6,500/-</Text>
              </View>
              <Text style={styles.itemQuantity}> Qty: 1</Text>
            </View>

            <View style={styles.shoeOrderDetails}>
              <Image
                style={styles.shoeImage}
                source={require("@/images/Uploads/nikeImage.png")}
              ></Image>
              <View>
                <Text>Nike Air Max 90</Text>
                <Text>Men's Shoes</Text>
                <Text>Rs 6,500/-</Text>
              </View>

              <Text style={styles.itemQuantity}> Qty: 1</Text>
            </View>
          </ScrollView>
        </View>

        <View style={styles.orderSummaryBox}>
          <Text style={styles.orderSummaryHeadingText}>Order Summary</Text>

          <View style={styles.orderSummaryHorizontalLine}></View>

          <View style={styles.orderSummary}>
            <Text>Cost Price: 6,500/-</Text>
            <Text>Discount: 500/-</Text>
            <Text>Delivery: 200/-</Text>
            <Text style={styles.totalPrice}>Total: 6,200/-</Text>
          </View>
          <Text style={styles.paymentModeText}>Available Payment Mode: COD</Text>
          
          <TouchableOpacity onPress={handelPayment}>
            <View style={styles.paymentBtn}>
              <Text style={styles.paymentBtnText}>Place Order</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footerSection}>
        <Navigation />
      </View>
    </>
  );
}

export default CheckOut;
