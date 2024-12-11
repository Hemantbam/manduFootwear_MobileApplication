import { styles } from "./Style";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
function ShoeView() {
  const navigation = useNavigation();
  const handleShoeDetails = () => {
    navigation.navigate("shoeDetails");
  };
  return (
    <>
      <View style={styles.shoeContainer}>
        <TouchableOpacity onPress={handleShoeDetails}>
          <View style={styles.shoeImage}>
            <Image source={require("@/images/Uploads/shoe.png")} ></Image>
            <View style={styles.favIcon}>
              <Image source={require("@/images/Icons/heart.png")}></Image>
            </View>

            <View style={styles.shoeDetails}>
              <Text>Nike Air Max 90</Text>
              <Text>Men's Shoes</Text>
              <Text>Rs 6,500/-</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default ShoeView;
