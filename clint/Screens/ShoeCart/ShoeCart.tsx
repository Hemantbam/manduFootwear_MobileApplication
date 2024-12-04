import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./shoeCartStyle";
import { useNavigation } from "@react-navigation/native";
import Navigation from "@/components/NavigationBar/Navigation";
function ShoeCart() {
  const navigation = useNavigation();
  const [quantity, setquantity] = useState(1);

  const handelQuantityIncrement = () => {
    setquantity(quantity + 1);
  };
  const handelQuantityDecrement = () => {
    if (quantity !== 1) {
      setquantity(quantity - 1);
    }
  };
  return (
    <>
      <View style={styles.shoeCartBox}>
        <View style={styles.headingBackground}>
          <Text style={styles.headingText}>ManduFootwear</Text>
          <View style={styles.topNavBar}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("home");
              }}
            >
              <Image
                style={styles.headingIcons}
                source={require("../images/Icons/backIcon.png")}
              ></Image>
            </TouchableOpacity>

            <View style={styles.headingBrandImageContainer}>
              <Text style={styles.shoeCartHeadingText}>Shop Cart</Text>
            </View>
          </View>
        </View>
        <View style={styles.cartBox}>
          <View style={styles.cartItemBox}>
            <Image
              style={styles.shoeImage}
              source={require("@/uploads/shoeImage/nikeImage.png")}
            ></Image>
            <View style={styles.shoeDetails}>
              <Text style={styles.shoeDetailsText}>Nike Air Max 90</Text>
              <Text style={styles.shoeDetailsText}>Men's Shoes</Text>
              <Text style={styles.shoeDetailsText}>Rs 6,500/-</Text>
            </View>

            <View style={styles.quantityBox}>
              <TouchableOpacity onPress={handelQuantityIncrement}>
                <View style={styles.quantityActionButton}>
                  <Text style={styles.quantityText}>+</Text>
                </View>
              </TouchableOpacity>
              <View>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
              <TouchableOpacity onPress={handelQuantityDecrement}>
                <View style={styles.quantityActionButton}>
                  <Text style={styles.quantityText}>-</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <View style={styles.deleteIcon}>
                <Image
                  style={styles.delIconImage}
                  source={require("../images/Icons/delete.png")}
                ></Image>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.checkOutTotal}>
            <View>
              <Text style={styles.checkOutDetails}>Cost Price: 6,500/-</Text>
              <Text style={styles.checkOutDetails}>Delivery:200 </Text>
              <Text style={styles.checkOutDetails}>Total:6,700/-</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("checkOut");
              }}
            >
              <View style={styles.checkOutBtn}>
                <Text style={styles.btnText}>Check Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.footerSection}>
        <Navigation />
      </View>
    </>
  );
}

export default ShoeCart;
