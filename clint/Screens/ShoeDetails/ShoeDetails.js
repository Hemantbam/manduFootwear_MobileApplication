import React, { useEffect } from "react";
import { styles } from "./ShoeDetailsStyle";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Navigation from "@/components/NavigationBar/Navigation";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useContext } from "react";
import { UserRegistrationDetails } from "@/context/Context";

function ShoeDetails() {
  const navigation = useNavigation();
  const { shoeDetails } = useContext(UserRegistrationDetails);

  const handelAddToCart = () => {
    Toast.show({
      type: "success",
      text1: "Item added to cart",
      text2: "You can view it in your cart!",
      position: "top",
      visibilityTime: 2000,
    });
    setTimeout(() => {
      // navigation.navigate("cart");
    }, 2500);
  };

  useEffect(()=>{
    console.log("sssssssssssss",shoeDetails)
  },[])
  return (
    <>
      <View style={styles.ShoeBoxContainer}>
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
                source={require("@/images/Icons/backIcon.png")}
              ></Image>
            </TouchableOpacity>

            <View style={styles.headingBrandImageContainer}>
              <Image
                style={styles.headingBrandImage}
                source={require("@/images/BrandImages/nike.png")}
              ></Image>
            </View>
            <Image
              style={styles.headingIcons}
              source={require("@/images/Icons/heartIcon.png")}
            ></Image>
          </View>
        </View>
        <View style={styles.shoeColorCode}>
          <View style={styles.color}></View>
          <View style={styles.color}></View>
          <View style={styles.color}></View>
        </View>

        <View>
          <Image
            style={styles.shoeImage}
            source={require("@/images/Uploads/nikeImage.png")}
          ></Image>
          <View style={styles.ShoeImageSlider}>
            <View style={styles.shoeSliderView}></View>
            <View style={styles.shoeSliderView}></View>
            <View style={styles.shoeSliderView}></View>
          </View>
        </View>
        <View style={styles.shoeDetails}>
          <View>
            <Text style={styles.shoeHeadings}>{shoeDetails[0].shoeName}</Text>
            <Text style={styles.shoeHeadings}>{shoeDetails[0].gender}</Text>
            <Text style={styles.shoeHeadings}>{shoeDetails[0].price}/-</Text>
          </View>
          <View>
            <Text style={styles.shoeDescription}>
             {shoeDetails[0].description} 
            </Text>
          </View>
        </View>
        <View style={styles.sizeSelectionBox}>
          <Text style={styles.textOne}>Size :: </Text>
          <View style={styles.sizeBox}>
            <TouchableOpacity>
              <View style={styles.size}>
                <Text style={styles.sizeText}>39</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.size}>
                <Text style={styles.sizeText}>40</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.size}>
                <Text style={styles.sizeText}>41</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.size}>
                <Text style={styles.sizeText}>42</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.size}>
                <Text style={styles.sizeText}>43</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.cartButton} onPress={handelAddToCart}>
          <View>
            <Text>Add to Cart</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Navigation />
      </View>
    </>
  );
}

export default ShoeDetails;
