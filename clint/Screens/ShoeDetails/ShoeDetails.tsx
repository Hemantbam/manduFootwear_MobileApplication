import React from "react";
import { styles } from "./ShoeDetailsStyle";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Navigation from "@/components/NavigationBar/Navigation";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
function ShoeDetails() {
  const navigation = useNavigation();

  const handelAddToCart = () => {
    Toast.show({
      type: "success",
      text1: "Item added to cart",
      text2: "You can view it in your cart!",
      position: "top",
      visibilityTime: 2000,
    });
    setTimeout(() => {
      navigation.navigate("cart");
    }, 2500);
  };
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
                source={require("../images/Icons/backIcon.png")}
              ></Image>
            </TouchableOpacity>

            <View style={styles.headingBrandImageContainer}>
              <Image
                style={styles.headingBrandImage}
                source={require("../images/BrandImages/nike.png")}
              ></Image>
            </View>
            <Image
              style={styles.headingIcons}
              source={require("../images/Icons/heartIcon.png")}
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
            source={require("@/uploads/shoeImage/nikeImage.png")}
          ></Image>
          <View style={styles.ShoeImageSlider}>
            <View style={styles.shoeSliderView}></View>
            <View style={styles.shoeSliderView}></View>
            <View style={styles.shoeSliderView}></View>
          </View>
        </View>
        <View style={styles.shoeDetails}>
          <View>
            <Text style={styles.shoeHeadings}>Nike Air Max 90</Text>
            <Text style={styles.shoeHeadings}>Men's Shoes</Text>
            <Text style={styles.shoeHeadings}>Rs 6,500/-</Text>
          </View>
          <View>
            <Text style={styles.shoeDescription}>
              Nothing as fly, nothing as comfortable, nothing as proven. The
              Nike Air Max 90 stays true to its OG running roots with the iconic
              Waffle sole, stitched overlays and classic TPU details. Classic
              colors celebrate your fresh look while Max Air cushioning adds
              comfort to the journey.
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
