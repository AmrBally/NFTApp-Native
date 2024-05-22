import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  FlatList,
  Animated,
} from "react-native";
import { COLORS, DATA, FONTS, SIZES } from "../constants";
import { StatusBar } from "react-native";
import NFTCard from "../components/NFTCard";
import HomeHeader from "../components/HomeHeader";

const HomeScreen = () => {
  const [nftsData, setNftsData] = useState(DATA);
  const moveSearchAnimation = useRef(new Animated.Value(0)).current;

  /**
   * @desc search for nfts data about name
   * @param value : input value
   */
  const searchHandler = (value) => {
    if (value) {
      const filterdata = DATA.filter((nft) =>
        nft.name.toLowerCase().includes(value.toLowerCase())
      );
      setNftsData(filterdata);
    } else {
      setNftsData(DATA);
    }
  };

  const NotFoundNFT = () => {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Opps... ! </Text>
        <Text style={styles.notFoundText}> Not found the NFT</Text>
      </View>
    );
  };

  const searchAnimationHandler = () => {
    Animated.spring(moveSearchAnimation, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    searchAnimationHandler();
  }, [searchAnimationHandler]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <Animated.View
            style={{
              top: -100,
              transform: [
                {
                  translateY: moveSearchAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 100],
                  }),
                },
              ],
            }}
          >
            <HomeHeader searchHandler={searchHandler} />
          </Animated.View>
          {nftsData.length === 0 ? (
            <NotFoundNFT />
          ) : (
            <FlatList
              data={nftsData}
              renderItem={({ item }) => <NFTCard NFTData={item} />}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              // ListHeaderComponent={<HomeHeader />}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    // paddingTop: StatusBar.currentHeight + 10,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZES.xLarge,
  },
  notFoundText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: SIZES.xLarge,
  },
});