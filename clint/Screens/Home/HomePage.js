import React, { useEffect, useState } from "react";
import { styles } from "./HomePageStyle";
import { View, Text, TextInput, Image } from "react-native";
import ShoeView from "@/components/ShoeView/ShoeView";
import Navigation from "@/components/NavigationBar/Navigation";
import { getAllShoesDetails } from "../../api/shoesApi";

function HomePage() {
  const [shoesDetails, setShoesDetails] = useState([]);

  const handelGetShoesDetails = async () => {
    const result = await getAllShoesDetails();
    setShoesDetails(result.shoesDetails);
    console.log(shoesDetails);
  };

  useEffect(() => {
    handelGetShoesDetails();
  }, []);
  return (
    <>
      <View>
        <View style={styles.topBackgroundImageContainer}>
          <View style={styles.headingContainer}>
            <Image source={require("@/images/Logo/home.png")}></Image>

            <View style={styles.headingItems}>
              <Text style={styles.headingText}>ManduFootware</Text>
              <View style={styles.headingSectionOne}>
                <Image source={require("@/images/Icons/menu.png")}></Image>

                <View style={styles.searchBar}>
                  <Image source={require("@/images/Icons/search.png")}></Image>

                  <TextInput
                    style={styles.textInput}
                    placeholder="Search here..."
                  ></TextInput>
                </View>

                <Image
                  source={require("@/images/Icons/notification.png")}
                ></Image>
              </View>
            </View>
          </View>

          <View style={styles.headingSectionTwo}>
            <Text style={styles.headingTextTwo}>Top Brands</Text>
            <View style={styles.headingTopBrandImageSection}>
              <Image
                style={styles.ImageSize}
                source={require("@/images/BrandImages/nike.png")}
              ></Image>
              <Image
                style={styles.ImageSize}
                source={require("@/images/BrandImages/adidas.png")}
              ></Image>
              <Image
                style={styles.ImageSize}
                source={require("@/images/BrandImages/puma.png")}
              ></Image>
              <Image
                style={styles.ImageSize}
                source={require("@/images/BrandImages/lv.png")}
              ></Image>
              <Image
                style={styles.ImageSize}
                source={require("@/images/BrandImages/nb.png")}
              ></Image>
            </View>
          </View>
        </View>

        <View style={styles.headingSectionThree}>
          <Text style={styles.FilterItems}>Trending</Text>
          <Text style={styles.FilterItems}>All</Text>
          <Text style={styles.FilterItems}>New</Text>
          <Text style={styles.FilterItems}>Gender</Text>
          <Text style={styles.FilterItems}>Filter</Text>
        </View>

        <View style={styles.shoeDisplayBox}>
          {shoesDetails.length > 0 ? (
            shoesDetails.map((shoe, index) => (
              <View key={index} style={styles.shoeView}>
                <ShoeView style={styles.shoeView}
                  id={shoe.id}
                  shoeName={shoe.shoeName}
                  gender={shoe.gender}
                  price={shoe.price}
                />
              </View>
            ))
          ) : (
            <Text style={styles.emptyMessage}>
              No shoes available at the moment.
            </Text>
          )}
        </View>
      </View>
      <View style={styles.footerSection}>
        <Navigation />
      </View>
    </>
  );
}

export default HomePage;
