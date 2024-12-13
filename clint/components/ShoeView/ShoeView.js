import { styles } from "./Style";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getShoeById } from "@/api/shoesApi";
import { useContext } from "react";
import { UserRegistrationDetails } from "@/context/Context";

function ShoeView({ id, shoeName, gender, price }) {
  
  const { setShoeDetails } = useContext(UserRegistrationDetails);
  const navigation = useNavigation();

  const handleShoeDetails = async (id) => {
    const result = await getShoeById(id);
    setShoeDetails(result.shoeDetails);
    navigation.navigate("shoeDetails");
  };

  return (
    <>
      <View style={styles.shoeContainer}>
        <TouchableOpacity onPress={() => handleShoeDetails(id)}>
          <View style={styles.shoeImage}>
            <Image source={require("@/images/Uploads/shoe.png")}></Image>
            <View style={styles.favIcon}>
              <Image source={require("@/images/Icons/heart.png")}></Image>
            </View>

            <View style={styles.shoeDetails}>
              <Text>{id}</Text>
              <Text>{shoeName}</Text>
              <Text>{gender} Shoes</Text>
              <Text>Rs {price}/-</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default ShoeView;
