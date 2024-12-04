import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./CheckOutStyle";
import { useNavigation } from "@react-navigation/native";
function CheckOut() {
  const navigation = useNavigation();
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
                source={require("../images/Icons/backIcon.png")}
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
                source={require("@/uploads/shoeImage/nikeImage.png")}
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
                source={require("@/uploads/shoeImage/nikeImage.png")}
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
                source={require("@/uploads/shoeImage/nikeImage.png")}
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
          <Text>Order Summary</Text>

          <View style={styles.horizontalLine}></View>

          <View>
            <Text>Cost Price: 6,500/-</Text>
            <Text>Discount: 500/-</Text>
            <Text>Delivery: 200/-</Text>
            <Text>Total: 6,200/-</Text>
          </View>
        </View>
      </View>
    </>
  );
}

export default CheckOut;
